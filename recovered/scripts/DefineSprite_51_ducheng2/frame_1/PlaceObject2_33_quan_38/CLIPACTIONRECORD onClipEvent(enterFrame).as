onClipEvent(enterFrame){
   if(_root.shui == 1)
   {
      if(_parent.keyizhuan == 1)
      {
         if(random(50) == 10 && _parent.bu > 0)
         {
            _parent.bu--;
         }
         _parent.h = (_parent.h + _parent.bu * 2) % 360;
         this._rotation = _parent.h;
         if(_parent.bu == 0)
         {
            _parent.keyizhuan = 0;
            if(_parent.h < 30)
            {
               shu = 1;
            }
            else if(_parent.h < 90)
            {
               shu = 6;
            }
            else if(_parent.h < 150)
            {
               shu = 5;
            }
            else if(_parent.h < 210)
            {
               shu = 4;
            }
            else if(_parent.h < 270)
            {
               shu = 3;
            }
            else if(_parent.h < 330)
            {
               shu = 2;
            }
            else
            {
               shu = 1;
            }
            ying = int(_parent.dukuang._x / 60 + 1) * 600;
            jieguo = _parent.dukuang._x / 10 % 6 + 1;
            if(shu == jieguo)
            {
               _root.wenben = "恭喜您赢了" + ying + "元";
               _root.xianjin1 += ying;
               ss = new Sound();
               ss.attachSound("shengli");
               ss.start();
            }
            else
            {
               _root.wenben = "猜不中很正常";
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
      }
   }
   else if(_root.shui == 2)
   {
      if(_parent.keyizhuan == 1)
      {
         if(random(50) == 10 && _parent.bu > 0)
         {
            _parent.bu--;
         }
         _parent.h = (_parent.h + _parent.bu * 2) % 360;
         this._rotation = _parent.h;
         if(_parent.bu == 0)
         {
            _parent.keyizhuan = 0;
            if(_parent.h < 30)
            {
               shu = 1;
            }
            else if(_parent.h < 90)
            {
               shu = 6;
            }
            else if(_parent.h < 150)
            {
               shu = 5;
            }
            else if(_parent.h < 210)
            {
               shu = 4;
            }
            else if(_parent.h < 270)
            {
               shu = 3;
            }
            else if(_parent.h < 330)
            {
               shu = 2;
            }
            else
            {
               shu = 1;
            }
            ying = int(_parent.dukuang._x / 60 + 1) * 600;
            jieguo = _parent.dukuang._x / 10 % 6 + 1;
            if(shu == jieguo)
            {
               _root.wenben = "恭喜您赢了" + ying + "元";
               _root.xianjin2 += ying;
               ss = new Sound();
               ss.attachSound("shengli");
               ss.start();
            }
            else
            {
               _root.wenben = "猜不中很正常";
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
      }
   }
}
