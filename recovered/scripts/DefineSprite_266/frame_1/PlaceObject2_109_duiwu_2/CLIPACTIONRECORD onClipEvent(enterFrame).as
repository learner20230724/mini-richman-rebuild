onClipEvent(enterFrame){
   if(this._x < 0)
   {
      this._x += 1;
   }
   else
   {
      this._x = -500;
   }
}
