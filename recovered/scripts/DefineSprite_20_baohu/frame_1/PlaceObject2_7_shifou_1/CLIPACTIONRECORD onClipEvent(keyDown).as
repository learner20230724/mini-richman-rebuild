onClipEvent(keyDown){
   if(Key.getCode() == 87 && _root.shui == 1)
   {
      _root.yumao1--;
      _root.wenben = "别想赚我的钱";
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
      _root.wenben = "不在乎这点钱";
      if(_root.shuyu[_root.weizhi] == 2 && _root.jibie[_root.weizhi] == 1)
      {
         _root.xianjin1 -= 100;
         _root.xianjin2 += 100 * (1 - _root.shuilv2 / 100);
         if(_root.xianjin1 + _root.touzhi1 < 0)
         {
            _root.gotoAndPlay(3);
         }
      }
      else if(_root.shuyu[_root.weizhi] == 2 && _root.jibie[_root.weizhi] == 2)
      {
         _root.xianjin1 -= 200;
         _root.xianjin2 += 200 * (1 - _root.shuilv2 / 100);
         if(_root.xianjin1 + _root.touzhi1 < 0)
         {
            _root.gotoAndPlay(3);
         }
      }
      else if(_root.shuyu[_root.weizhi] == 2 && _root.jibie[_root.weizhi] == 3)
      {
         _root.xianjin1 -= _root.bushu;
         _root.xianjin2 += _root.bushu * (1 - _root.shuilv2 / 100);
         if(_root.xianjin1 + _root.touzhi1 < 0)
         {
            _root.gotoAndPlay(3);
         }
      }
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
      _root.yumao2--;
      _root.wenben = "别想赚我的钱";
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
      _root.wenben = "不在乎这点钱";
      if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 1)
      {
         _root.xianjin2 -= 100;
         _root.xianjin1 += 100 * (1 - _root.shuilv1 / 100);
         if(_root.xianjin2 + _root.touzhi2 < 0)
         {
            _root.gotoAndPlay(3);
         }
      }
      else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 2)
      {
         _root.xianjin2 -= 200;
         _root.xianjin1 += 200 * (1 - _root.shuilv1 / 100);
         if(_root.xianjin2 + _root.touzhi2 < 0)
         {
            _root.gotoAndPlay(3);
         }
      }
      else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 3)
      {
         _root.xianjin2 -= _root.bushu;
         _root.xianjin1 += _root.bushu * (1 - _root.shuilv1 / 100);
         if(_root.xianjin2 + _root.touzhi2 < 0)
         {
            _root.gotoAndPlay(3);
         }
      }
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
