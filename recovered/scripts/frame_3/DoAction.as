stop();
shijian = yongshi;
i = 0;
while(i < 188)
{
   _root.attachMovie("tt","tt",i,{_x:0,_y:0});
   i++;
}
if(_root.touzhi1 + _root.xianjin1 < 0)
{
   _root.attachMovie(ppp2,ppp2,1,{_x:220,_y:80,_width:160,_height:160});
   jieguo = "胜利者是" + name2;
}
else if(_root.touzhi2 + _root.xianjin2 < 0)
{
   _root.attachMovie(ppp1,ppp1,1,{_x:220,_y:80,_width:160,_height:160});
   jieguo = "胜利者是" + name1;
}
clearInterval(jiajia);
