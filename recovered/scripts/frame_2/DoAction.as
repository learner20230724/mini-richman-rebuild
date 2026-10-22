function jiajia()
{
   yongshi++;
}
stop();
f11 = 0;
f12 = 0;
f13 = 0;
f21 = 0;
f22 = 0;
f23 = 0;
yongshi = 0;
mm = shijian = setInterval(jiajia,60000);
xingqi = 1;
shui = 1;
pp = "1P";
zhuyuan1 = 0;
zhuyuan2 = 0;
shuyu = new Array();
jibie = new Array();
xianjin = new Array();
zuanshi = new Array();
tanchu = 0;
i = 1;
while(i < 31)
{
   shuyu[i] = 0;
   jibie[i] = 0;
   i++;
}
i = 1;
while(i < 6)
{
   xianjin[i] = 400;
   zuanshi[i] = 3;
   i++;
}
i = 6;
while(i < 8)
{
   xianjin[i] = 300;
   zuanshi[i] = 1;
   i++;
}
i = 8;
while(i < 12)
{
   xianjin[i] = 700;
   zuanshi[i] = 2;
   i++;
}
xianjin[12] = 0;
zuanshi[12] = 1;
i = 13;
while(i < 16)
{
   xianjin[i] = 1000;
   zuanshi[i] = 0;
   i++;
}
i = 16;
while(i < 21)
{
   xianjin[i] = 1200;
   zuanshi[i] = 2;
   i++;
}
i = 21;
while(i < 23)
{
   xianjin[i] = 800;
   zuanshi[i] = 0;
   i++;
}
i = 23;
while(i < 27)
{
   xianjin[i] = 0;
   zuanshi[i] = 5;
   i++;
}
i = 27;
while(i < 30)
{
   xianjin[i] = 600;
   zuanshi[i] = 2;
   i++;
}
xianjin[30] = 500;
zuanshi[30] = 0;
i = 1;
while(i < 31)
{
   wenben = "欢迎来到大富翁俱乐部";
   i++;
}
keyizhuan = 0;
if(ppp1 == "b1")
{
   _root.attachMovie("c1","renwu1",102,{_x:251,_y:5});
   _root.attachMovie("b1","b1",112,{_x:130,_y:90});
   name1 = "阿布";
   xianjin1 = 6000;
   touzhi1 = 300;
   jiangjin1 = 200;
   shuilv1 = 30;
   zuanshi1 = 0;
   wuxing1 = 0;
   yumao1 = 0;
   dilei1 = 0;
}
else if(ppp1 == "b2")
{
   _root.attachMovie("c2","renwu1",102,{_x:258,_y:1});
   _root.attachMovie("b2","b2",112,{_x:130,_y:90});
   name1 = "忍者";
   xianjin1 = 6000;
   touzhi1 = 300;
   jiangjin1 = 200;
   shuilv1 = 30;
   zuanshi1 = 0;
   wuxing1 = 0;
   yumao1 = 0;
   dilei1 = 0;
}
else if(ppp1 == "b3")
{
   _root.attachMovie("c3","renwu1",102,{_x:255,_y:1});
   _root.attachMovie("b3","b3",112,{_x:130,_y:90});
   name1 = "丽丽";
   xianjin1 = 5000;
   touzhi1 = 500;
   jiangjin1 = 200;
   shuilv1 = 20;
   zuanshi1 = 1;
   wuxing1 = 2;
   yumao1 = 0;
   dilei1 = 0;
}
else if(ppp1 == "b4")
{
   _root.attachMovie("c4","renwu1",102,{_x:255,_y:1});
   _root.attachMovie("b4","b4",112,{_x:130,_y:90});
   name1 = "小强";
   xianjin1 = 4000;
   touzhi1 = 300;
   jiangjin1 = 300;
   shuilv1 = 40;
   zuanshi1 = 0;
   wuxing1 = 2;
   yumao1 = 0;
   dilei1 = 1;
}
else if(ppp1 == "b5")
{
   _root.attachMovie("c5","renwu1",102,{_x:257,_y:1});
   _root.attachMovie("b5","b5",112,{_x:130,_y:90});
   name1 = "咚咚";
   xianjin1 = 3000;
   touzhi1 = 100;
   jiangjin1 = 400;
   shuilv1 = 50;
   zuanshi1 = 1;
   wuxing1 = 1;
   yumao1 = 1;
   dilei1 = 0;
}
else if(ppp1 == "b6")
{
   _root.attachMovie("c6","renwu1",102,{_x:254,_y:1});
   _root.attachMovie("b6","b6",112,{_x:130,_y:90});
   name1 = "小镁";
   xianjin1 = 2000;
   touzhi1 = 500;
   jiangjin1 = 300;
   shuilv1 = 20;
   zuanshi1 = 3;
   wuxing1 = 3;
   yumao1 = 2;
   dilei1 = 2;
}
else if(ppp1 == "b7")
{
   _root.attachMovie("c7","renwu1",102,{_x:256,_y:4});
   _root.attachMovie("b7","b7",112,{_x:130,_y:90});
   name1 = "大宝";
   xianjin1 = 8000;
   touzhi1 = 100;
   jiangjin1 = 100;
   shuilv1 = 40;
   zuanshi1 = 0;
   wuxing1 = 0;
   yumao1 = 0;
   dilei1 = 0;
}
if(ppp2 == "b1")
{
   _root.attachMovie("c1","renwu2",101,{_x:251,_y:5});
   _root.attachMovie("b1","b1",111,{_x:190,_y:90});
   name2 = "阿布";
   xianjin2 = 6000;
   touzhi2 = 300;
   jiangjin2 = 200;
   shuilv2 = 30;
   zuanshi2 = 0;
   wuxing2 = 0;
   yumao2 = 0;
   dilei2 = 0;
}
else if(ppp2 == "b2")
{
   _root.attachMovie("c2","renwu2",101,{_x:258,_y:1});
   _root.attachMovie("b2","b2",111,{_x:190,_y:90});
   name2 = "忍者";
   xianjin2 = 6000;
   touzhi2 = 300;
   jiangjin2 = 200;
   shuilv2 = 30;
   zuanshi2 = 0;
   wuxing2 = 0;
   yumao2 = 0;
   dilei2 = 0;
}
else if(ppp2 == "b3")
{
   _root.attachMovie("c3","renwu2",101,{_x:255,_y:1});
   _root.attachMovie("b3","b3",111,{_x:190,_y:90});
   name2 = "丽丽";
   xianjin2 = 5000;
   touzhi2 = 500;
   jiangjin2 = 200;
   shuilv2 = 20;
   zuanshi2 = 1;
   wuxing2 = 2;
   yumao2 = 0;
   dilei2 = 0;
}
else if(ppp2 == "b4")
{
   _root.attachMovie("c4","renwu2",101,{_x:255,_y:1});
   _root.attachMovie("b4","b4",111,{_x:190,_y:90});
   name2 = "小强";
   xianjin2 = 4000;
   touzhi2 = 300;
   jiangjin2 = 300;
   shuilv2 = 40;
   zuanshi2 = 0;
   wuxing2 = 2;
   yumao2 = 0;
   dilei2 = 1;
}
else if(ppp2 == "b5")
{
   _root.attachMovie("c5","renwu2",101,{_x:257,_y:1});
   _root.attachMovie("b5","b5",121,{_x:190,_y:90});
   name2 = "咚咚";
   xianjin2 = 3000;
   touzhi2 = 100;
   jiangjin2 = 400;
   shuilv2 = 50;
   zuanshi2 = 1;
   wuxing2 = 1;
   yumao2 = 1;
   dilei2 = 0;
}
else if(ppp2 == "b6")
{
   _root.attachMovie("c6","renwu2",101,{_x:254,_y:1});
   _root.attachMovie("b6","b6",111,{_x:190,_y:90});
   name2 = "小镁";
   xianjin2 = 2000;
   touzhi2 = 500;
   jiangjin2 = 300;
   shuilv2 = 20;
   zuanshi2 = 3;
   wuxing2 = 3;
   yumao2 = 2;
   dilei2 = 2;
}
else if(ppp2 == "b7")
{
   _root.attachMovie("c7","renwu2",101,{_x:256,_y:4});
   _root.attachMovie("b7","b7",111,{_x:190,_y:90});
   name2 = "大宝";
   xianjin2 = 8000;
   touzhi2 = 100;
   jiangjin2 = 100;
   shuilv2 = 40;
   zuanshi2 = 0;
   wuxing2 = 0;
   yumao2 = 0;
   dilei2 = 0;
}
ss = new Sound();
ss.attachSound("bei2");
ss.start(1,100);
