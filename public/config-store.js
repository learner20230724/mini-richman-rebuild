/* Human-owned configuration model. Generation never overwrites this file.
 * Stores configuration only: no player position, turn, cash balance or game save.
 * Draft -> apply() -> saveActive() are intentionally separate operations.
 */
(function(global){
  'use strict';
  const Settings=typeof module!=='undefined'?require('./settings.js'):global.RichmanSettings;
  const MAX_JSON_BYTES=2*1024*1024,MAX_PRESETS=25;
  const clone=value=>JSON.parse(JSON.stringify(value));
  const bytes=text=>typeof TextEncoder!=='undefined'?new TextEncoder().encode(text).length:unescape(encodeURIComponent(text)).length;
  const stable=value=>JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(key=>[key,item[key]])):item);
  function plain(value,label){
    if(!value||typeof value!=='object'||Array.isArray(value)||(Object.getPrototypeOf(value)!==Object.prototype&&Object.getPrototypeOf(value)!==null))throw new Error('Expected a plain object: '+label);
    for(const key of Reflect.ownKeys(value)){
      if(typeof key!=='string'||['__proto__','prototype','constructor'].includes(key))throw new Error('Forbidden setting key: '+String(key));
      const d=Object.getOwnPropertyDescriptor(value,key);
      if(!d.enumerable||!Object.hasOwn(d,'value'))throw new Error('Expected a plain data field: '+label+'.'+key);
    }
    return value;
  }
  function fields(value){
    const result=[];
    for(const group of ['characters','properties','numbers'])for(const [id,entry]of Object.entries(value[group]||{})){
      if(group==='numbers')result.push({group,id,field:undefined,value:entry,path:[group,id]});
      else for(const [field,v]of Object.entries(entry))result.push({group,id,field,value:v,path:[group,id,field]});
    }
    return result;
  }
  function assign(target,path,value){
    let node=target;for(const key of path.slice(0,-1))node=node[key]||(node[key]={});
    node[path.at(-1)]=value;
  }
  function merge(a,b){const output=clone(a);for(const f of fields(b))assign(output,f.path,f.value);return output;}
  function at(value,path){let current=value;for(const part of path){if(!current||!Object.hasOwn(current,part))return undefined;current=current[part];}return current;}
  class RichmanConfigStore {
    constructor(defaults,{fileBase={},storage,storageKey='mini-richman.config.v1',onWarning}={}){
      this.defaults=defaults;this.storageKey=storageKey;this._warnings=[];this.onWarning=typeof onWarning==='function'?onWarning:null;
      this._fileBase=this._validate(fileBase);this._fileBaseSignature=stable(this._fileBase);this._presets=[];this._persistedOverlay={};this._lastSaveSucceeded=null;
      if(storage!==undefined)this.storage=storage;
      else try{this.storage=global.localStorage||null;}catch(error){this.storage=null;this._warn('Browser storage is unavailable; settings remain in memory.');}
      if(this.storage){
        try{const text=this.storage.getItem(this.storageKey);if(text!==null)this._readSaved(text);}
        catch(error){this._warn('Saved settings could not be read and were ignored: '+error.message);}
      }
      this._active=this._validate(merge(this._fileBase,this._persistedOverlay));this._current=clone(this._active);
    }
    static get MAX_JSON_BYTES(){return MAX_JSON_BYTES;}
    static get MAX_PRESETS(){return MAX_PRESETS;}
    _validate(value){return Settings.validateOverrides(this.defaults,value,{prune:true});}
    _warn(message){if(this._warnings.length===64)this._warnings.shift();this._warnings.push(message);if(this.onWarning)try{this.onWarning(message);}catch(_error){/* A warning callback must not break configuration. */}}
    get warnings(){return this._warnings.slice();}
    get lastSaveSucceeded(){return this._lastSaveSucceeded;}
    get current(){return clone(this._current);}
    get active(){return clone(this._active);}
    get fileBase(){return clone(this._fileBase);}
    _original(path){return at(this.defaults,path);}
    _effective(value,path){const v=at(value,path);return v===undefined?this._original(path):v;}
    _difference(a,b){
      const all=new Map([...fields(a),...fields(b)].map(f=>[JSON.stringify(f.path),f]));
      return [...all.values()].filter(f=>this._effective(a,f.path)!==this._effective(b,f.path));
    }
    _overlay(value){
      const output={};for(const f of this._difference(value,this._fileBase))assign(output,f.path,this._effective(value,f.path));return output;
    }
    get(group,id,field){
      if(id===undefined){
        if(!['characters','properties','numbers'].includes(group))throw new Error('Unknown setting group '+group);
        return merge({[group]:this.defaults[group]},this._current)[group];
      }
      if(group!=='numbers'&&field===undefined){
        if(!Object.hasOwn(this.defaults[group]||{},id))throw new Error('Unknown '+group+' key '+id);
        return {...this.defaults[group][id],...this._current[group]?.[id]};
      }
      Settings.fieldRule(this.defaults,group,id,field);
      return this._effective(this._current,group==='numbers'?[group,id]:[group,id,field]);
    }
    set(group,id,field,value){
      if(group==='numbers'){value=field;field=undefined;}
      Settings.validateValue(this.defaults,group,id,field,value);
      const next=this.current;assign(next,group==='numbers'?[group,id]:[group,id,field],value);
      this._current=this._validate(next);return this.current;
    }
    remove(group,id,field){
      Settings.fieldRule(this.defaults,group,id,field);const next=this.current;
      if(group==='numbers')delete next.numbers?.[id];else delete next[group]?.[id]?.[field];
      this._current=this._validate(next);return this.current;
    }
    replace(value){this._current=this._validate(value);return this.current;}
    apply(){this._active=this.current;return this.active;}
    setActive(value){const next=this._validate(value);this._active=next;return this.active;}
    resetDraftToFile(){this._current=this.fileBase;return this.current;}
    resetAll(){this._current={};return this.current;}
    resetBrowser(){
      this._current=this.fileBase;this._active=this.fileBase;
      this._persist({},this._presets);return this.active;
    }
    clearSaved(){return this._persist({},this._presets);}
    changes(){return fields(this._current).map(f=>({...f,key:f.group==='numbers'?f.id:undefined,original:this._original(f.path)}));}
    stats(){
      const changes=this.changes(),count=group=>changes.filter(f=>f.group===group).length;
      return {changed:changes.length,total:fields(this.defaults).length,characters:count('characters'),properties:count('properties'),numbers:count('numbers'),namedNumbers:changes.filter(f=>f.group==='numbers'&&!f.id.startsWith('src.')).length,advancedNumbers:changes.filter(f=>f.group==='numbers'&&f.id.startsWith('src.')).length,draftChanged:this._difference(this._current,this._active).length,unsavedChanges:this._difference(this._active,this._validate(merge(this._fileBase,this._persistedOverlay))).length,presetCount:this._presets.length};
    }
    validationWarnings(value=this._current){
      const validated=this._validate(value);return fields(validated).filter(f=>f.group==='numbers'&&/Milliseconds$/.test(f.id)&&f.value<20).map(f=>f.id+' is below the recommended 20 ms minimum.');
    }
    _parseJSON(text){
      if(typeof text!=='string')throw new Error('Configuration JSON must be text.');
      if(bytes(text)>MAX_JSON_BYTES)throw new Error('Configuration JSON exceeds 2 MiB.');
      return JSON.parse(text);
    }
    _unwrap(value){
      plain(value,'configuration');
      if(Object.hasOwn(value,'schemaVersion')||Object.hasOwn(value,'overrides')){
        for(const key of Object.keys(value))if(!['schemaVersion','overrides'].includes(key))throw new Error('Unknown configuration wrapper field '+key);
        if(value.schemaVersion!==undefined&&value.schemaVersion!==1)throw new Error('Unsupported configuration schema version.');
        if(!Object.hasOwn(value,'overrides'))throw new Error('Missing overrides in configuration wrapper.');
        return value.overrides;
      }
      return value;
    }
    importJSON(text){const candidate=this._validate(this._unwrap(this._parseJSON(text)));this._current=candidate;return this.current;}
    exportJSON(value=this._current){return JSON.stringify({schemaVersion:1,overrides:this._validate(value)},null,2);}
    _presetName(name){
      if(typeof name!=='string'||name!==name.trim()||[...name].length<1||[...name].length>48||/[\u0000-\u001f\u007f]/.test(name))throw new Error('Preset name must contain 1–48 characters.');
      return name;
    }
    listPresets(){return clone(this._presets);}
    savePreset(name,value=this._current){
      this._presetName(name);const overrides=this._validate(value),index=this._presets.findIndex(p=>p.name===name);
      if(index<0&&this._presets.length>=MAX_PRESETS)throw new Error('At most 25 presets may be saved.');
      const preset={name,overrides},next=this.listPresets();if(index<0)next.push(preset);else next[index]=preset;
      this._presets=next;this._persist(this._persistedOverlay,next);return clone(preset);
    }
    loadPreset(name){const preset=this._presets.find(p=>p.name===name);if(!preset)throw new Error('Unknown preset '+name);return this.replace(preset.overrides);}
    removePreset(name){const next=this._presets.filter(p=>p.name!==name);if(next.length===this._presets.length)return false;this._presets=next;this._persist(this._persistedOverlay,next);return true;}
    _readSaved(text){
      const saved=plain(this._parseJSON(text),'saved settings');
      for(const key of Object.keys(saved))if(!['schemaVersion','fileBaseSignature','activeOverrides','presets'].includes(key))throw new Error('Unknown saved settings field '+key);
      if(saved.schemaVersion!==1)throw new Error('Unsupported saved settings schema version.');
      if(Object.hasOwn(saved,'fileBaseSignature')&&typeof saved.fileBaseSignature!=='string')throw new Error('Invalid saved file configuration signature.');
      const overlay=Settings.validateOverrides(this.defaults,Object.hasOwn(saved,'activeOverrides')?saved.activeOverrides:{}),presets=Object.hasOwn(saved,'presets')?saved.presets:[];
      if(!Array.isArray(presets)||presets.length>MAX_PRESETS)throw new Error('Invalid preset list.');
      const names=new Set(),validated=presets.map(value=>{
        plain(value,'preset');for(const key of Object.keys(value))if(!['name','overrides'].includes(key))throw new Error('Unknown preset field '+key);
        const name=this._presetName(value.name);if(names.has(name))throw new Error('Duplicate preset name '+name);names.add(name);
        return {name,overrides:this._validate(value.overrides)};
      });
      // Both sections validate before either section becomes visible.
      this._presets=validated;
      if(saved.fileBaseSignature!==this._fileBaseSignature){
        this._persistedOverlay={};this._warn('File configuration changed; old browser active settings were ignored. Saved presets were preserved.');
      }else this._persistedOverlay=overlay;
    }
    _persist(overlay,presets){
      try{
        if(!this.storage)throw new Error('Browser storage is unavailable.');
        const text=JSON.stringify({schemaVersion:1,fileBaseSignature:this._fileBaseSignature,activeOverrides:overlay,presets});
        if(bytes(text)>MAX_JSON_BYTES)throw new Error('Saved configuration exceeds 2 MiB.');
        this.storage.setItem(this.storageKey,text);this._persistedOverlay=clone(overlay);this._lastSaveSucceeded=true;return true;
      }catch(error){this._lastSaveSucceeded=false;this._warn('Settings remain in memory; saving to this browser failed: '+error.message);return false;}
    }
    saveActive(){return this._persist(this._overlay(this._active),this._presets);}
  }
  if(typeof module!=='undefined')module.exports=RichmanConfigStore;else global.RichmanConfigStore=RichmanConfigStore;
})(globalThis);
