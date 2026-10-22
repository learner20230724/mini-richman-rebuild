onClipEvent(keyDown){
   if(Key.getCode() == 87 && _root.shui == 1)
   {
      _root.wenben = _root.name1 + "要害人了";
      _root.dilei1--;
      _root.jibie[_root.weizhi] = 4;
      x = int(_root.renwu1._x / 50) * 50 + 5;
      y = int(_root.renwu1._y / 50) * 50 + 4;
      _root.attachMovie("lei","lei",50 + _root.weizhi,{_x:x,_y:y});
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
      _root.wenben = "先不害人";
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
      _root.wenben = _root.name2 + "要害人了";
      _root.dilei2--;
      _root.jibie[_root.weizhi] = 4;
      x = int(_root.renwu2._x / 50) * 50 + 5;
      y = int(_root.renwu2._y / 50) * 50 + 4;
      _root.attachMovie("lei","lei",50 + _root.weizhi,{_x:x,_y:y});
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
      _root.wenben = "先不害人";
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
