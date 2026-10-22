onClipEvent(keyDown){
   if(Key.getCode() == 87 && _root.shui == 1)
   {
      _root.yumao1--;
      _root.wenben = "别想害我";
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
      _root.zhuyuan1 = 4 + random(7);
      if(_root.zhuyuan1 == 4)
      {
         _root.wenben = "小毛病，住院3天";
      }
      else if(_root.zhuyuan1 == 5)
      {
         _root.wenben = "摔了一交，住院4天";
      }
      else if(_root.zhuyuan1 == 6)
      {
         _root.wenben = "掉进下水道，住院5天";
      }
      else if(_root.zhuyuan1 == 7)
      {
         _root.wenben = "遭人殴打，住院6天";
      }
      else if(_root.zhuyuan1 == 8)
      {
         _root.wenben = "天外来砖，住院7天";
      }
      else if(_root.zhuyuan1 == 9)
      {
         _root.wenben = "出车祸，住院8天";
      }
      else if(_root.zhuyuan1 == 10)
      {
         _root.wenben = "炸成残废，住院9天";
      }
      ss = new Sound();
      ss.attachSound("zha");
      ss.start();
      x = int(_root.renwu1._x / 50) * 50 + 10;
      y = int(_root.renwu1._y / 50) * 50 + 10;
      while(_root.renwu1._x > 50)
      {
         _root.renwu1._x -= 50;
      }
      while(_root.renwu1._y < 400)
      {
         _root.renwu1._y += 50;
      }
      _root.renwu1._x += 300;
      _root.jibie[_root.weizhi] = 0;
      _root.attachMovie("baozha","baozha",50 + _root.weizhi,{_x:x,_y:y});
      _root.shui = 2;
      _root.xingqi = 2;
      _root.pp = "2P";
      _root.shaizi.gotoAndPlay(1);
      _root.attachMovie("tt","tt",88,{_x:0,_y:0});
   }
   else if(Key.getCode() == 38 && _root.shui == 2)
   {
      _root.yumao2--;
      _root.wenben = "别想害我";
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
      _root.zhuyuan2 = 4 + random(7);
      if(_root.zhuyuan2 == 4)
      {
         _root.wenben = "小毛病，住院3天";
      }
      else if(_root.zhuyuan2 == 5)
      {
         _root.wenben = "摔了一交，住院4天";
      }
      else if(_root.zhuyuan2 == 6)
      {
         _root.wenben = "掉进下水道，住院5天";
      }
      else if(_root.zhuyuan2 == 7)
      {
         _root.wenben = "遭人殴打，住院6天";
      }
      else if(_root.zhuyuan2 == 8)
      {
         _root.wenben = "天外来砖，住院7天";
      }
      else if(_root.zhuyuan2 == 9)
      {
         _root.wenben = "出车祸，住院8天";
      }
      else if(_root.zhuyuan2 == 10)
      {
         _root.wenben = "炸成残废，住院9天";
      }
      ss = new Sound();
      ss.attachSound("zha");
      ss.start();
      x = int(_root.renwu2._x / 50) * 50 + 10;
      y = int(_root.renwu2._y / 50) * 50 + 10;
      while(_root.renwu2._x > 50)
      {
         _root.renwu2._x -= 50;
      }
      while(_root.renwu2._y < 400)
      {
         _root.renwu2._y += 50;
      }
      _root.renwu2._x += 300;
      _root.jibie[_root.weizhi] = 0;
      _root.attachMovie("baozha","baozha",50 + _root.weizhi,{_x:x,_y:y});
      _root.shui = 1;
      _root.xingqi = 1;
      _root.pp = "1P";
      _root.shaizi.gotoAndPlay(1);
      _root.attachMovie("tt","tt",88,{_x:0,_y:0});
   }
}
