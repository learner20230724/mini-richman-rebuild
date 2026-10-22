stop();
aa = random(15);
if(_root.shui == 1)
{
   if(aa == 1 && _root.zuanshi1 < 5)
   {
      _root.zuanshi1++;
      _root.wenben = "获得一颗钻石";
   }
   else if(aa == 2 && _root.wuxing1 < 5)
   {
      _root.wuxing1++;
      _root.wenben = "获得一颗五星";
   }
   else if(aa == 3 && _root.yumao1 < 5)
   {
      _root.yumao1++;
      _root.wenben = "获得一张护身符";
   }
   else if(aa == 4 && _root.dilei1 < 5)
   {
      _root.dilei1++;
      _root.wenben = "获得一个地雷";
   }
   else if(aa == 5)
   {
      _root.xianjin1 += 300;
      _root.wenben = "捡到300元钱";
   }
   else if(aa == 6)
   {
      if(_root.xianjin1 >= 300)
      {
         _root.xianjin1 -= 300;
         _root.wenben = "丢失300元钱";
      }
      else if(_root.xianjin1 > 0)
      {
         _root.xianjin1 = 0;
         _root.wenben = "丢失" + _root.xianjin1 + "元钱";
      }
      else if(_root.xianjin1 <= 0)
      {
         _root.xianjin1 = 0;
         _root.wenben = "欠款清零";
      }
   }
   else if(aa == 7)
   {
      _root.touzhi1 += 200;
      _root.wenben = "增加200元透支额";
   }
   else if(aa == 8 && _root.touzhi1 > 200)
   {
      _root.touzhi1 -= 200;
      _root.wenben = "减少200元透支额";
   }
   else if(aa == 9 && _root.shuilv1 < 88)
   {
      _root.shuilv1 += 10;
      _root.wenben = "税率增加10%";
   }
   else if(aa == 10 && _root.shuilv1 > 8)
   {
      _root.shuilv1 -= 10;
      _root.wenben = "税率减少10%";
   }
   else if(aa == 11)
   {
      _root.wuxing1 = 0;
      _root.zuanshi1 = 0;
      _root.yumao1 = 0;
      _root.dilei1 = 0;
      _root.wenben = "抢劫！留下所有卡片";
   }
   else if(aa == 12)
   {
      _root.jiangjin1 += 50;
      _root.wenben = "奖金增加50元";
   }
   else if(aa == 13 && _root.jiangjin1 > 50)
   {
      _root.jiangjin1 -= 50;
      _root.wenben = "奖金减少50元";
   }
   else if(aa == 14 && _root.zhuyuan2 == 0)
   {
      _root.zhuyuan1 = 3;
      _root.renwu1._x += 300;
      _root.renwu1._y += 150;
      _root.wenben = "住院2天";
   }
   else
   {
      _root.wenben = "什么情况都没发生";
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
else if(_root.shui == 2)
{
   if(aa == 1 && _root.zuanshi2 < 5)
   {
      _root.zuanshi2++;
      _root.wenben = "获得一颗钻石";
   }
   else if(aa == 2 && _root.wuxing2 < 5)
   {
      _root.wuxing2++;
      _root.wenben = "获得一颗五星";
   }
   else if(aa == 3 && _root.yumao2 < 5)
   {
      _root.yumao2++;
      _root.wenben = "获得一张护身符";
   }
   else if(aa == 4 && _root.dilei2 < 5)
   {
      _root.dilei2++;
      _root.wenben = "获得一个地雷";
   }
   else if(aa == 5)
   {
      _root.xianjin2 += 300;
      _root.wenben = "捡到300元钱";
   }
   else if(aa == 6)
   {
      if(_root.xianjin2 >= 300)
      {
         _root.xianjin2 -= 300;
         _root.wenben = "丢失300元钱";
      }
      else if(_root.xianjin2 > 0)
      {
         _root.xianjin2 = 0;
         _root.wenben = "丢失" + _root.xianjin2 + "元钱";
      }
      else if(_root.xianjin2 <= 0)
      {
         _root.xianjin2 = 0;
         _root.wenben = "欠款清零";
      }
   }
   else if(aa == 7)
   {
      _root.touzhi2 += 200;
      _root.wenben = "增加200元透支额";
   }
   else if(aa == 8 && _root.touzhi2 > 200)
   {
      _root.touzhi2 -= 200;
      _root.wenben = "减少200元透支额";
   }
   else if(aa == 9 && _root.shuilv2 < 88)
   {
      _root.shuilv2 += 10;
      _root.wenben = "税率增加10%";
   }
   else if(aa == 10 && _root.shuilv2 > 8)
   {
      _root.shuilv2 -= 10;
      _root.wenben = "税率减少10%";
   }
   else if(aa == 11)
   {
      _root.wuxing2 = 0;
      _root.zuanshi2 = 0;
      _root.yumao2 = 0;
      _root.dilei2 = 0;
      _root.wenben = "抢劫！留下所有卡片";
   }
   else if(aa == 12)
   {
      _root.jiangjin2 += 50;
      _root.wenben = "奖金增加50元";
   }
   else if(aa == 13 && _root.jiangjin2 > 50)
   {
      _root.jiangjin2 -= 50;
      _root.wenben = "奖金减少50元";
   }
   else if(aa == 14 && _root.zhuyuan1 == 0)
   {
      _root.zhuyuan2 = 3;
      _root.renwu2._x += 300;
      _root.renwu2._y += 150;
      _root.wenben = "住院2天";
   }
   else
   {
      _root.wenben = "什么情况都没发生";
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
