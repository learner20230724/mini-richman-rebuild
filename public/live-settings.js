/* Human-owned, game-specific hot configuration adapter.
 * Never recreates a game, runs initialization actions, rerolls dice or evaluates JS.
 */
(function(global){
  'use strict';
  const Settings=typeof module!=='undefined'?require('./settings.js'):global.RichmanSettings;
  const FIELDS=Object.freeze({name:'name',cash:'xianjin',overdraft:'touzhi',bankBonus:'jiangjin',taxPercent:'shuilv',diamonds:'zuanshi',stars:'wuxing',charms:'yumao',mines:'dilei'});
  const DECISIONS=new Set(['maidi','jianfang','shengji','bieshu','fanglei','baohulei','baohu','ducheng','chaoshi']);
  const FINISHED_DISPLAYS=new Set(['ducheng1','ducheng2','mingyun','lunzi','baozha']);
  const clone=value=>JSON.parse(JSON.stringify(value));
  const at=(object,path)=>path.reduce((node,key)=>node?.[key],object);
  function entries(config){
    const result=[];
    for(const group of ['characters','properties','numbers'])for(const [id,patch]of Object.entries(config[group]||{})){
      if(group==='numbers')result.push({group,id,path:[group,id],value:patch});
      else for(const [field,value]of Object.entries(patch))result.push({group,id,field,path:[group,id,field],value});
    }
    return result;
  }
  class RichmanLiveSettings {
    constructor(defaults,{onApplied}={}){this.defaults=defaults;this.onApplied=onApplied;this._pending=null;this._lastResult=null;}
    get pending(){return this._pending?clone(this._pending.result):null;}
    get lastResult(){return this._lastResult?clone(this._lastResult):null;}
    cancel(){const previous=this.pending;this._pending=null;return previous;}
    reset(){this._pending=null;this._lastResult=null;}
    getStatus(){return {pending:!!this._pending,reason:this._pending?.result.reason||'',request:this.pending,lastResult:this.lastResult};}
    _validate(config){return Settings.validateOverrides(this.defaults,config,{prune:true});}
    _changes(oldConfig,config){
      const all=new Map([...entries(oldConfig),...entries(config)].map(entry=>[JSON.stringify(entry.path),entry]));
      return [...all.values()].map(entry=>({...entry,oldValue:at(oldConfig,entry.path)??at(this.defaults,entry.path),value:at(config,entry.path)??at(this.defaults,entry.path)})).filter(entry=>entry.oldValue!==entry.value);
    }
    _timers(game){
      const v=game.root.vars,walk=game.walk(),result=[];
      for(const [id,timer]of game.timers){
        let key=null;
        if(id===v.mm1&&timer.fn===v.kaishi)key='rules.selectionTickMilliseconds';
        else if(id===v.shijian&&timer.fn===v.jiajia)key='rules.minuteMilliseconds';
        else if(walk.some(clip=>clip.alive&&clip.vars.mm===id&&clip.vars.xingzou===timer.fn))key='rules.stepMilliseconds';
        result.push({id,timer,key});
      }
      return result;
    }
    _reason(game,changes,timers){
      const root=game.root,v=root.vars;
      if(root.frame===1)return '';
      if(root.frame===3)return '';
      if(root.frame!==2)return '等待有效场景 / Wait for a supported game scene';
      const stable=[1,2].includes(v.shui)&&v.xingqi===v.shui;
      const spinner=game.walk().some(clip=>clip.alive&&Number(clip.vars.keyizhuan)>0);
      if(spinner)return '等待已开始的转盘或已付款赌局结算；不追溯已付款交易 / Wait for the paid spin to settle';
      const popup=root.children.get(16384+88);
      if(popup?.alive&&popup.id!==game.data.exports.tt){
        const name=Object.entries(game.data.exports).find(([,id])=>id===popup.id)?.[0];
        // Original shop script s34 completes a purchase/redemption by hiding
        // its selection clip and setting h=0, but retains the shop artwork.
        // h=1 (including insufficient cash) is still an outstanding decision.
        const finishedShop=stable&&name==='chaoshi'&&popup.named.kuang?.alive&&popup.named.kuang.vars.h===0&&popup.named.kuang.visible===false;
        // Original casinos/fortune retain a result panel after turning control
        // over. That already-settled display is not an outstanding transaction.
        if(!finishedShop&&(DECISIONS.has(name)||!FINISHED_DISPLAYS.has(name)||!stable))return '等待当前弹窗按旧规则完成；整份配置尚未生效 / Complete the current dialog under the old rules';
      }
      if(timers.some(item=>!item.key))return '等待当前计时事务结束 / Wait for the current timed transaction';
      const moving=timers.some(item=>item.key==='rules.stepMilliseconds');
      if(moving){
        if(changes.some(item=>item.group!=='numbers'||item.id.startsWith('src.')))return '等待本次移动与落地事务结束，再整份应用 / Wait for this move and landing transaction to finish';
        return '';
      }
      if(!stable)return '等待当前回合事务到达安全点 / Wait for a stable turn boundary';
      if(!Array.isArray(v.xianjin)||!Array.isArray(v.zuanshi))return '等待地产价格表就绪 / Wait for the property price tables';
      return '';
    }
    _effect(game,entry){
      const v=game.root.vars;
      if(entry.group==='characters'){
        const players=game.root.frame===2?[1,2].filter(player=>v['ppp'+player]===entry.id):[];
        if(players.length)return {effect:'immediate',players,reason:entry.field==='cash'?'当前玩家现金直接设为新值；其他未改字段保持本局数值 / Set current cash directly; unchanged fields stay untouched':'只同步这个已修改字段，保留位置、回合及其他本局数值 / Update this changed field only'};
        return {effect:game.root.frame===1?'next-trigger':'new-game',players:[],reason:'更新角色配置及选角显示；未上场角色不替换本局玩家 / Character configuration and menu only; does not replace the current players'};
      }
      if(entry.group==='properties')return {effect:game.root.frame===2?'immediate':'next-trigger',reason:'更新实际价格表；不改变已购土地、房屋或已支付金额 / Update price tables, not ownership, buildings or past payments'};
      if(entry.id.startsWith('src.')){
        const initialization=(game.root.frame!==1&&/^src\.s40\./.test(entry.id))||/^src\.s37\.l(?:14|15)\./.test(entry.id);
        return {effect:initialization?'new-game':'next-trigger',reason:initialization?'原版初始化已执行；替换后续源码读取，不重跑初始化，初始状态需新局 / Initialization is not replayed; initial-state changes require a new game':'高级参数只替换后续源码读取，不追溯已生成对象；错误组合仍可能破坏规则 / Future source reads only; existing objects are not rebuilt; unsafe combinations can break gameplay'};
      }
      if(/Milliseconds$/.test(entry.id))return {effect:'immediate',reason:'现有对应计时器按剩余时间比例重排，保留已走步数和已掷骰结果 / Retime existing intervals proportionally without rerolling or resetting progress'};
      if(entry.id==='rules.selectionTicks')return {effect:game.root.frame===1?'immediate':'new-game',reason:'选角剩余次数按旧剩余比例向上取整；棋盘中不重开选角 / Rescale remaining menu ticks with ceiling; no menu replay on the board'};
      if(entry.id==='rules.diceFaces')return {effect:'next-trigger',reason:'下一次掷骰使用新范围；本次骰子与剩余步数不变 / New range on the next roll; the current roll stays unchanged'};
      return {effect:'next-trigger',reason:'后续对应购买、升级、租金或道具事件读取新规则；不追溯已结算结果 / New rules on subsequent events; settled results stay unchanged'};
    }
    _analyze(game,config){
      if(!game?.root||!game.options?.settings||!game.builtins||!(game.timers instanceof Map))throw new Error('A running RichmanGame is required');
      const changes=this._changes(game.options.settings.overrides||{},config),timers=this._timers(game),reason=changes.length?this._reason(game,changes,timers):'';
      const status=!changes.length?'unchanged':reason?'queued':'ready';
      return {status,pending:status==='queued',applied:false,deferred:status==='queued',reason,reasons:reason?[reason]:[],config:clone(config),changes:changes.map(entry=>{
        const effect=game.root.frame===3?{effect:'new-game',reason:'本局已结束；保留当前赢家及画面，配置只供新局使用 / Current game ended; preserve the winner and use this configuration in a new game'}:this._effect(game,entry);
        return {...entry,...effect,afterApply:effect.effect,...(reason?{effect:game.root.frame===3?'new-game':'safe-boundary',reason:reason+'; '+effect.reason}:{})};
      }),timers};
    }
    preview(game,input){const result=this._analyze(game,this._validate(input));delete result.timers;return result;}
    apply(game,input){
      // All validation and mutation planning precede touching active settings,
      // live variables, timers or the existing pending request.
      const config=this._validate(input),analysis=this._analyze(game,config),{timers,...result}=analysis;
      if(result.status==='queued'){
        this._pending={game,config:clone(config),result:clone(result)};this._lastResult=clone(result);return result;
      }
      if(result.status==='unchanged'){this._pending=null;this._lastResult=clone(result);return result;}
      const candidate=new Settings(this.defaults,config),v=game.root.vars,assignments=[],timerChanges=[];
      for(const change of result.changes){
        if(change.group==='characters'&&game.root.frame===2)for(const player of change.players)assignments.push({object:v,key:FIELDS[change.field]+player,value:change.value});
        if(change.group==='properties'&&game.root.frame===2){
          const array=v[change.field==='cash'?'xianjin':'zuanshi'];
          if(!Array.isArray(array))throw new Error('Property price tables are not ready');
          assignments.push({object:array,key:change.id,value:change.value});
        }
      }
      const changedNumbers=new Set(result.changes.filter(change=>change.group==='numbers').map(change=>change.id));
      for(const {timer,key}of timers)if(game.root.frame!==3&&key&&changedNumbers.has(key)){
        if(!Number.isFinite(timer.ms)||timer.ms<=0||!Number.isFinite(timer.next)||!Number.isFinite(game.now))throw new Error('Cannot retime an invalid running interval');
        const fraction=Math.min(1,Math.max(0,(timer.next-game.now)/timer.ms)),ms=candidate.number(key);
        timerChanges.push({timer,ms,next:game.now+fraction*ms});
      }
      if(game.root.frame===1&&changedNumbers.has('rules.selectionTicks')){
        const old=game.options.settings.number('rules.selectionTicks'),remaining=v.n;
        if(!Number.isFinite(remaining)||!Number.isFinite(old)||old<=0)throw new Error('Cannot retime an invalid character-selection countdown');
        assignments.push({object:v,key:'n',value:remaining>0?Math.max(1,Math.ceil(remaining/old*candidate.number('rules.selectionTicks'))):0});
      }
      // No script, callback or generated initializer is invoked in this commit.
      game.options.settings=candidate;game.builtins._config=candidate;
      for(const {object,key,value}of assignments)object[key]=value;
      for(const {timer,ms,next}of timerChanges){timer.ms=ms;timer.next=next;}
      result.status='applied';result.applied=true;result.pending=false;result.deferred=result.changes.some(change=>change.effect==='new-game');
      result.reason=result.deferred?'规则已更新且未重开；部分初始化或未上场角色参数仅供新局使用，见逐项说明 / Rules updated without restarting; some initial-state or unused-character changes require a new game':'已应用到当前游戏；未重开 / Applied to the current game without restarting';
      this._pending=null;this._lastResult=clone(result);
      if(typeof this.onApplied==='function')try{this.onApplied({game,config:clone(config),result:clone(result)});}catch(error){result.notificationWarning=String(error.message||error);this._lastResult=clone(result);}
      return result;
    }
    flush(game){
      if(!this._pending)return null;
      if(this._pending.game!==game){this._pending=null;return null;}
      const config=this._pending.config,result=this.preview(game,config);
      if(result.status==='queued'){this._pending.result=clone(result);return result;}
      return this.apply(game,config);
    }
  }
  if(typeof module!=='undefined')module.exports=RichmanLiveSettings;else global.RichmanLiveSettings=RichmanLiveSettings;
})(typeof globalThis!=='undefined'?globalThis:this);
