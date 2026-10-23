/* Fixed-step wall-clock adapter. Speed changes pacing, never original game values. */
(function(global){
  const STEP_MS=20,EPSILON=1e-7;
  function timestamp(value){
    if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError('Timestamp must be a finite number');
    if(value<0)throw new RangeError('Timestamp must be non-negative');
    return value;
  }
  function speed(value){
    if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError('Speed must be a finite number');
    if(value<0||value>20)throw new RangeError('Speed must be between 0 and 20');
    const tenths=Math.round(value*10);
    if(Math.abs(value*10-tenths)>1e-9)throw new RangeError('Speed must use 0.1 increments');
    return tenths/10;
  }
  class RichmanClock{
    constructor(step,options={}){
      if(typeof step!=='function')throw new TypeError('A simulation step callback is required');
      const maxFrameMs=options.maxFrameMs===undefined?100:options.maxFrameMs;
      if(typeof maxFrameMs!=='number'||!Number.isFinite(maxFrameMs)||maxFrameMs<=0)throw new RangeError('maxFrameMs must be positive and finite');
      this._step=step;this._speed=speed(options.speed===undefined?1:options.speed);this._maxFrameMs=maxFrameMs;
      this._hidden=false;this._last=null;this._remainder=0;
    }
    static get STEP_MS(){return STEP_MS;}
    get speed(){return this._speed;}
    get hidden(){return this._hidden;}
    get remainderMs(){return this._remainder;}
    // Explicit timestamps retain only time after this change. Without one, the
    // next frame establishes a fresh baseline instead of inheriting old debt.
    reset(now){
      const next=now===undefined?null:timestamp(now);
      this._last=next;this._remainder=0;
    }
    setSpeed(value,now){
      const next=speed(value),at=now===undefined?undefined:timestamp(now);
      this.reset(at);this._speed=next;return next;
    }
    setHidden(value,now){
      if(typeof value!=='boolean')throw new TypeError('Hidden state must be boolean');
      const at=now===undefined?undefined:timestamp(now);
      this.reset(at);this._hidden=value;return value;
    }
    frame(now){
      timestamp(now);
      if(this._last===null){this._last=now;return 0;}
      const elapsed=now-this._last;this._last=now;
      // A backward clock invalidates fractional debt; do not run a negative step.
      if(elapsed<0||this._hidden||this._speed===0){this._remainder=0;return 0;}
      // Preserve the old runtime's 100 ms stall cap. Time discarded after a
      // suspended/blocked frame is not queued for future catch-up.
      this._remainder+=Math.min(elapsed,this._maxFrameMs)*this._speed;
      let ticks=0;
      while(this._remainder+EPSILON>=STEP_MS){
        this._remainder=Math.max(0,this._remainder-STEP_MS);
        this._step(STEP_MS);ticks++;
      }
      return ticks;
    }
    // Manual debugging advances exactly one original tick, including at 0x.
    // Never advance a hidden page, even when its caller requests a single step.
    stepOnce(){
      if(this._hidden)return 0;
      this._step(STEP_MS);return 1;
    }
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={RichmanClock};
  else global.RichmanClock=RichmanClock;
})(typeof globalThis!=='undefined'?globalThis:this);
