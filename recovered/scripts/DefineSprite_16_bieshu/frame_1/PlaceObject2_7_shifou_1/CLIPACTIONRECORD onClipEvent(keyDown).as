onClipEvent(keyDown){
   if(Key.getCode() == 87 && _root.shui == 1)
   {
      _root.wenben = _root.name1 + "：我有豪宅了";
      _root.wuxing1--;
      _root.f12--;
      _root.f13++;
      _root.jibie[_root.weizhi] = 3;
      x = int(_root.renwu1._x / 50) * 50;
      y = int(_root.renwu1._y / 50) * 50;
      _root.attachMovie("f3","f3",50 + _root.weizhi,{_x:x,_y:y});
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
   else if(Key.getCode() == 83 && _root.shui == 1)
   {
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
   else if(Key.getCode() == 38 && _root.shui == 2)
   {
      _root.wenben = _root.name2 + "：我有加油站了";
      _root.wuxing2--;
      _root.f22--;
      _root.f23++;
      _root.jibie[_root.weizhi] = 3;
      x = int(_root.renwu2._x / 50) * 50;
      y = int(_root.renwu2._y / 50) * 50;
      _root.attachMovie("z3","z3",50 + _root.weizhi,{_x:x,_y:y});
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
   else if(Key.getCode() == 40 && _root.shui == 2)
   {
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
