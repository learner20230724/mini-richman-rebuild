onClipEvent(keyDown){
   if(_root.shui == 1)
   {
      temp = Key.getCode();
      if(temp == 68 && this._x < 50)
      {
         this._x += 100;
         ss = new Sound();
         ss.attachSound("xuanren");
         ss.start();
      }
      else if(temp == 65 && this._x > 50)
      {
         this._x -= 100;
         ss = new Sound();
         ss.attachSound("xuanren");
         ss.start();
      }
      else if(temp == 87)
      {
         if(_root.xianjin1 >= 100)
         {
            if(this._x == 0)
            {
               _root.attachMovie("ducheng1","ducheng1",88,{_x:320,_y:260});
            }
            else if(this._x == 100)
            {
               _root.attachMovie("ducheng2","ducheng2",88,{_x:330,_y:265});
            }
         }
         else
         {
            _root.wenben = "赌城不欢迎穷光蛋";
         }
      }
      else if(temp == 83)
      {
         _root.wenben = "好孩子不赌博";
         if(_root.zhuyuan2 == 0)
         {
            _root.shui = 2;
            _root.xingqi = 2;
            _root.pp = "2P";
            _root.shaizi.gotoAndPlay(1);
         }
         else
         {
            _root.shui = 1;
            _root.xingqi = 1;
            _root.pp = "1P";
            _root.shaizi.gotoAndPlay(1);
         }
         _root.attachMovie("tt","tt",88,{_x:0,_y:0});
      }
   }
   else if(_root.shui == 2)
   {
      temp = Key.getCode();
      if(temp == 39 && this._x < 50)
      {
         this._x += 100;
         ss = new Sound();
         ss.attachSound("xuanren");
         ss.start();
      }
      else if(temp == 37 && this._x > 50)
      {
         this._x -= 100;
         ss = new Sound();
         ss.attachSound("xuanren");
         ss.start();
      }
      else if(temp == 38)
      {
         if(_root.xianjin2 >= 100)
         {
            if(this._x == 0)
            {
               _root.attachMovie("ducheng1","ducheng1",88,{_x:320,_y:260});
            }
            else if(this._x == 100)
            {
               _root.attachMovie("ducheng2","ducheng2",88,{_x:330,_y:265});
            }
         }
         else
         {
            _root.wenben = "赌城不欢迎穷光蛋";
         }
      }
      else if(temp == 40)
      {
         _root.wenben = "好孩子不赌博";
         if(_root.zhuyuan1 == 0)
         {
            _root.shui = 1;
            _root.xingqi = 1;
            _root.pp = "1P";
            _root.shaizi.gotoAndPlay(1);
         }
         else
         {
            _root.shui = 2;
            _root.xingqi = 2;
            _root.pp = "2P";
            _root.shaizi.gotoAndPlay(1);
         }
         _root.attachMovie("tt","tt",88,{_x:0,_y:0});
      }
   }
}
