onClipEvent(keyDown){
   if(Key.getCode() == 87 && _root.shui == 1)
   {
      _root.wenben = "这是" + _root.name1 + "的房子了";
      _root.f11++;
      _root.xianjin1 -= 200;
      _root.jibie[_root.weizhi] = 1;
      x = int(_root.renwu1._x / 50) * 50;
      y = int(_root.renwu1._y / 50) * 50;
      _root.attachMovie("f1","f1",50 + _root.weizhi,{_x:x,_y:y});
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
   else if(Key.getCode() == 83 && _root.shui == 1 && _root.dilei1 == 0)
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
   else if(Key.getCode() == 83 && _root.shui == 1 && _root.dilei1 > 0)
   {
      _root.attachMovie("fanglei","fanglei",88,{_x:340,_y:180});
   }
   else if(Key.getCode() == 38 && _root.shui == 2)
   {
      _root.wenben = "这是" + _root.name2 + "的房子了";
      _root.xianjin2 -= 200;
      _root.f21++;
      _root.jibie[_root.weizhi] = 1;
      x = int(_root.renwu2._x / 50) * 50;
      y = int(_root.renwu2._y / 50) * 50;
      _root.attachMovie("z1","z1",50 + _root.weizhi,{_x:x,_y:y});
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
   else if(Key.getCode() == 40 && _root.shui == 2 && _root.dilei2 == 0)
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
   else if(Key.getCode() == 40 && _root.shui == 2 && _root.dilei2 > 0)
   {
      _root.attachMovie("fanglei","fanglei",88,{_x:340,_y:180});
   }
}
