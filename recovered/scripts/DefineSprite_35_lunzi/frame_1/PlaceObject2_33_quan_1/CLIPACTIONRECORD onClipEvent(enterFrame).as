onClipEvent(enterFrame){
   if(_parent.keyizhuan == 1)
   {
      ss = new Sound();
      ss.attachSound("zhuan.wav");
      ss.start();
      if(random(30) == 10 && _parent.bu > 0)
      {
         _parent.bu--;
      }
      _parent.h = (_parent.h + _parent.bu) % 360;
      this._rotation = _parent.h;
      if(_parent.bu == 0)
      {
         _parent.keyizhuan = 0;
         if(_parent.h < 30)
         {
            _root.bushu = 100;
         }
         else if(_parent.h < 90)
         {
            _root.bushu = 600;
         }
         else if(_parent.h < 150)
         {
            _root.bushu = 500;
         }
         else if(_parent.h < 210)
         {
            _root.bushu = 400;
         }
         else if(_parent.h < 270)
         {
            _root.bushu = 300;
         }
         else if(_parent.h < 330)
         {
            _root.bushu = 200;
         }
         else
         {
            _root.bushu = 100;
         }
         if(_root.shui == 1 && _root.yumao1 == 0)
         {
            if(_root.bushu < 220)
            {
               _root.wenben = "还算幸运";
            }
            else if(_root.bushu < 440)
            {
               _root.wenben = "下次不来这地方了";
            }
            else
            {
               _root.wenben = "这下亏大了";
            }
            _root.xianjin1 -= _root.bushu;
            _root.xianjin2 += _root.bushu * (1 - _root.shuilv2 / 100);
            if(_root.xianjin1 + _root.touzhi1 < 0)
            {
               _root.gotoAndPlay(3);
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
         }
         else if(_root.shui == 2 && _root.yumao2 == 0)
         {
            if(_root.bushu < 220)
            {
               _root.wenben = "还算幸运";
            }
            else if(_root.bushu < 440)
            {
               _root.wenben = "下次不来这地方了";
            }
            else
            {
               _root.wenben = "这下亏大了";
            }
            _root.xianjin2 -= _root.bushu;
            _root.xianjin1 += _root.bushu * (1 - _root.shuilv1 / 100);
            if(_root.xianjin2 + _root.touzhi2 < 0)
            {
               _root.gotoAndPlay(3);
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
         }
         else if(_root.shui == 1 && _root.yumao1 > 0)
         {
            _root.attachMovie("baohu","baohu",88,{_x:340,_y:180});
         }
         else if(_root.shui == 2 && _root.yumao2 > 0)
         {
            _root.attachMovie("baohu","baohu",88,{_x:340,_y:180});
         }
      }
   }
}
