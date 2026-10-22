onClipEvent(keyDown){
   if(_root.shui == 1)
   {
      duzi = int(_parent.dukuang._x / 60 + 1) * 100;
      if(dong == 1)
      {
         temp = Key.getCode();
         if(temp == 68 && this._x < 165)
         {
            this._x += 10;
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
         }
         else if(temp == 65 && this._x > 5)
         {
            this._x -= 10;
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
         }
         else if(temp == 87)
         {
            if(_root.xianjin1 < duzi)
            {
               _root.wenben = "您的现金不够";
            }
            else
            {
               _root.wenben = "祝您好运";
               _root.xianjin1 -= duzi;
               _parent.keyizhuan = 1;
               dong = 0;
            }
         }
         else if(temp == 83)
         {
            _root.wenben = "不赌一把别想走";
         }
      }
   }
   else if(_root.shui == 2)
   {
      duzi = int(_parent.dukuang._x / 60 + 1) * 100;
      if(dong == 1)
      {
         temp = Key.getCode();
         if(temp == 39 && this._x < 165)
         {
            this._x += 10;
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
         }
         else if(temp == 37 && this._x > 5)
         {
            this._x -= 10;
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
         }
         else if(temp == 38)
         {
            if(_root.xianjin2 < duzi)
            {
               _root.wenben = "您的现金不够";
            }
            else
            {
               _root.wenben = "祝您好运";
               _root.xianjin2 -= duzi;
               _parent.keyizhuan = 1;
               dong = 0;
            }
         }
         else if(temp == 40)
         {
            _root.wenben = "不赌一把别想走";
         }
      }
   }
}
