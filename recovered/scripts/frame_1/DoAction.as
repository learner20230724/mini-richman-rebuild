function kaishi()
{
   if(_root.pp1 == 1 && _root.pp2 == 1)
   {
      _root.n = _root.n - 1;
      if(_root.n == 0)
      {
         clearInterval(mm1);
         _root.gotoAndPlay(2);
      }
   }
}
stop();
pp1 = 0;
pp2 = 0;
n = 20;
mm1 = setInterval(kaishi,100);
