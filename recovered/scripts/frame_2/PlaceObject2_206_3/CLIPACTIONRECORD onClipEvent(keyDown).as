onClipEvent(keyDown){
   function xingzou()
   {
      ss = new Sound();
      ss.attachSound("tiao.wav");
      ss.start();
      if(_root.renwu2._y < 10 && _root.renwu2._x < 550)
      {
         _root.renwu2._x += 50;
      }
      else if(_root.renwu2._x > 550 && _root.renwu2._y < 400)
      {
         _root.renwu2._y += 50;
      }
      else if(_root.renwu2._y > 400 && _root.renwu2._x > 50)
      {
         _root.renwu2._x -= 50;
      }
      else if(_root.renwu2._x < 10 && _root.renwu2._y > 50)
      {
         _root.renwu2._y -= 50;
      }
      p--;
      if(_root.renwu2._y < 10 && _root.renwu2._x > 250 && _root.renwu2._x < 300)
      {
         _root.wenben = "经过银行奖励" + _root.jiangjin2 + "元";
         _root.xianjin2 += _root.jiangjin2;
      }
      if(p == 0)
      {
         if(_root.renwu2._y < 10 && _root.renwu2._x > 300 && _root.renwu2._x < 350)
         {
            _root.weizhi = 1;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 350 && _root.renwu2._x < 400)
         {
            _root.weizhi = 2;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 400 && _root.renwu2._x < 450)
         {
            _root.weizhi = 3;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 450 && _root.renwu2._x < 500)
         {
            _root.weizhi = 4;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 500 && _root.renwu2._x < 550)
         {
            _root.weizhi = 5;
         }
         else if(_root.renwu2._y < 100 && _root.renwu2._y > 50 && _root.renwu2._x > 550)
         {
            _root.weizhi = 6;
         }
         else if(_root.renwu2._y < 150 && _root.renwu2._y > 100 && _root.renwu2._x > 550)
         {
            _root.weizhi = 7;
         }
         else if(_root.renwu2._y < 250 && _root.renwu2._y > 200 && _root.renwu2._x > 550)
         {
            _root.weizhi = 8;
         }
         else if(_root.renwu2._y < 300 && _root.renwu2._y > 250 && _root.renwu2._x > 550)
         {
            _root.weizhi = 9;
         }
         else if(_root.renwu2._y < 350 && _root.renwu2._y > 300 && _root.renwu2._x > 550)
         {
            _root.weizhi = 10;
         }
         else if(_root.renwu2._y < 400 && _root.renwu2._y > 350 && _root.renwu2._x > 550)
         {
            _root.weizhi = 11;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 500 && _root.renwu2._x < 550)
         {
            _root.weizhi = 12;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 450 && _root.renwu2._x < 500)
         {
            _root.weizhi = 13;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 400 && _root.renwu2._x < 450)
         {
            _root.weizhi = 14;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 350 && _root.renwu2._x < 400)
         {
            _root.weizhi = 15;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 250 && _root.renwu2._x < 300)
         {
            _root.weizhi = 16;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 200 && _root.renwu2._x < 250)
         {
            _root.weizhi = 17;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 150 && _root.renwu2._x < 200)
         {
            _root.weizhi = 18;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 100 && _root.renwu2._x < 150)
         {
            _root.weizhi = 19;
         }
         else if(_root.renwu2._y > 400 && _root.renwu2._x > 50 && _root.renwu2._x < 100)
         {
            _root.weizhi = 20;
         }
         else if(_root.renwu2._y < 400 && _root.renwu2._y > 350 && _root.renwu2._x < 50)
         {
            _root.weizhi = 21;
         }
         else if(_root.renwu2._y < 350 && _root.renwu2._y > 300 && _root.renwu2._x < 50)
         {
            _root.weizhi = 22;
         }
         else if(_root.renwu2._y < 250 && _root.renwu2._y > 200 && _root.renwu2._x < 50)
         {
            _root.weizhi = 23;
         }
         else if(_root.renwu2._y < 200 && _root.renwu2._y > 150 && _root.renwu2._x < 50)
         {
            _root.weizhi = 24;
         }
         else if(_root.renwu2._y < 150 && _root.renwu2._y > 100 && _root.renwu2._x < 50)
         {
            _root.weizhi = 25;
         }
         else if(_root.renwu2._y < 100 && _root.renwu2._y > 50 && _root.renwu2._x < 50)
         {
            _root.weizhi = 26;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 50 && _root.renwu2._x < 100)
         {
            _root.weizhi = 27;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 100 && _root.renwu2._x < 150)
         {
            _root.weizhi = 28;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 150 && _root.renwu2._x < 200)
         {
            _root.weizhi = 29;
         }
         else if(_root.renwu2._y < 10 && _root.renwu2._x > 200 && _root.renwu2._x < 250)
         {
            _root.weizhi = 30;
         }
         else
         {
            _root.weizhi = 0;
         }
         if(_root.shuyu[_root.weizhi] == 0 && _root.xianjin2 >= _root.xianjin[_root.weizhi] && _root.zuanshi2 >= _root.zuanshi[_root.weizhi] && _root.jibie[_root.weizhi] == 0)
         {
            _root.attachMovie("maidi","maidi",88,{_x:340,_y:180});
            _root.tanchu = 1;
         }
         else if(_root.shuyu[_root.weizhi] == 2 && _root.xianjin2 >= 200 && _root.jibie[_root.weizhi] == 0)
         {
            _root.attachMovie("jianfang","jianfang",88,{_x:340,_y:180});
            _root.tanchu = 1;
         }
         else if(_root.shuyu[_root.weizhi] == 2 && _root.wuxing2 >= 1 && _root.jibie[_root.weizhi] == 1)
         {
            _root.attachMovie("shengji","shengji",88,{_x:340,_y:180});
            _root.tanchu = 1;
         }
         else if(_root.shuyu[_root.weizhi] == 2 && _root.wuxing2 >= 1 && _root.jibie[_root.weizhi] == 2)
         {
            _root.attachMovie("bieshu","bieshu",88,{_x:340,_y:180});
            _root.tanchu = 1;
         }
         else if(_root.shuyu[_root.weizhi] == 2 && _root.xianjin2 < 200 && _root.jibie[_root.weizhi] == 0 && _root.dilei2 > 0)
         {
            _root.attachMovie("fanglei","fanglei",88,{_x:340,_y:180});
            _root.tanchu = 1;
         }
         else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 1 && _root.yumao2 == 0 && _root.zhuyuan1 == 0)
         {
            _root.wenben = "请付100元住宿费";
            _root.xianjin2 -= 100;
            _root.xianjin1 += 100 * (1 - _root.shuilv1 / 100);
            if(_root.xianjin2 + _root.touzhi2 < 0)
            {
               ss.stop();
               _root.gotoAndPlay(3);
            }
         }
         else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 2 && _root.yumao2 == 0 && _root.zhuyuan1 == 0)
         {
            _root.wenben = "请付200元住宿费";
            _root.xianjin2 -= 200;
            _root.xianjin1 += 200 * (1 - _root.shuilv1 / 100);
            if(_root.xianjin2 + _root.touzhi2 < 0)
            {
               ss.stop();
               _root.gotoAndPlay(3);
            }
         }
         else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 3 && _root.zhuyuan1 == 0)
         {
            _root.attachMovie("lunzi","lunzi",88,{_x:360,_y:170});
            _root.tanchu = 1;
         }
         else if(_root.shuyu[_root.weizhi] == 1 && (_root.jibie[_root.weizhi] == 1 || _root.jibie[_root.weizhi] == 2) && _root.yumao2 > 0 && _root.zhuyuan1 == 0)
         {
            _root.attachMovie("baohu","baohu",88,{_x:340,_y:180});
            _root.tanchu = 1;
         }
         else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 4 && _root.yumao2 == 0)
         {
            _root.zhuyuan2 = 3 + random(7);
            if(_root.zhuyuan2 == 3)
            {
               _root.wenben = "小毛病，住院3天";
            }
            else if(_root.zhuyuan2 == 4)
            {
               _root.wenben = "摔了一交，住院4天";
            }
            else if(_root.zhuyuan2 == 5)
            {
               _root.wenben = "掉进下水道，住院5天";
            }
            else if(_root.zhuyuan2 == 6)
            {
               _root.wenben = "遭人殴打，住院6天";
            }
            else if(_root.zhuyuan2 == 7)
            {
               _root.wenben = "天外来砖，住院7天";
            }
            else if(_root.zhuyuan2 == 8)
            {
               _root.wenben = "出车祸，住院8天";
            }
            else if(_root.zhuyuan2 == 9)
            {
               _root.wenben = "炸成残废，住院9天";
            }
            ss = new Sound();
            ss.attachSound("zha");
            ss.start();
            x = int(_root.renwu2._x / 50) * 50 + 10;
            y = int(_root.renwu2._y / 50) * 50 + 10;
            while(_root.renwu2._x > 50)
            {
               _root.renwu2._x -= 50;
            }
            while(_root.renwu2._y < 400)
            {
               _root.renwu2._y += 50;
            }
            _root.renwu2._x += 300;
            _root.jibie[_root.weizhi] = 0;
            _root.attachMovie("baozha","baozha",50 + _root.weizhi,{_x:x,_y:y});
         }
         else if(_root.shuyu[_root.weizhi] == 1 && (_root.jibie[_root.weizhi] == 1 || _root.jibie[_root.weizhi] == 2 || _root.jibie[_root.weizhi] == 3) && _root.zhuyuan1 > 0)
         {
            _root.wenben = _root.name1 + "在医院，免费住店";
         }
         else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 4 && _root.zhuyuan1 > 0)
         {
            _root.wenben = _root.name1 + "在住院，逃过一劫";
         }
         else if(_root.shuyu[_root.weizhi] == 1 && _root.jibie[_root.weizhi] == 4 && _root.zhuyuan1 == 0 && _root.yumao2 > 0)
         {
            _root.attachMovie("baohulei","baohulei",88,{_x:340,_y:180});
            _root.tanchu = 1;
         }
         else if((_root.renwu2._y < 10 || _root.renwu2._y > 400) && (_root.renwu2._x < 10 || _root.renwu2._x > 550))
         {
            _root.attachMovie("chaoshi","chaoshi",88,{_x:320,_y:260});
            _root.tanchu = 1;
         }
         else if(_root.renwu2._y > 150 && _root.renwu2._y < 200 && _root.renwu2._x > 550)
         {
            _root.attachMovie("ducheng","ducheng",88,{_x:340,_y:240});
            _root.tanchu = 1;
         }
         else if(_root.renwu2._y > 250 && _root.renwu2._y < 300 && _root.renwu2._x < 30)
         {
            _root.attachMovie("mingyun","mingyun",88,{_x:430,_y:250});
            _root.tanchu = 1;
         }
         else if(_root.renwu2._x > 300 && _root.renwu2._x < 350 && _root.renwu2._y > 400 && _root.zhuyuan1 == 0)
         {
            _root.zhuyuan2 = 2;
            _root.wenben = "住院1天";
         }
         else if(_root.renwu2._x > 300 && _root.renwu2._x < 350 && _root.renwu2._y > 400 && _root.zhuyuan1 > 0)
         {
            _root.wenben = "医院没有空位了";
         }
         if(_root.zhuyuan1 > 0)
         {
            _root.zhuyuan1 = _root.zhuyuan1 - 1;
            if(_root.tanchu == 0)
            {
               _root.xingqi = 2;
               _root.shaizi.gotoAndPlay(1);
            }
            if(_root.zhuyuan1 == 0 && _root.tanchu == 0)
            {
               _root.wenben = _root.name1 + "出院";
               _root.shui = 1;
               _root.xingqi = 1;
               _root.pp = "1P";
               _root.shaizi.gotoAndPlay(1);
            }
         }
         else if(_root.tanchu == 0)
         {
            _root.shui = 1;
            _root.xingqi = 1;
            _root.pp = "1P";
            _root.shaizi.gotoAndPlay(1);
         }
         clearInterval(mm);
      }
   }
   if(_root.xingqi == 2 && Key.getCode() == 38)
   {
      _root.attachMovie("tt","tt",88,{_x:0,_y:0});
      _root.tanchu = 0;
      p = random(6) + 1;
      _root.xingqi = 0;
      _root.shaizi.gotoAndStop(p);
      _root.wenben = "前进";
      mm = setInterval(xingzou,700);
   }
}
