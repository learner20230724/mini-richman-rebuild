onClipEvent(keyDown){
   temp = Key.getCode();
   if(_root.pp2 == 0)
   {
      if(temp == 37 && this._x > 100)
      {
         ss = new Sound();
         ss.attachSound("xuanren");
         ss.start();
         if(_root.p1._x == this._x - 70 && this._x > 150)
         {
            this._x -= 140;
         }
         else if(_root.p1._x != this._x - 70)
         {
            this._x -= 70;
         }
      }
      else if(temp == 39 && this._x < 450)
      {
         ss = new Sound();
         ss.attachSound("xuanren");
         ss.start();
         if(_root.p1._x == this._x + 70 && this._x < 380)
         {
            this._x += 140;
         }
         else if(_root.p1._x != this._x + 70)
         {
            this._x += 70;
         }
      }
      else if(temp == 38)
      {
         ss = new Sound();
         ss.attachSound("tiao.wav");
         ss.start();
         _root.pp2 = 1;
         this.gotoAndStop(5);
         if(this._x == 50)
         {
            _root.ppp2 = "b1";
         }
         else if(this._x == 120)
         {
            _root.ppp2 = "b2";
         }
         else if(this._x == 190)
         {
            _root.ppp2 = "b3";
         }
         else if(this._x == 260)
         {
            _root.ppp2 = "b4";
         }
         else if(this._x == 330)
         {
            _root.ppp2 = "b5";
         }
         else if(this._x == 400)
         {
            _root.ppp2 = "b6";
         }
         else if(this._x == 470)
         {
            _root.ppp2 = "b7";
         }
      }
   }
}
