(function(global){
  class RichmanSettings {
    constructor(defaults,overrides={}){
      this.defaults=defaults;this.overrides=overrides;
      this.numbers={...defaults.numbers,...overrides.numbers};
      for(const [key,value]of Object.entries(this.numbers)){
        if(!Object.hasOwn(defaults.numbers,key))throw new Error('Unknown numeric setting '+key);
        if(typeof value!=='number'||!Number.isFinite(value))throw new Error('Non-finite numeric setting '+key);
        if(/Milliseconds$|selectionTicks$|diceFaces$/.test(key)&&(!(value>0)||!Number.isInteger(value)))throw new Error('Expected a positive integer '+key);
      }
      for(const group of ['characters','properties'])for(const [id,patch]of Object.entries(overrides[group]||{})){
        if(!Object.hasOwn(defaults[group],id))throw new Error('Unknown '+group+' key '+id);
        for(const [key,value]of Object.entries(patch)){
          if(!Object.hasOwn(defaults[group][id],key))throw new Error('Unknown '+group+' field '+key);
          if(typeof value!==typeof defaults[group][id][key]||(typeof value==='number'&&!Number.isFinite(value)))throw new Error('Invalid '+group+' setting '+key);
        }
      }
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
