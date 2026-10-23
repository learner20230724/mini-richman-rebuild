(function(global){
  const GROUPS=['characters','properties','numbers'];
  const FORBIDDEN=new Set(['__proto__','prototype','constructor']);
  function record(value,label){
    if(!value||typeof value!=='object'||Array.isArray(value)||(Object.getPrototypeOf(value)!==Object.prototype&&Object.getPrototypeOf(value)!==null))throw new Error('Expected a plain object: '+label);
    for(const key of Reflect.ownKeys(value)){
      if(typeof key!=='string'||FORBIDDEN.has(key))throw new Error('Forbidden setting key: '+String(key));
      const descriptor=Object.getOwnPropertyDescriptor(value,key);
      if(!descriptor.enumerable||!Object.hasOwn(descriptor,'value'))throw new Error('Expected a plain data field: '+label+'.'+key);
    }
    return value;
  }
  class RichmanSettings {
    constructor(defaults,overrides={}){
      this.defaults=defaults;this.overrides=RichmanSettings.validateOverrides(defaults,overrides);
      this.numbers={...defaults.numbers,...this.overrides.numbers};
    }
    static fieldRule(defaults,group,id,field){
      if(!GROUPS.includes(group))throw new Error('Unknown setting group '+group);
      if(group==='numbers'){
        if(!Object.hasOwn(defaults.numbers,id))throw new Error('Unknown numeric setting '+id);
        if(id.startsWith('src.'))return {type:'number',min:-1000000,max:1000000};
        if(/Milliseconds$/.test(id))return {type:'number',min:1,max:86400000,integer:true,recommendedMin:20};
        if(id==='rules.diceFaces')return {type:'number',min:1,max:6,integer:true};
        if(id==='rules.itemCap'||id==='rules.selectionTicks')return {type:'number',min:1,max:1000000,integer:true};
        if(id==='rules.upgradeStars')return {type:'number',min:0,max:1000000,integer:true};
        return {type:'number',min:0,max:1000000000};
      }
      if(!Object.hasOwn(defaults[group],id))throw new Error('Unknown '+group+' key '+id);
      if(!Object.hasOwn(defaults[group][id],field))throw new Error('Unknown '+group+' field '+field);
      if(field==='name')return {type:'string',minLength:1,maxLength:24};
      if(field==='taxPercent')return {type:'number',min:0,max:100};
      if(['diamonds','stars','charms','mines'].includes(field))return {type:'number',min:0,max:1000000,integer:true};
      return {type:'number',min:0,max:1000000000};
    }
    static validateValue(defaults,group,id,field,value){
      const rule=RichmanSettings.fieldRule(defaults,group,id,field),label=[group,id,field].filter(x=>x!==undefined).join('.');
      if(rule.type==='string'){
        if(typeof value!=='string'||value!==value.trim()||[...value].length<rule.minLength||[...value].length>rule.maxLength||/[\u0000-\u001f\u007f]/.test(value))throw new Error('Invalid name: '+label+' (1–24 characters, no surrounding whitespace or control characters)');
      }else if(typeof value!=='number'||!Number.isFinite(value)||value<rule.min||value>rule.max||(rule.integer&&!Number.isInteger(value))){
        throw new Error('Invalid numeric setting '+label+' ('+rule.min+'..'+rule.max+(rule.integer?', integer':'')+')');
      }
      return value;
    }
    static validateOverrides(defaults,input,{prune=false}={}){
      record(input,'overrides');const result={};
      for(const group of Object.keys(input)){
        if(!GROUPS.includes(group))throw new Error('Unknown setting group '+group);
        const entries=record(input[group],group),target={};
        for(const [id,patch]of Object.entries(entries)){
          if(group==='numbers'){
            RichmanSettings.validateValue(defaults,group,id,undefined,patch);
            if(!prune||patch!==defaults.numbers[id])target[id]=patch;
          }else{
            if(!Object.hasOwn(defaults[group],id))throw new Error('Unknown '+group+' key '+id);
            record(patch,group+'.'+id);const fields={};
            for(const [field,value]of Object.entries(patch)){
              RichmanSettings.validateValue(defaults,group,id,field,value);
              if(!prune||value!==defaults[group][id][field])fields[field]=value;
            }
            if(Object.keys(fields).length)target[id]=fields;
          }
        }
        if(Object.keys(target).length)result[group]=target;
      }
      return result;
    }
    number(key){if(!Object.hasOwn(this.numbers,key))throw new Error('Unknown generated parameter '+key);return this.numbers[key];}
    initialized(game){
      const v=game.root.vars;
      const binding={name:'name',cash:'xianjin',overdraft:'touzhi',bankBonus:'jiangjin',taxPercent:'shuilv',diamonds:'zuanshi',stars:'wuxing',charms:'yumao',mines:'dilei'};
      for(const p of [1,2]){
        const id=v['ppp'+p],patch=this.overrides.characters?.[id]||{};
        for(const [field,value]of Object.entries(patch))v[binding[field]+p]=value;
      }
      for(const [id,patch]of Object.entries(this.overrides.properties||{})){
        if(Object.hasOwn(patch,'cash'))v.xianjin[id]=patch.cash;
        if(Object.hasOwn(patch,'diamonds'))v.zuanshi[id]=patch.diamonds;
      }
    }
    afterScript(game,id,clip){
      // A changed price is shown at the actual confirmation point, including
      // diamond prices whose original map artwork is a row of bitmap icons.
      if(clip.id===10&&game.root.vars.weizhi){
        const tile=game.root.vars.weizhi;
        if(this.overrides.properties?.[tile])game.root.vars.wenben='买地：'+game.root.vars.xianjin[tile]+'元，'+game.root.vars.zuanshi[tile]+'钻石？';
      }
    }
  }
  if(typeof module!=='undefined')module.exports=RichmanSettings;else global.RichmanSettings=RichmanSettings;
})(globalThis);
