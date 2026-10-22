_root.wenben = "是否买下此块地皮";
if(_root.shui == 1)
{
   this.attachMovie(_root.ppp1,_root.ppp1,100,{_x:110,_y:30});
}
else if(_root.shui == 2)
{
   this.attachMovie(_root.ppp2,_root.ppp2,100,{_x:110,_y:30});
}
ss = new Sound();
ss.attachSound("foushi");
ss.start();
