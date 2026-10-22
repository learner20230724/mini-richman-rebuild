onClipEvent(keyDown){
   if(_root.shui == 1)
   {
      if(h == 1)
      {
         temp = Key.getCode();
         if(temp == 68 && this._x < 130)
         {
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
            this._x += 50;
         }
         else if(temp == 65 && this._x > 30)
         {
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
            this._x -= 50;
         }
         else if(temp == 87)
         {
            _root.wenben = "谢谢惠顾";
            if(this._x == 0)
            {
               if(_root.zuanshi1 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "终于有回报了";
                  _root.xianjin1 += 2000;
                  _root.zuanshi1 = 0;
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
               else if(_root.xianjin1 >= 200)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin1 -= 200;
                  _root.zuanshi1++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == 50)
            {
               if(_root.wuxing1 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "发笔小财";
                  _root.xianjin1 += 1000;
                  _root.wuxing1 = 0;
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
               else if(_root.xianjin1 >= 100)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin1 -= 100;
                  _root.wuxing1++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == 100)
            {
               if(_root.yumao1 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "有钱真好";
                  _root.xianjin1 += 2000;
                  _root.yumao1 = 0;
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
               else if(_root.xianjin1 >= 200)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin1 -= 200;
                  _root.yumao1++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == 150)
            {
               if(_root.dilei1 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "赚发了";
                  _root.xianjin1 += 3000;
                  _root.dilei1 = 0;
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
               else if(_root.xianjin1 >= 300)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin1 -= 300;
                  _root.dilei1++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
         }
         else if(temp == 83)
         {
            this._visible = false;
            h = 0;
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
            _root.wenben = "下次再买";
            _root.attachMovie("tt","tt",88,{_x:0,_y:0});
         }
      }
   }
   else if(_root.shui == 2)
   {
      if(h == 1)
      {
         temp = Key.getCode();
         if(temp == 39 && this._x < 130)
         {
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
            this._x += 50;
         }
         else if(temp == 37 && this._x > 30)
         {
            ss = new Sound();
            ss.attachSound("xuanren");
            ss.start();
            this._x -= 50;
         }
         else if(temp == 38)
         {
            _root.wenben = "谢谢惠顾";
            if(this._x == 0)
            {
               if(_root.zuanshi2 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "终于有回报了";
                  _root.xianjin2 += 2000;
                  _root.zuanshi2 = 0;
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
               else if(_root.xianjin2 >= 200)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin2 -= 200;
                  _root.zuanshi2++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == 50)
            {
               if(_root.wuxing2 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "发笔小财";
                  _root.xianjin2 += 1000;
                  _root.wuxing2 = 0;
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
               else if(_root.xianjin2 >= 100)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin2 -= 100;
                  _root.wuxing2++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == 100)
            {
               if(_root.yumao2 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "有钱真好";
                  _root.xianjin2 += 2000;
                  _root.yumao2 = 0;
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
               else if(_root.xianjin2 >= 200)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin2 -= 200;
                  _root.yumao2++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == 150)
            {
               if(_root.dilei2 == 5)
               {
                  this._visible = false;
                  h = 0;
                  _root.wenben = "赚发了";
                  _root.xianjin2 += 3000;
                  _root.dilei2 = 0;
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
               else if(_root.xianjin2 >= 300)
               {
                  this._visible = false;
                  h = 0;
                  _root.xianjin2 -= 300;
                  _root.dilei2++;
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
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
         }
         else if(temp == 40)
         {
            this._visible = false;
            h = 0;
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
            _root.wenben = "下次再买";
            _root.attachMovie("tt","tt",88,{_x:0,_y:0});
         }
      }
   }
}
