onClipEvent(keyDown){
   if(Key.getCode() == 87 && _root.shui == 1)
   {
      if(_root.weizhi < 6)
      {
         _root.xianjin1 -= 400;
         _root.zuanshi1 -= 3;
         _root.wenben = "有钱人就是不一样";
         i = 1;
         while(i < 6)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:251 + i * 50,_y:1,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi < 8)
      {
         _root.xianjin1 -= 300;
         _root.zuanshi1 -= 1;
         _root.wenben = "经济又实惠";
         i = 6;
         while(i < 8)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:551,_y:i * 50 - 249,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi < 12)
      {
         _root.xianjin1 -= 700;
         _root.zuanshi1 -= 2;
         _root.wenben = "这地肯定有发展";
         i = 8;
         while(i < 12)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:551,_y:i * 50 - 199,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi == 12)
      {
         _root.shuyu[12] = 1;
         _root.zuanshi1 -= 1;
         _root.wenben = "捡个小便宜";
         _root.attachMovie(_root.ppp1,_root.ppp1,12,{_x:501,_y:401,_alpha:20});
      }
      else if(_root.weizhi < 16)
      {
         _root.xianjin1 -= 1000;
         _root.wenben = "有钱就得花";
         i = 13;
         while(i < 16)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:1101 - i * 50,_y:401,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi < 21)
      {
         _root.xianjin1 -= 1200;
         _root.zuanshi1 -= 2;
         _root.wenben = "黄金地段";
         i = 16;
         while(i < 21)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:1051 - i * 50,_y:401,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi < 23)
      {
         _root.xianjin1 -= 800;
         _root.wenben = "这块地归我了";
         i = 21;
         while(i < 23)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:1,_y:1401 - i * 50,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi < 27)
      {
         _root.zuanshi1 -= 5;
         _root.wenben = "钻石总算派上用场了";
         i = 23;
         while(i < 27)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:1,_y:1351 - i * 50,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi < 30)
      {
         _root.xianjin1 -= 600;
         _root.zuanshi1 -= 2;
         _root.wenben = "这块地是我的";
         i = 27;
         while(i < 30)
         {
            _root.attachMovie(_root.ppp1,_root.ppp1,i,{_x:i * 50 - 1299,_y:1,_alpha:20});
            _root.shuyu[i] = 1;
            i++;
         }
      }
      else if(_root.weizhi == 30)
      {
         _root.shuyu[30] = 1;
         _root.xianjin1 -= 500;
         _root.wenben = "小地方，大发展";
         _root.attachMovie(_root.ppp1,_root.ppp1,30,{_x:201,_y:1,_alpha:20});
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
   else if(Key.getCode() == 83 && _root.shui == 1)
   {
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
      _root.wenben = "下次再说";
      _root.attachMovie("tt","tt",88,{_x:0,_y:0});
   }
   else if(Key.getCode() == 38 && _root.shui == 2)
   {
      if(_root.weizhi < 6)
      {
         _root.xianjin2 -= 400;
         _root.zuanshi2 -= 3;
         _root.wenben = "有钱人就是不一样";
         i = 1;
         while(i < 6)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:251 + i * 50,_y:1,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi < 8)
      {
         _root.xianjin2 -= 300;
         _root.zuanshi2 -= 1;
         _root.wenben = "经济又实惠";
         i = 6;
         while(i < 8)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:551,_y:i * 50 - 249,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi < 12)
      {
         _root.xianjin2 -= 700;
         _root.zuanshi2 -= 2;
         _root.wenben = "这地肯定有发展";
         i = 8;
         while(i < 12)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:551,_y:i * 50 - 199,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi == 12)
      {
         _root.shuyu[12] = 2;
         _root.zuanshi2 -= 1;
         _root.wenben = "捡个小便宜";
         _root.attachMovie(_root.ppp2,_root.ppp2,12,{_x:501,_y:401,_alpha:20});
      }
      else if(_root.weizhi < 16)
      {
         _root.xianjin2 -= 1000;
         _root.wenben = "有钱就得花";
         i = 13;
         while(i < 16)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:1101 - i * 50,_y:401,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi < 21)
      {
         _root.xianjin2 -= 1200;
         _root.zuanshi2 -= 2;
         _root.wenben = "黄金地段";
         i = 16;
         while(i < 21)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:1051 - i * 50,_y:401,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi < 23)
      {
         _root.xianjin2 -= 800;
         _root.wenben = "这块地归我了";
         i = 21;
         while(i < 23)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:1,_y:1401 - i * 50,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi < 27)
      {
         _root.zuanshi2 -= 5;
         _root.wenben = "钻石总算派上用场了";
         i = 23;
         while(i < 27)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:1,_y:1351 - i * 50,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi < 30)
      {
         _root.xianjin2 -= 600;
         _root.zuanshi2 -= 2;
         _root.wenben = "这块地是我的";
         i = 27;
         while(i < 30)
         {
            _root.attachMovie(_root.ppp2,_root.ppp2,i,{_x:i * 50 - 1299,_y:1,_alpha:20});
            _root.shuyu[i] = 2;
            i++;
         }
      }
      else if(_root.weizhi == 30)
      {
         _root.shuyu[30] = 2;
         _root.xianjin2 -= 500;
         _root.wenben = "小地方，大发展";
         _root.attachMovie(_root.ppp2,_root.ppp2,30,{_x:201,_y:1,_alpha:20});
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
   else if(Key.getCode() == 40 && _root.shui == 2)
   {
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
      _root.wenben = "下次再说";
      _root.attachMovie("tt","tt",88,{_x:0,_y:0});
   }
}
