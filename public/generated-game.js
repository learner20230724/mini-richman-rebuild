// Generated from pinned SWF static decompilation. Do not hand edit.
const RichmanScripts = [
// DefineSprite_10_maidi/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "是否买下此块地皮";
if(_root.shui == _config.number("src.s0.l2.n1"))
{
   _invoke(this,"attachMovie",_root.ppp1,_root.ppp1,_config.number("src.s0.l4.n1"),{_x:_config.number("src.s0.l4.n2"),_y:_config.number("src.s0.l4.n3")});
}
else if(_root.shui == _config.number("src.s0.l6.n1"))
{
   _invoke(this,"attachMovie",_root.ppp2,_root.ppp2,_config.number("src.s0.l8.n1"),{_x:_config.number("src.s0.l8.n2"),_y:_config.number("src.s0.l8.n3")});
}
ss = new Sound();
_invoke(ss,"attachSound","foushi");
_invoke(ss,"start",);

} },
// DefineSprite_10_maidi/frame_1/PlaceObject2_7_shifou_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s1.l2.n1") && _root.shui == _config.number("src.s1.l2.n2"))
   {
      _root.xianjin1 -= _root.xianjin[_root.weizhi];
      _root.zuanshi1 -= _root.zuanshi[_root.weizhi];
      if(_root.weizhi < _config.number("src.s1.l6.n1"))
      {
         _root.wenben = "有钱人就是不一样";
         i = _config.number("src.s1.l9.n1");
         while(i < _config.number("src.s1.l10.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:_config.number("src.s1.l12.n1") + i * _config.number("src.s1.l12.n2"),_y:_config.number("src.s1.l12.n3"),_alpha:_config.number("src.s1.l12.n4")});
            _root.shuyu[i] = _config.number("src.s1.l13.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l17.n1"))
      {
         _root.wenben = "经济又实惠";
         i = _config.number("src.s1.l20.n1");
         while(i < _config.number("src.s1.l21.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:_config.number("src.s1.l23.n1"),_y:i * _config.number("src.s1.l23.n2") - _config.number("src.s1.l23.n3"),_alpha:_config.number("src.s1.l23.n4")});
            _root.shuyu[i] = _config.number("src.s1.l24.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l28.n1"))
      {
         _root.wenben = "这地肯定有发展";
         i = _config.number("src.s1.l31.n1");
         while(i < _config.number("src.s1.l32.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:_config.number("src.s1.l34.n1"),_y:i * _config.number("src.s1.l34.n2") - _config.number("src.s1.l34.n3"),_alpha:_config.number("src.s1.l34.n4")});
            _root.shuyu[i] = _config.number("src.s1.l35.n1");
            i++;
         }
      }
      else if(_root.weizhi == _config.number("src.s1.l39.n1"))
      {
         _root.shuyu[_config.number("src.s1.l41.n1")] = _config.number("src.s1.l41.n2");
         _root.wenben = "捡个小便宜";
         _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,_config.number("src.s1.l43.n1"),{_x:_config.number("src.s1.l43.n2"),_y:_config.number("src.s1.l43.n3"),_alpha:_config.number("src.s1.l43.n4")});
      }
      else if(_root.weizhi < _config.number("src.s1.l45.n1"))
      {
         _root.wenben = "有钱就得花";
         i = _config.number("src.s1.l48.n1");
         while(i < _config.number("src.s1.l49.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:_config.number("src.s1.l51.n1") - i * _config.number("src.s1.l51.n2"),_y:_config.number("src.s1.l51.n3"),_alpha:_config.number("src.s1.l51.n4")});
            _root.shuyu[i] = _config.number("src.s1.l52.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l56.n1"))
      {
         _root.wenben = "黄金地段";
         i = _config.number("src.s1.l59.n1");
         while(i < _config.number("src.s1.l60.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:_config.number("src.s1.l62.n1") - i * _config.number("src.s1.l62.n2"),_y:_config.number("src.s1.l62.n3"),_alpha:_config.number("src.s1.l62.n4")});
            _root.shuyu[i] = _config.number("src.s1.l63.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l67.n1"))
      {
         _root.wenben = "这块地归我了";
         i = _config.number("src.s1.l70.n1");
         while(i < _config.number("src.s1.l71.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:_config.number("src.s1.l73.n1"),_y:_config.number("src.s1.l73.n2") - i * _config.number("src.s1.l73.n3"),_alpha:_config.number("src.s1.l73.n4")});
            _root.shuyu[i] = _config.number("src.s1.l74.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l78.n1"))
      {
         _root.wenben = "钻石总算派上用场了";
         i = _config.number("src.s1.l81.n1");
         while(i < _config.number("src.s1.l82.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:_config.number("src.s1.l84.n1"),_y:_config.number("src.s1.l84.n2") - i * _config.number("src.s1.l84.n3"),_alpha:_config.number("src.s1.l84.n4")});
            _root.shuyu[i] = _config.number("src.s1.l85.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l89.n1"))
      {
         _root.wenben = "这块地是我的";
         i = _config.number("src.s1.l92.n1");
         while(i < _config.number("src.s1.l93.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,i,{_x:i * _config.number("src.s1.l95.n1") - _config.number("src.s1.l95.n2"),_y:_config.number("src.s1.l95.n3"),_alpha:_config.number("src.s1.l95.n4")});
            _root.shuyu[i] = _config.number("src.s1.l96.n1");
            i++;
         }
      }
      else if(_root.weizhi == _config.number("src.s1.l100.n1"))
      {
         _root.shuyu[_config.number("src.s1.l102.n1")] = _config.number("src.s1.l102.n2");
         _root.wenben = "小地方，大发展";
         _invoke(_root,"attachMovie",_root.ppp1,_root.ppp1,_config.number("src.s1.l104.n1"),{_x:_config.number("src.s1.l104.n2"),_y:_config.number("src.s1.l104.n3"),_alpha:_config.number("src.s1.l104.n4")});
      }
      if(_root.zhuyuan2 == _config.number("src.s1.l106.n1"))
      {
         _root.shui = _config.number("src.s1.l108.n1");
         _root.xingqi = _config.number("src.s1.l109.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l111.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s1.l115.n1");
         _root.xingqi = _config.number("src.s1.l116.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l118.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s1.l120.n1"),{_x:_config.number("src.s1.l120.n2"),_y:_config.number("src.s1.l120.n3")});
   }
   else if(Key.getCode() == _config.number("src.s1.l122.n1") && _root.shui == _config.number("src.s1.l122.n2"))
   {
      if(_root.zhuyuan2 == _config.number("src.s1.l124.n1"))
      {
         _root.shui = _config.number("src.s1.l126.n1");
         _root.xingqi = _config.number("src.s1.l127.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l129.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s1.l133.n1");
         _root.xingqi = _config.number("src.s1.l134.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l136.n1"));
      }
      _root.wenben = "下次再说";
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s1.l139.n1"),{_x:_config.number("src.s1.l139.n2"),_y:_config.number("src.s1.l139.n3")});
   }
   else if(Key.getCode() == _config.number("src.s1.l141.n1") && _root.shui == _config.number("src.s1.l141.n2"))
   {
      _root.xianjin2 -= _root.xianjin[_root.weizhi];
      _root.zuanshi2 -= _root.zuanshi[_root.weizhi];
      if(_root.weizhi < _config.number("src.s1.l145.n1"))
      {
         _root.wenben = "有钱人就是不一样";
         i = _config.number("src.s1.l148.n1");
         while(i < _config.number("src.s1.l149.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:_config.number("src.s1.l151.n1") + i * _config.number("src.s1.l151.n2"),_y:_config.number("src.s1.l151.n3"),_alpha:_config.number("src.s1.l151.n4")});
            _root.shuyu[i] = _config.number("src.s1.l152.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l156.n1"))
      {
         _root.wenben = "经济又实惠";
         i = _config.number("src.s1.l159.n1");
         while(i < _config.number("src.s1.l160.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:_config.number("src.s1.l162.n1"),_y:i * _config.number("src.s1.l162.n2") - _config.number("src.s1.l162.n3"),_alpha:_config.number("src.s1.l162.n4")});
            _root.shuyu[i] = _config.number("src.s1.l163.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l167.n1"))
      {
         _root.wenben = "这地肯定有发展";
         i = _config.number("src.s1.l170.n1");
         while(i < _config.number("src.s1.l171.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:_config.number("src.s1.l173.n1"),_y:i * _config.number("src.s1.l173.n2") - _config.number("src.s1.l173.n3"),_alpha:_config.number("src.s1.l173.n4")});
            _root.shuyu[i] = _config.number("src.s1.l174.n1");
            i++;
         }
      }
      else if(_root.weizhi == _config.number("src.s1.l178.n1"))
      {
         _root.shuyu[_config.number("src.s1.l180.n1")] = _config.number("src.s1.l180.n2");
         _root.wenben = "捡个小便宜";
         _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,_config.number("src.s1.l182.n1"),{_x:_config.number("src.s1.l182.n2"),_y:_config.number("src.s1.l182.n3"),_alpha:_config.number("src.s1.l182.n4")});
      }
      else if(_root.weizhi < _config.number("src.s1.l184.n1"))
      {
         _root.wenben = "有钱就得花";
         i = _config.number("src.s1.l187.n1");
         while(i < _config.number("src.s1.l188.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:_config.number("src.s1.l190.n1") - i * _config.number("src.s1.l190.n2"),_y:_config.number("src.s1.l190.n3"),_alpha:_config.number("src.s1.l190.n4")});
            _root.shuyu[i] = _config.number("src.s1.l191.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l195.n1"))
      {
         _root.wenben = "黄金地段";
         i = _config.number("src.s1.l198.n1");
         while(i < _config.number("src.s1.l199.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:_config.number("src.s1.l201.n1") - i * _config.number("src.s1.l201.n2"),_y:_config.number("src.s1.l201.n3"),_alpha:_config.number("src.s1.l201.n4")});
            _root.shuyu[i] = _config.number("src.s1.l202.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l206.n1"))
      {
         _root.wenben = "这块地归我了";
         i = _config.number("src.s1.l209.n1");
         while(i < _config.number("src.s1.l210.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:_config.number("src.s1.l212.n1"),_y:_config.number("src.s1.l212.n2") - i * _config.number("src.s1.l212.n3"),_alpha:_config.number("src.s1.l212.n4")});
            _root.shuyu[i] = _config.number("src.s1.l213.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l217.n1"))
      {
         _root.wenben = "钻石总算派上用场了";
         i = _config.number("src.s1.l220.n1");
         while(i < _config.number("src.s1.l221.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:_config.number("src.s1.l223.n1"),_y:_config.number("src.s1.l223.n2") - i * _config.number("src.s1.l223.n3"),_alpha:_config.number("src.s1.l223.n4")});
            _root.shuyu[i] = _config.number("src.s1.l224.n1");
            i++;
         }
      }
      else if(_root.weizhi < _config.number("src.s1.l228.n1"))
      {
         _root.wenben = "这块地是我的";
         i = _config.number("src.s1.l231.n1");
         while(i < _config.number("src.s1.l232.n1"))
         {
            _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,i,{_x:i * _config.number("src.s1.l234.n1") - _config.number("src.s1.l234.n2"),_y:_config.number("src.s1.l234.n3"),_alpha:_config.number("src.s1.l234.n4")});
            _root.shuyu[i] = _config.number("src.s1.l235.n1");
            i++;
         }
      }
      else if(_root.weizhi == _config.number("src.s1.l239.n1"))
      {
         _root.shuyu[_config.number("src.s1.l241.n1")] = _config.number("src.s1.l241.n2");
         _root.wenben = "小地方，大发展";
         _invoke(_root,"attachMovie",_root.ppp2,_root.ppp2,_config.number("src.s1.l243.n1"),{_x:_config.number("src.s1.l243.n2"),_y:_config.number("src.s1.l243.n3"),_alpha:_config.number("src.s1.l243.n4")});
      }
      if(_root.zhuyuan1 == _config.number("src.s1.l245.n1"))
      {
         _root.shui = _config.number("src.s1.l247.n1");
         _root.xingqi = _config.number("src.s1.l248.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l250.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s1.l254.n1");
         _root.xingqi = _config.number("src.s1.l255.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l257.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s1.l259.n1"),{_x:_config.number("src.s1.l259.n2"),_y:_config.number("src.s1.l259.n3")});
   }
   else if(Key.getCode() == _config.number("src.s1.l261.n1") && _root.shui == _config.number("src.s1.l261.n2"))
   {
      if(_root.zhuyuan1 == _config.number("src.s1.l263.n1"))
      {
         _root.shui = _config.number("src.s1.l265.n1");
         _root.xingqi = _config.number("src.s1.l266.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l268.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s1.l272.n1");
         _root.xingqi = _config.number("src.s1.l273.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s1.l275.n1"));
      }
      _root.wenben = "下次再说";
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s1.l278.n1"),{_x:_config.number("src.s1.l278.n2"),_y:_config.number("src.s1.l278.n3")});
   }

} },
// DefineSprite_135_shaizi/frame_1/DoAction.as
function(__scope) { with (__scope) {
if(_root.xingqi == _config.number("src.s2.l1.n1"))
{
   stop();
}

} },
// DefineSprite_135_shaizi/frame_2/DoAction.as
function(__scope) { with (__scope) {
if(_root.xingqi == _config.number("src.s3.l1.n1"))
{
   stop();
}

} },
// DefineSprite_135_shaizi/frame_3/DoAction.as
function(__scope) { with (__scope) {
if(_root.xingqi == _config.number("src.s4.l1.n1"))
{
   stop();
}

} },
// DefineSprite_135_shaizi/frame_4/DoAction.as
function(__scope) { with (__scope) {
if(_root.xingqi == _config.number("src.s5.l1.n1"))
{
   stop();
}

} },
// DefineSprite_135_shaizi/frame_5/DoAction.as
function(__scope) { with (__scope) {
if(_root.xingqi == _config.number("src.s6.l1.n1"))
{
   stop();
}

} },
// DefineSprite_135_shaizi/frame_6/DoAction.as
function(__scope) { with (__scope) {
if(_root.xingqi == _config.number("src.s7.l1.n1"))
{
   stop();
}

} },
// DefineSprite_13_jianfang/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "是否在此处建房";
ss = new Sound();
_invoke(ss,"attachSound","foushi");
_invoke(ss,"start",);

} },
// DefineSprite_13_jianfang/frame_1/PlaceObject2_7_shifou_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s9.l2.n1") && _root.shui == _config.number("src.s9.l2.n2"))
   {
      _root.wenben = "这是" + _root.name1 + "的房子了";
      _root.f11++;
      _root.xianjin1 -= _config.number("rules.houseCash");
      _root.jibie[_root.weizhi] = _config.number("src.s9.l7.n1");
      x = int(_root.renwu1._x / _config.number("src.s9.l8.n1")) * _config.number("src.s9.l8.n2");
      y = int(_root.renwu1._y / _config.number("src.s9.l9.n1")) * _config.number("src.s9.l9.n2");
      _invoke(_root,"attachMovie","f1","f1",_config.number("src.s9.l10.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan2 == _config.number("src.s9.l11.n1"))
      {
         _root.shui = _config.number("src.s9.l13.n1");
         _root.xingqi = _config.number("src.s9.l14.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l16.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s9.l20.n1");
         _root.xingqi = _config.number("src.s9.l21.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l23.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s9.l25.n1"),{_x:_config.number("src.s9.l25.n2"),_y:_config.number("src.s9.l25.n3")});
   }
   else if(Key.getCode() == _config.number("src.s9.l27.n1") && _root.shui == _config.number("src.s9.l27.n2") && _root.dilei1 == _config.number("src.s9.l27.n3"))
   {
      if(_root.zhuyuan2 == _config.number("src.s9.l29.n1"))
      {
         _root.shui = _config.number("src.s9.l31.n1");
         _root.xingqi = _config.number("src.s9.l32.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l34.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s9.l38.n1");
         _root.xingqi = _config.number("src.s9.l39.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l41.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s9.l43.n1"),{_x:_config.number("src.s9.l43.n2"),_y:_config.number("src.s9.l43.n3")});
   }
   else if(Key.getCode() == _config.number("src.s9.l45.n1") && _root.shui == _config.number("src.s9.l45.n2") && _root.dilei1 > _config.number("src.s9.l45.n3"))
   {
      _invoke(_root,"attachMovie","fanglei","fanglei",_config.number("src.s9.l47.n1"),{_x:_config.number("src.s9.l47.n2"),_y:_config.number("src.s9.l47.n3")});
   }
   else if(Key.getCode() == _config.number("src.s9.l49.n1") && _root.shui == _config.number("src.s9.l49.n2"))
   {
      _root.wenben = "这是" + _root.name2 + "的房子了";
      _root.xianjin2 -= _config.number("rules.houseCash");
      _root.f21++;
      _root.jibie[_root.weizhi] = _config.number("src.s9.l54.n1");
      x = int(_root.renwu2._x / _config.number("src.s9.l55.n1")) * _config.number("src.s9.l55.n2");
      y = int(_root.renwu2._y / _config.number("src.s9.l56.n1")) * _config.number("src.s9.l56.n2");
      _invoke(_root,"attachMovie","z1","z1",_config.number("src.s9.l57.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan1 == _config.number("src.s9.l58.n1"))
      {
         _root.shui = _config.number("src.s9.l60.n1");
         _root.xingqi = _config.number("src.s9.l61.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l63.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s9.l67.n1");
         _root.xingqi = _config.number("src.s9.l68.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l70.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s9.l72.n1"),{_x:_config.number("src.s9.l72.n2"),_y:_config.number("src.s9.l72.n3")});
   }
   else if(Key.getCode() == _config.number("src.s9.l74.n1") && _root.shui == _config.number("src.s9.l74.n2") && _root.dilei2 == _config.number("src.s9.l74.n3"))
   {
      if(_root.zhuyuan1 == _config.number("src.s9.l76.n1"))
      {
         _root.shui = _config.number("src.s9.l78.n1");
         _root.xingqi = _config.number("src.s9.l79.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l81.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s9.l85.n1");
         _root.xingqi = _config.number("src.s9.l86.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s9.l88.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s9.l90.n1"),{_x:_config.number("src.s9.l90.n2"),_y:_config.number("src.s9.l90.n3")});
   }
   else if(Key.getCode() == _config.number("src.s9.l92.n1") && _root.shui == _config.number("src.s9.l92.n2") && _root.dilei2 > _config.number("src.s9.l92.n3"))
   {
      _invoke(_root,"attachMovie","fanglei","fanglei",_config.number("src.s9.l94.n1"),{_x:_config.number("src.s9.l94.n2"),_y:_config.number("src.s9.l94.n3")});
   }

} },
// DefineSprite_140_P2/frame_5/DoAction.as
function(__scope) { with (__scope) {
if(_root.pp2 == _config.number("src.s10.l1.n1"))
{
   stop();
}

} },
// DefineSprite_143_P1/frame_9/DoAction.as
function(__scope) { with (__scope) {
if(_root.pp1 == _config.number("src.s11.l1.n1"))
{
   stop();
}

} },
// DefineSprite_15_fanglei/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "是否在此处放地雷";
ss = new Sound();
_invoke(ss,"attachSound","foushi");
_invoke(ss,"start",);

} },
// DefineSprite_15_fanglei/frame_1/PlaceObject2_7_shifou_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s13.l2.n1") && _root.shui == _config.number("src.s13.l2.n2"))
   {
      _root.wenben = _root.name1 + "要害人了";
      _root.dilei1--;
      _root.jibie[_root.weizhi] = _config.number("src.s13.l6.n1");
      x = int(_root.renwu1._x / _config.number("src.s13.l7.n1")) * _config.number("src.s13.l7.n2") + _config.number("src.s13.l7.n3");
      y = int(_root.renwu1._y / _config.number("src.s13.l8.n1")) * _config.number("src.s13.l8.n2") + _config.number("src.s13.l8.n3");
      _invoke(_root,"attachMovie","lei","lei",_config.number("src.s13.l9.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan2 == _config.number("src.s13.l10.n1"))
      {
         _root.shui = _config.number("src.s13.l12.n1");
         _root.xingqi = _config.number("src.s13.l13.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l15.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s13.l19.n1");
         _root.xingqi = _config.number("src.s13.l20.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l22.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s13.l24.n1"),{_x:_config.number("src.s13.l24.n2"),_y:_config.number("src.s13.l24.n3")});
   }
   else if(Key.getCode() == _config.number("src.s13.l26.n1") && _root.shui == _config.number("src.s13.l26.n2"))
   {
      _root.wenben = "先不害人";
      if(_root.zhuyuan2 == _config.number("src.s13.l29.n1"))
      {
         _root.shui = _config.number("src.s13.l31.n1");
         _root.xingqi = _config.number("src.s13.l32.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l34.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s13.l38.n1");
         _root.xingqi = _config.number("src.s13.l39.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l41.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s13.l43.n1"),{_x:_config.number("src.s13.l43.n2"),_y:_config.number("src.s13.l43.n3")});
   }
   else if(Key.getCode() == _config.number("src.s13.l45.n1") && _root.shui == _config.number("src.s13.l45.n2"))
   {
      _root.wenben = _root.name2 + "要害人了";
      _root.dilei2--;
      _root.jibie[_root.weizhi] = _config.number("src.s13.l49.n1");
      x = int(_root.renwu2._x / _config.number("src.s13.l50.n1")) * _config.number("src.s13.l50.n2") + _config.number("src.s13.l50.n3");
      y = int(_root.renwu2._y / _config.number("src.s13.l51.n1")) * _config.number("src.s13.l51.n2") + _config.number("src.s13.l51.n3");
      _invoke(_root,"attachMovie","lei","lei",_config.number("src.s13.l52.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan1 == _config.number("src.s13.l53.n1"))
      {
         _root.shui = _config.number("src.s13.l55.n1");
         _root.xingqi = _config.number("src.s13.l56.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l58.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s13.l62.n1");
         _root.xingqi = _config.number("src.s13.l63.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l65.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s13.l67.n1"),{_x:_config.number("src.s13.l67.n2"),_y:_config.number("src.s13.l67.n3")});
   }
   else if(Key.getCode() == _config.number("src.s13.l69.n1") && _root.shui == _config.number("src.s13.l69.n2"))
   {
      _root.wenben = "先不害人";
      if(_root.zhuyuan1 == _config.number("src.s13.l72.n1"))
      {
         _root.shui = _config.number("src.s13.l74.n1");
         _root.xingqi = _config.number("src.s13.l75.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l77.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s13.l81.n1");
         _root.xingqi = _config.number("src.s13.l82.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s13.l84.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s13.l86.n1"),{_x:_config.number("src.s13.l86.n2"),_y:_config.number("src.s13.l86.n3")});
   }

} },
// DefineSprite_16_bieshu/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "是否升级";
ss = new Sound();
_invoke(ss,"attachSound","foushi");
_invoke(ss,"start",);

} },
// DefineSprite_16_bieshu/frame_1/PlaceObject2_7_shifou_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s15.l2.n1") && _root.shui == _config.number("src.s15.l2.n2"))
   {
      _root.wenben = _root.name1 + "：我有豪宅了";
      _root.wuxing1--;
      _root.f12--;
      _root.f13++;
      _root.jibie[_root.weizhi] = _config.number("src.s15.l8.n1");
      x = int(_root.renwu1._x / _config.number("src.s15.l9.n1")) * _config.number("src.s15.l9.n2");
      y = int(_root.renwu1._y / _config.number("src.s15.l10.n1")) * _config.number("src.s15.l10.n2");
      _invoke(_root,"attachMovie","f3","f3",_config.number("src.s15.l11.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan2 == _config.number("src.s15.l12.n1"))
      {
         _root.shui = _config.number("src.s15.l14.n1");
         _root.xingqi = _config.number("src.s15.l15.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l17.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s15.l21.n1");
         _root.xingqi = _config.number("src.s15.l22.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l24.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s15.l26.n1"),{_x:_config.number("src.s15.l26.n2"),_y:_config.number("src.s15.l26.n3")});
   }
   else if(Key.getCode() == _config.number("src.s15.l28.n1") && _root.shui == _config.number("src.s15.l28.n2"))
   {
      if(_root.zhuyuan2 == _config.number("src.s15.l30.n1"))
      {
         _root.shui = _config.number("src.s15.l32.n1");
         _root.xingqi = _config.number("src.s15.l33.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l35.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s15.l39.n1");
         _root.xingqi = _config.number("src.s15.l40.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l42.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s15.l44.n1"),{_x:_config.number("src.s15.l44.n2"),_y:_config.number("src.s15.l44.n3")});
   }
   else if(Key.getCode() == _config.number("src.s15.l46.n1") && _root.shui == _config.number("src.s15.l46.n2"))
   {
      _root.wenben = _root.name2 + "：我有加油站了";
      _root.wuxing2--;
      _root.f22--;
      _root.f23++;
      _root.jibie[_root.weizhi] = _config.number("src.s15.l52.n1");
      x = int(_root.renwu2._x / _config.number("src.s15.l53.n1")) * _config.number("src.s15.l53.n2");
      y = int(_root.renwu2._y / _config.number("src.s15.l54.n1")) * _config.number("src.s15.l54.n2");
      _invoke(_root,"attachMovie","z3","z3",_config.number("src.s15.l55.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan1 == _config.number("src.s15.l56.n1"))
      {
         _root.shui = _config.number("src.s15.l58.n1");
         _root.xingqi = _config.number("src.s15.l59.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l61.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s15.l65.n1");
         _root.xingqi = _config.number("src.s15.l66.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l68.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s15.l70.n1"),{_x:_config.number("src.s15.l70.n2"),_y:_config.number("src.s15.l70.n3")});
   }
   else if(Key.getCode() == _config.number("src.s15.l72.n1") && _root.shui == _config.number("src.s15.l72.n2"))
   {
      if(_root.zhuyuan1 == _config.number("src.s15.l74.n1"))
      {
         _root.shui = _config.number("src.s15.l76.n1");
         _root.xingqi = _config.number("src.s15.l77.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l79.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s15.l83.n1");
         _root.xingqi = _config.number("src.s15.l84.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s15.l86.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s15.l88.n1"),{_x:_config.number("src.s15.l88.n2"),_y:_config.number("src.s15.l88.n3")});
   }

} },
// DefineSprite_19_baohulei/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "是否使用护身符";
ss = new Sound();
_invoke(ss,"attachSound","foushi");
_invoke(ss,"start",);

} },
// DefineSprite_19_baohulei/frame_1/PlaceObject2_7_shifou_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s17.l2.n1") && _root.shui == _config.number("src.s17.l2.n2"))
   {
      _root.yumao1--;
      _root.wenben = "别想害我";
      if(_root.zhuyuan2 == _config.number("src.s17.l6.n1"))
      {
         _root.shui = _config.number("src.s17.l8.n1");
         _root.xingqi = _config.number("src.s17.l9.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s17.l11.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s17.l15.n1");
         _root.xingqi = _config.number("src.s17.l16.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s17.l18.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s17.l20.n1"),{_x:_config.number("src.s17.l20.n2"),_y:_config.number("src.s17.l20.n3")});
   }
   else if(Key.getCode() == _config.number("src.s17.l22.n1") && _root.shui == _config.number("src.s17.l22.n2"))
   {
      _root.zhuyuan1 = _config.number("src.s17.l24.n1") + random(_config.number("src.s17.l24.n2"));
      if(_root.zhuyuan1 == _config.number("src.s17.l25.n1"))
      {
         _root.wenben = "小毛病，住院3天";
      }
      else if(_root.zhuyuan1 == _config.number("src.s17.l29.n1"))
      {
         _root.wenben = "摔了一交，住院4天";
      }
      else if(_root.zhuyuan1 == _config.number("src.s17.l33.n1"))
      {
         _root.wenben = "掉进下水道，住院5天";
      }
      else if(_root.zhuyuan1 == _config.number("src.s17.l37.n1"))
      {
         _root.wenben = "遭人殴打，住院6天";
      }
      else if(_root.zhuyuan1 == _config.number("src.s17.l41.n1"))
      {
         _root.wenben = "天外来砖，住院7天";
      }
      else if(_root.zhuyuan1 == _config.number("src.s17.l45.n1"))
      {
         _root.wenben = "出车祸，住院8天";
      }
      else if(_root.zhuyuan1 == _config.number("src.s17.l49.n1"))
      {
         _root.wenben = "炸成残废，住院9天";
      }
      ss = new Sound();
      _invoke(ss,"attachSound","zha");
      _invoke(ss,"start",);
      x = int(_root.renwu1._x / _config.number("src.s17.l56.n1")) * _config.number("src.s17.l56.n2") + _config.number("src.s17.l56.n3");
      y = int(_root.renwu1._y / _config.number("src.s17.l57.n1")) * _config.number("src.s17.l57.n2") + _config.number("src.s17.l57.n3");
      while(_root.renwu1._x > _config.number("src.s17.l58.n1"))
      {
         _root.renwu1._x -= _config.number("src.s17.l60.n1");
      }
      while(_root.renwu1._y < _config.number("src.s17.l62.n1"))
      {
         _root.renwu1._y += _config.number("src.s17.l64.n1");
      }
      _root.renwu1._x += _config.number("src.s17.l66.n1");
      _root.jibie[_root.weizhi] = _config.number("src.s17.l67.n1");
      _invoke(_root,"attachMovie","baozha","baozha",_config.number("src.s17.l68.n1") + _root.weizhi,{_x:x,_y:y});
      _root.shui = _config.number("src.s17.l69.n1");
      _root.xingqi = _config.number("src.s17.l70.n1");
      _root.pp = "2P";
      _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s17.l72.n1"));
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s17.l73.n1"),{_x:_config.number("src.s17.l73.n2"),_y:_config.number("src.s17.l73.n3")});
   }
   else if(Key.getCode() == _config.number("src.s17.l75.n1") && _root.shui == _config.number("src.s17.l75.n2"))
   {
      _root.yumao2--;
      _root.wenben = "别想害我";
      if(_root.zhuyuan1 == _config.number("src.s17.l79.n1"))
      {
         _root.shui = _config.number("src.s17.l81.n1");
         _root.xingqi = _config.number("src.s17.l82.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s17.l84.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s17.l88.n1");
         _root.xingqi = _config.number("src.s17.l89.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s17.l91.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s17.l93.n1"),{_x:_config.number("src.s17.l93.n2"),_y:_config.number("src.s17.l93.n3")});
   }
   else if(Key.getCode() == _config.number("src.s17.l95.n1") && _root.shui == _config.number("src.s17.l95.n2"))
   {
      _root.zhuyuan2 = _config.number("src.s17.l97.n1") + random(_config.number("src.s17.l97.n2"));
      if(_root.zhuyuan2 == _config.number("src.s17.l98.n1"))
      {
         _root.wenben = "小毛病，住院3天";
      }
      else if(_root.zhuyuan2 == _config.number("src.s17.l102.n1"))
      {
         _root.wenben = "摔了一交，住院4天";
      }
      else if(_root.zhuyuan2 == _config.number("src.s17.l106.n1"))
      {
         _root.wenben = "掉进下水道，住院5天";
      }
      else if(_root.zhuyuan2 == _config.number("src.s17.l110.n1"))
      {
         _root.wenben = "遭人殴打，住院6天";
      }
      else if(_root.zhuyuan2 == _config.number("src.s17.l114.n1"))
      {
         _root.wenben = "天外来砖，住院7天";
      }
      else if(_root.zhuyuan2 == _config.number("src.s17.l118.n1"))
      {
         _root.wenben = "出车祸，住院8天";
      }
      else if(_root.zhuyuan2 == _config.number("src.s17.l122.n1"))
      {
         _root.wenben = "炸成残废，住院9天";
      }
      ss = new Sound();
      _invoke(ss,"attachSound","zha");
      _invoke(ss,"start",);
      x = int(_root.renwu2._x / _config.number("src.s17.l129.n1")) * _config.number("src.s17.l129.n2") + _config.number("src.s17.l129.n3");
      y = int(_root.renwu2._y / _config.number("src.s17.l130.n1")) * _config.number("src.s17.l130.n2") + _config.number("src.s17.l130.n3");
      while(_root.renwu2._x > _config.number("src.s17.l131.n1"))
      {
         _root.renwu2._x -= _config.number("src.s17.l133.n1");
      }
      while(_root.renwu2._y < _config.number("src.s17.l135.n1"))
      {
         _root.renwu2._y += _config.number("src.s17.l137.n1");
      }
      _root.renwu2._x += _config.number("src.s17.l139.n1");
      _root.jibie[_root.weizhi] = _config.number("src.s17.l140.n1");
      _invoke(_root,"attachMovie","baozha","baozha",_config.number("src.s17.l141.n1") + _root.weizhi,{_x:x,_y:y});
      _root.shui = _config.number("src.s17.l142.n1");
      _root.xingqi = _config.number("src.s17.l143.n1");
      _root.pp = "1P";
      _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s17.l145.n1"));
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s17.l146.n1"),{_x:_config.number("src.s17.l146.n2"),_y:_config.number("src.s17.l146.n3")});
   }

} },
// DefineSprite_20_baohu/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "是否用护身符";
ss = new Sound();
_invoke(ss,"attachSound","foushi");
_invoke(ss,"start",);

} },
// DefineSprite_20_baohu/frame_1/PlaceObject2_7_shifou_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s19.l2.n1") && _root.shui == _config.number("src.s19.l2.n2"))
   {
      _root.yumao1--;
      _root.wenben = "别想赚我的钱";
      if(_root.zhuyuan2 == _config.number("src.s19.l6.n1"))
      {
         _root.shui = _config.number("src.s19.l8.n1");
         _root.xingqi = _config.number("src.s19.l9.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l11.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s19.l15.n1");
         _root.xingqi = _config.number("src.s19.l16.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l18.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s19.l20.n1"),{_x:_config.number("src.s19.l20.n2"),_y:_config.number("src.s19.l20.n3")});
   }
   else if(Key.getCode() == _config.number("src.s19.l22.n1") && _root.shui == _config.number("src.s19.l22.n2"))
   {
      _root.wenben = "不在乎这点钱";
      if(_root.shuyu[_root.weizhi] == _config.number("src.s19.l25.n1") && _root.jibie[_root.weizhi] == _config.number("src.s19.l25.n2"))
      {
         _root.xianjin1 -= _config.number("rules.rentHouse");
         _root.xianjin2 += _config.number("rules.rentHouse") * (_config.number("src.s19.l28.n2") - _root.shuilv2 / _config.number("src.s19.l28.n3"));
         if(_root.xianjin1 + _root.touzhi1 < _config.number("src.s19.l29.n1"))
         {
            _invoke(_root,"gotoAndPlay",_config.number("src.s19.l31.n1"));
         }
      }
      else if(_root.shuyu[_root.weizhi] == _config.number("src.s19.l34.n1") && _root.jibie[_root.weizhi] == _config.number("src.s19.l34.n2"))
      {
         _root.xianjin1 -= _config.number("rules.rentTower");
         _root.xianjin2 += _config.number("rules.rentTower") * (_config.number("src.s19.l37.n2") - _root.shuilv2 / _config.number("src.s19.l37.n3"));
         if(_root.xianjin1 + _root.touzhi1 < _config.number("src.s19.l38.n1"))
         {
            _invoke(_root,"gotoAndPlay",_config.number("src.s19.l40.n1"));
         }
      }
      else if(_root.shuyu[_root.weizhi] == _config.number("src.s19.l43.n1") && _root.jibie[_root.weizhi] == _config.number("src.s19.l43.n2"))
      {
         _root.xianjin1 -= _root.bushu;
         _root.xianjin2 += _root.bushu * (_config.number("src.s19.l46.n1") - _root.shuilv2 / _config.number("src.s19.l46.n2"));
         if(_root.xianjin1 + _root.touzhi1 < _config.number("src.s19.l47.n1"))
         {
            _invoke(_root,"gotoAndPlay",_config.number("src.s19.l49.n1"));
         }
      }
      if(_root.zhuyuan2 == _config.number("src.s19.l52.n1"))
      {
         _root.shui = _config.number("src.s19.l54.n1");
         _root.xingqi = _config.number("src.s19.l55.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l57.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s19.l61.n1");
         _root.xingqi = _config.number("src.s19.l62.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l64.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s19.l66.n1"),{_x:_config.number("src.s19.l66.n2"),_y:_config.number("src.s19.l66.n3")});
   }
   else if(Key.getCode() == _config.number("src.s19.l68.n1") && _root.shui == _config.number("src.s19.l68.n2"))
   {
      _root.yumao2--;
      _root.wenben = "别想赚我的钱";
      if(_root.zhuyuan1 == _config.number("src.s19.l72.n1"))
      {
         _root.shui = _config.number("src.s19.l74.n1");
         _root.xingqi = _config.number("src.s19.l75.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l77.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s19.l81.n1");
         _root.xingqi = _config.number("src.s19.l82.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l84.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s19.l86.n1"),{_x:_config.number("src.s19.l86.n2"),_y:_config.number("src.s19.l86.n3")});
   }
   else if(Key.getCode() == _config.number("src.s19.l88.n1") && _root.shui == _config.number("src.s19.l88.n2"))
   {
      _root.wenben = "不在乎这点钱";
      if(_root.shuyu[_root.weizhi] == _config.number("src.s19.l91.n1") && _root.jibie[_root.weizhi] == _config.number("src.s19.l91.n2"))
      {
         _root.xianjin2 -= _config.number("rules.rentHouse");
         _root.xianjin1 += _config.number("rules.rentHouse") * (_config.number("src.s19.l94.n2") - _root.shuilv1 / _config.number("src.s19.l94.n3"));
         if(_root.xianjin2 + _root.touzhi2 < _config.number("src.s19.l95.n1"))
         {
            _invoke(_root,"gotoAndPlay",_config.number("src.s19.l97.n1"));
         }
      }
      else if(_root.shuyu[_root.weizhi] == _config.number("src.s19.l100.n1") && _root.jibie[_root.weizhi] == _config.number("src.s19.l100.n2"))
      {
         _root.xianjin2 -= _config.number("rules.rentTower");
         _root.xianjin1 += _config.number("rules.rentTower") * (_config.number("src.s19.l103.n2") - _root.shuilv1 / _config.number("src.s19.l103.n3"));
         if(_root.xianjin2 + _root.touzhi2 < _config.number("src.s19.l104.n1"))
         {
            _invoke(_root,"gotoAndPlay",_config.number("src.s19.l106.n1"));
         }
      }
      else if(_root.shuyu[_root.weizhi] == _config.number("src.s19.l109.n1") && _root.jibie[_root.weizhi] == _config.number("src.s19.l109.n2"))
      {
         _root.xianjin2 -= _root.bushu;
         _root.xianjin1 += _root.bushu * (_config.number("src.s19.l112.n1") - _root.shuilv1 / _config.number("src.s19.l112.n2"));
         if(_root.xianjin2 + _root.touzhi2 < _config.number("src.s19.l113.n1"))
         {
            _invoke(_root,"gotoAndPlay",_config.number("src.s19.l115.n1"));
         }
      }
      if(_root.zhuyuan1 == _config.number("src.s19.l118.n1"))
      {
         _root.shui = _config.number("src.s19.l120.n1");
         _root.xingqi = _config.number("src.s19.l121.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l123.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s19.l127.n1");
         _root.xingqi = _config.number("src.s19.l128.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s19.l130.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s19.l132.n1"),{_x:_config.number("src.s19.l132.n2"),_y:_config.number("src.s19.l132.n3")});
   }

} },
// DefineSprite_25_mingyun/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "乾坤大挪移";

} },
// DefineSprite_25_mingyun/frame_300/DoAction.as
function(__scope) { with (__scope) {
stop();
aa = random(_config.number("src.s21.l2.n1"));
if(_root.shui == _config.number("src.s21.l3.n1"))
{
   if(aa == _config.number("src.s21.l5.n1") && _root.zuanshi1 < _config.number("src.s21.l5.n2"))
   {
      _root.zuanshi1++;
      _root.wenben = "获得一颗钻石";
   }
   else if(aa == _config.number("src.s21.l10.n1") && _root.wuxing1 < _config.number("src.s21.l10.n2"))
   {
      _root.wuxing1++;
      _root.wenben = "获得一颗五星";
   }
   else if(aa == _config.number("src.s21.l15.n1") && _root.yumao1 < _config.number("src.s21.l15.n2"))
   {
      _root.yumao1++;
      _root.wenben = "获得一张护身符";
   }
   else if(aa == _config.number("src.s21.l20.n1") && _root.dilei1 < _config.number("src.s21.l20.n2"))
   {
      _root.dilei1++;
      _root.wenben = "获得一个地雷";
   }
   else if(aa == _config.number("src.s21.l25.n1"))
   {
      _root.xianjin1 += _config.number("src.s21.l27.n1");
      _root.wenben = "捡到300元钱";
   }
   else if(aa == _config.number("src.s21.l30.n1"))
   {
      if(_root.xianjin1 >= _config.number("src.s21.l32.n1"))
      {
         _root.xianjin1 -= _config.number("src.s21.l34.n1");
         _root.wenben = "丢失300元钱";
      }
      else if(_root.xianjin1 > _config.number("src.s21.l37.n1"))
      {
         _root.xianjin1 = _config.number("src.s21.l39.n1");
         _root.wenben = "丢失" + _root.xianjin1 + "元钱";
      }
      else if(_root.xianjin1 <= _config.number("src.s21.l42.n1"))
      {
         _root.xianjin1 = _config.number("src.s21.l44.n1");
         _root.wenben = "欠款清零";
      }
   }
   else if(aa == _config.number("src.s21.l48.n1"))
   {
      _root.touzhi1 += _config.number("src.s21.l50.n1");
      _root.wenben = "增加200元透支额";
   }
   else if(aa == _config.number("src.s21.l53.n1") && _root.touzhi1 > _config.number("src.s21.l53.n2"))
   {
      _root.touzhi1 -= _config.number("src.s21.l55.n1");
      _root.wenben = "减少200元透支额";
   }
   else if(aa == _config.number("src.s21.l58.n1") && _root.shuilv1 < _config.number("src.s21.l58.n2"))
   {
      _root.shuilv1 += _config.number("src.s21.l60.n1");
      _root.wenben = "税率增加10%";
   }
   else if(aa == _config.number("src.s21.l63.n1") && _root.shuilv1 > _config.number("src.s21.l63.n2"))
   {
      _root.shuilv1 -= _config.number("src.s21.l65.n1");
      _root.wenben = "税率减少10%";
   }
   else if(aa == _config.number("src.s21.l68.n1"))
   {
      _root.wuxing1 = _config.number("src.s21.l70.n1");
      _root.zuanshi1 = _config.number("src.s21.l71.n1");
      _root.yumao1 = _config.number("src.s21.l72.n1");
      _root.dilei1 = _config.number("src.s21.l73.n1");
      _root.wenben = "抢劫！留下所有卡片";
   }
   else if(aa == _config.number("src.s21.l76.n1"))
   {
      _root.jiangjin1 += _config.number("src.s21.l78.n1");
      _root.wenben = "奖金增加50元";
   }
   else if(aa == _config.number("src.s21.l81.n1") && _root.jiangjin1 > _config.number("src.s21.l81.n2"))
   {
      _root.jiangjin1 -= _config.number("src.s21.l83.n1");
      _root.wenben = "奖金减少50元";
   }
   else if(aa == _config.number("src.s21.l86.n1") && _root.zhuyuan2 == _config.number("src.s21.l86.n2"))
   {
      _root.zhuyuan1 = _config.number("src.s21.l88.n1");
      _root.renwu1._x += _config.number("src.s21.l89.n1");
      _root.renwu1._y += _config.number("src.s21.l90.n1");
      _root.wenben = "住院2天";
   }
   else
   {
      _root.wenben = "什么情况都没发生";
   }
   if(_root.zhuyuan2 == _config.number("src.s21.l97.n1"))
   {
      _root.shui = _config.number("src.s21.l99.n1");
      _root.xingqi = _config.number("src.s21.l100.n1");
      _root.pp = "2P";
      _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s21.l102.n1"));
   }
   else
   {
      _root.shui = _config.number("src.s21.l106.n1");
      _root.xingqi = _config.number("src.s21.l107.n1");
      _root.pp = "1P";
      _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s21.l109.n1"));
   }
}
else if(_root.shui == _config.number("src.s21.l112.n1"))
{
   if(aa == _config.number("src.s21.l114.n1") && _root.zuanshi2 < _config.number("src.s21.l114.n2"))
   {
      _root.zuanshi2++;
      _root.wenben = "获得一颗钻石";
   }
   else if(aa == _config.number("src.s21.l119.n1") && _root.wuxing2 < _config.number("src.s21.l119.n2"))
   {
      _root.wuxing2++;
      _root.wenben = "获得一颗五星";
   }
   else if(aa == _config.number("src.s21.l124.n1") && _root.yumao2 < _config.number("src.s21.l124.n2"))
   {
      _root.yumao2++;
      _root.wenben = "获得一张护身符";
   }
   else if(aa == _config.number("src.s21.l129.n1") && _root.dilei2 < _config.number("src.s21.l129.n2"))
   {
      _root.dilei2++;
      _root.wenben = "获得一个地雷";
   }
   else if(aa == _config.number("src.s21.l134.n1"))
   {
      _root.xianjin2 += _config.number("src.s21.l136.n1");
      _root.wenben = "捡到300元钱";
   }
   else if(aa == _config.number("src.s21.l139.n1"))
   {
      if(_root.xianjin2 >= _config.number("src.s21.l141.n1"))
      {
         _root.xianjin2 -= _config.number("src.s21.l143.n1");
         _root.wenben = "丢失300元钱";
      }
      else if(_root.xianjin2 > _config.number("src.s21.l146.n1"))
      {
         _root.xianjin2 = _config.number("src.s21.l148.n1");
         _root.wenben = "丢失" + _root.xianjin2 + "元钱";
      }
      else if(_root.xianjin2 <= _config.number("src.s21.l151.n1"))
      {
         _root.xianjin2 = _config.number("src.s21.l153.n1");
         _root.wenben = "欠款清零";
      }
   }
   else if(aa == _config.number("src.s21.l157.n1"))
   {
      _root.touzhi2 += _config.number("src.s21.l159.n1");
      _root.wenben = "增加200元透支额";
   }
   else if(aa == _config.number("src.s21.l162.n1") && _root.touzhi2 > _config.number("src.s21.l162.n2"))
   {
      _root.touzhi2 -= _config.number("src.s21.l164.n1");
      _root.wenben = "减少200元透支额";
   }
   else if(aa == _config.number("src.s21.l167.n1") && _root.shuilv2 < _config.number("src.s21.l167.n2"))
   {
      _root.shuilv2 += _config.number("src.s21.l169.n1");
      _root.wenben = "税率增加10%";
   }
   else if(aa == _config.number("src.s21.l172.n1") && _root.shuilv2 > _config.number("src.s21.l172.n2"))
   {
      _root.shuilv2 -= _config.number("src.s21.l174.n1");
      _root.wenben = "税率减少10%";
   }
   else if(aa == _config.number("src.s21.l177.n1"))
   {
      _root.wuxing2 = _config.number("src.s21.l179.n1");
      _root.zuanshi2 = _config.number("src.s21.l180.n1");
      _root.yumao2 = _config.number("src.s21.l181.n1");
      _root.dilei2 = _config.number("src.s21.l182.n1");
      _root.wenben = "抢劫！留下所有卡片";
   }
   else if(aa == _config.number("src.s21.l185.n1"))
   {
      _root.jiangjin2 += _config.number("src.s21.l187.n1");
      _root.wenben = "奖金增加50元";
   }
   else if(aa == _config.number("src.s21.l190.n1") && _root.jiangjin2 > _config.number("src.s21.l190.n2"))
   {
      _root.jiangjin2 -= _config.number("src.s21.l192.n1");
      _root.wenben = "奖金减少50元";
   }
   else if(aa == _config.number("src.s21.l195.n1") && _root.zhuyuan1 == _config.number("src.s21.l195.n2"))
   {
      _root.zhuyuan2 = _config.number("src.s21.l197.n1");
      _root.renwu2._x += _config.number("src.s21.l198.n1");
      _root.renwu2._y += _config.number("src.s21.l199.n1");
      _root.wenben = "住院2天";
   }
   else
   {
      _root.wenben = "什么情况都没发生";
   }
   if(_root.zhuyuan1 == _config.number("src.s21.l206.n1"))
   {
      _root.shui = _config.number("src.s21.l208.n1");
      _root.xingqi = _config.number("src.s21.l209.n1");
      _root.pp = "1P";
      _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s21.l211.n1"));
   }
   else
   {
      _root.shui = _config.number("src.s21.l215.n1");
      _root.xingqi = _config.number("src.s21.l216.n1");
      _root.pp = "2P";
      _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s21.l218.n1"));
   }
}

} },
// DefineSprite_266/frame_1/PlaceObject2_109_duiwu_2/CLIPACTIONRECORD onClipEvent(enterFrame).as
function(__scope) { with (__scope) {

   if(this._x < _config.number("src.s22.l2.n1"))
   {
      this._x += _config.number("src.s22.l4.n1");
   }
   else
   {
      this._x = -_config.number("src.s22.l8.n1");
   }

} },
// DefineSprite_35_lunzi/frame_1/DoAction.as
function(__scope) { with (__scope) {
h = _config.number("src.s23.l1.n1");
bu = _config.number("src.s23.l2.n1");
_root.bushu = _config.number("src.s23.l3.n1");
keyizhuan = _config.number("src.s23.l4.n1");

} },
// DefineSprite_35_lunzi/frame_1/PlaceObject2_33_quan_1/CLIPACTIONRECORD onClipEvent(enterFrame).as
function(__scope) { with (__scope) {

   if(_parent.keyizhuan == _config.number("src.s24.l2.n1"))
   {
      ss = new Sound();
      _invoke(ss,"attachSound","zhuan.wav");
      _invoke(ss,"start",);
      if(random(_config.number("src.s24.l7.n1")) == _config.number("src.s24.l7.n2") && _parent.bu > _config.number("src.s24.l7.n3"))
      {
         _parent.bu--;
      }
      _parent.h = (_parent.h + _parent.bu) % _config.number("src.s24.l11.n1");
      this._rotation = _parent.h;
      if(_parent.bu == _config.number("src.s24.l13.n1"))
      {
         _parent.keyizhuan = _config.number("src.s24.l15.n1");
         if(_parent.h < _config.number("src.s24.l16.n1"))
         {
            _root.bushu = _config.number("src.s24.l18.n1");
         }
         else if(_parent.h < _config.number("src.s24.l20.n1"))
         {
            _root.bushu = _config.number("src.s24.l22.n1");
         }
         else if(_parent.h < _config.number("src.s24.l24.n1"))
         {
            _root.bushu = _config.number("src.s24.l26.n1");
         }
         else if(_parent.h < _config.number("src.s24.l28.n1"))
         {
            _root.bushu = _config.number("src.s24.l30.n1");
         }
         else if(_parent.h < _config.number("src.s24.l32.n1"))
         {
            _root.bushu = _config.number("src.s24.l34.n1");
         }
         else if(_parent.h < _config.number("src.s24.l36.n1"))
         {
            _root.bushu = _config.number("src.s24.l38.n1");
         }
         else
         {
            _root.bushu = _config.number("src.s24.l42.n1");
         }
         if(_root.shui == _config.number("src.s24.l44.n1") && _root.yumao1 == _config.number("src.s24.l44.n2"))
         {
            if(_root.bushu < _config.number("src.s24.l46.n1"))
            {
               _root.wenben = "还算幸运";
            }
            else if(_root.bushu < _config.number("src.s24.l50.n1"))
            {
               _root.wenben = "下次不来这地方了";
            }
            else
            {
               _root.wenben = "这下亏大了";
            }
            _root.xianjin1 -= _root.bushu;
            _root.xianjin2 += _root.bushu * (_config.number("src.s24.l59.n1") - _root.shuilv2 / _config.number("src.s24.l59.n2"));
            if(_root.xianjin1 + _root.touzhi1 < _config.number("src.s24.l60.n1"))
            {
               _invoke(_root,"gotoAndPlay",_config.number("src.s24.l62.n1"));
            }
            if(_root.zhuyuan2 == _config.number("src.s24.l64.n1"))
            {
               _root.shui = _config.number("src.s24.l66.n1");
               _root.xingqi = _config.number("src.s24.l67.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s24.l69.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s24.l73.n1");
               _root.xingqi = _config.number("src.s24.l74.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s24.l76.n1"));
            }
         }
         else if(_root.shui == _config.number("src.s24.l79.n1") && _root.yumao2 == _config.number("src.s24.l79.n2"))
         {
            if(_root.bushu < _config.number("src.s24.l81.n1"))
            {
               _root.wenben = "还算幸运";
            }
            else if(_root.bushu < _config.number("src.s24.l85.n1"))
            {
               _root.wenben = "下次不来这地方了";
            }
            else
            {
               _root.wenben = "这下亏大了";
            }
            _root.xianjin2 -= _root.bushu;
            _root.xianjin1 += _root.bushu * (_config.number("src.s24.l94.n1") - _root.shuilv1 / _config.number("src.s24.l94.n2"));
            if(_root.xianjin2 + _root.touzhi2 < _config.number("src.s24.l95.n1"))
            {
               _invoke(_root,"gotoAndPlay",_config.number("src.s24.l97.n1"));
            }
            if(_root.zhuyuan1 == _config.number("src.s24.l99.n1"))
            {
               _root.shui = _config.number("src.s24.l101.n1");
               _root.xingqi = _config.number("src.s24.l102.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s24.l104.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s24.l108.n1");
               _root.xingqi = _config.number("src.s24.l109.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s24.l111.n1"));
            }
         }
         else if(_root.shui == _config.number("src.s24.l114.n1") && _root.yumao1 > _config.number("src.s24.l114.n2"))
         {
            _invoke(_root,"attachMovie","baohu","baohu",_config.number("src.s24.l116.n1"),{_x:_config.number("src.s24.l116.n2"),_y:_config.number("src.s24.l116.n3")});
         }
         else if(_root.shui == _config.number("src.s24.l118.n1") && _root.yumao2 > _config.number("src.s24.l118.n2"))
         {
            _invoke(_root,"attachMovie","baohu","baohu",_config.number("src.s24.l120.n1"),{_x:_config.number("src.s24.l120.n2"),_y:_config.number("src.s24.l120.n3")});
         }
      }
   }

} },
// DefineSprite_38_baozha/frame_21/DoAction.as
function(__scope) { with (__scope) {
stop();

} },
// DefineSprite_51_ducheng2/frame_1/DoAction.as
function(__scope) { with (__scope) {
dukuang.dong = _config.number("src.s26.l1.n1");
keyizhuan = _config.number("src.s26.l2.n1");
h = _config.number("src.s26.l3.n1");
bu = _config.number("src.s26.l4.n1");
_root.wenben = "请您押注";

} },
// DefineSprite_51_ducheng2/frame_1/PlaceObject2_33_quan_38/CLIPACTIONRECORD onClipEvent(enterFrame).as
function(__scope) { with (__scope) {

   if(_root.shui == _config.number("src.s27.l2.n1"))
   {
      if(_parent.keyizhuan == _config.number("src.s27.l4.n1"))
      {
         if(random(_config.number("src.s27.l6.n1")) == _config.number("src.s27.l6.n2") && _parent.bu > _config.number("src.s27.l6.n3"))
         {
            _parent.bu--;
         }
         _parent.h = (_parent.h + _parent.bu * _config.number("src.s27.l10.n1")) % _config.number("src.s27.l10.n2");
         this._rotation = _parent.h;
         if(_parent.bu == _config.number("src.s27.l12.n1"))
         {
            _parent.keyizhuan = _config.number("src.s27.l14.n1");
            if(_parent.h < _config.number("src.s27.l15.n1"))
            {
               shu = _config.number("src.s27.l17.n1");
            }
            else if(_parent.h < _config.number("src.s27.l19.n1"))
            {
               shu = _config.number("src.s27.l21.n1");
            }
            else if(_parent.h < _config.number("src.s27.l23.n1"))
            {
               shu = _config.number("src.s27.l25.n1");
            }
            else if(_parent.h < _config.number("src.s27.l27.n1"))
            {
               shu = _config.number("src.s27.l29.n1");
            }
            else if(_parent.h < _config.number("src.s27.l31.n1"))
            {
               shu = _config.number("src.s27.l33.n1");
            }
            else if(_parent.h < _config.number("src.s27.l35.n1"))
            {
               shu = _config.number("src.s27.l37.n1");
            }
            else
            {
               shu = _config.number("src.s27.l41.n1");
            }
            ying = int(_parent.dukuang._x / _config.number("src.s27.l43.n1") + _config.number("src.s27.l43.n2")) * _config.number("src.s27.l43.n3");
            jieguo = _parent.dukuang._x / _config.number("src.s27.l44.n1") % _config.number("src.s27.l44.n2") + _config.number("src.s27.l44.n3");
            if(shu == jieguo)
            {
               _root.wenben = "恭喜您赢了" + ying + "元";
               _root.xianjin1 += ying;
               ss = new Sound();
               _invoke(ss,"attachSound","shengli");
               _invoke(ss,"start",);
            }
            else
            {
               _root.wenben = "猜不中很正常";
            }
            if(_root.zhuyuan2 == _config.number("src.s27.l57.n1"))
            {
               _root.shui = _config.number("src.s27.l59.n1");
               _root.xingqi = _config.number("src.s27.l60.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s27.l62.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s27.l66.n1");
               _root.xingqi = _config.number("src.s27.l67.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s27.l69.n1"));
            }
         }
      }
   }
   else if(_root.shui == _config.number("src.s27.l74.n1"))
   {
      if(_parent.keyizhuan == _config.number("src.s27.l76.n1"))
      {
         if(random(_config.number("src.s27.l78.n1")) == _config.number("src.s27.l78.n2") && _parent.bu > _config.number("src.s27.l78.n3"))
         {
            _parent.bu--;
         }
         _parent.h = (_parent.h + _parent.bu * _config.number("src.s27.l82.n1")) % _config.number("src.s27.l82.n2");
         this._rotation = _parent.h;
         if(_parent.bu == _config.number("src.s27.l84.n1"))
         {
            _parent.keyizhuan = _config.number("src.s27.l86.n1");
            if(_parent.h < _config.number("src.s27.l87.n1"))
            {
               shu = _config.number("src.s27.l89.n1");
            }
            else if(_parent.h < _config.number("src.s27.l91.n1"))
            {
               shu = _config.number("src.s27.l93.n1");
            }
            else if(_parent.h < _config.number("src.s27.l95.n1"))
            {
               shu = _config.number("src.s27.l97.n1");
            }
            else if(_parent.h < _config.number("src.s27.l99.n1"))
            {
               shu = _config.number("src.s27.l101.n1");
            }
            else if(_parent.h < _config.number("src.s27.l103.n1"))
            {
               shu = _config.number("src.s27.l105.n1");
            }
            else if(_parent.h < _config.number("src.s27.l107.n1"))
            {
               shu = _config.number("src.s27.l109.n1");
            }
            else
            {
               shu = _config.number("src.s27.l113.n1");
            }
            ying = int(_parent.dukuang._x / _config.number("src.s27.l115.n1") + _config.number("src.s27.l115.n2")) * _config.number("src.s27.l115.n3");
            jieguo = _parent.dukuang._x / _config.number("src.s27.l116.n1") % _config.number("src.s27.l116.n2") + _config.number("src.s27.l116.n3");
            if(shu == jieguo)
            {
               _root.wenben = "恭喜您赢了" + ying + "元";
               _root.xianjin2 += ying;
               ss = new Sound();
               _invoke(ss,"attachSound","shengli");
               _invoke(ss,"start",);
            }
            else
            {
               _root.wenben = "猜不中很正常";
            }
            if(_root.zhuyuan1 == _config.number("src.s27.l129.n1"))
            {
               _root.shui = _config.number("src.s27.l131.n1");
               _root.xingqi = _config.number("src.s27.l132.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s27.l134.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s27.l138.n1");
               _root.xingqi = _config.number("src.s27.l139.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s27.l141.n1"));
            }
         }
      }
   }

} },
// DefineSprite_51_ducheng2/frame_1/PlaceObject2_50_dukuang2_46/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(_root.shui == _config.number("src.s28.l2.n1"))
   {
      duzi = int(_parent.dukuang._x / _config.number("src.s28.l4.n1") + _config.number("src.s28.l4.n2")) * _config.number("src.s28.l4.n3");
      if(dong == _config.number("src.s28.l5.n1"))
      {
         temp = Key.getCode();
         if(temp == _config.number("src.s28.l8.n1") && this._x < _config.number("src.s28.l8.n2"))
         {
            this._x += _config.number("src.s28.l10.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s28.l15.n1") && this._x > _config.number("src.s28.l15.n2"))
         {
            this._x -= _config.number("src.s28.l17.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s28.l22.n1"))
         {
            if(_root.xianjin1 < duzi)
            {
               _root.wenben = "您的现金不够";
            }
            else
            {
               _root.wenben = "祝您好运";
               _root.xianjin1 -= duzi;
               _parent.keyizhuan = _config.number("src.s28.l32.n1");
               dong = _config.number("src.s28.l33.n1");
            }
         }
         else if(temp == _config.number("src.s28.l36.n1"))
         {
            _root.wenben = "不赌一把别想走";
         }
      }
   }
   else if(_root.shui == _config.number("src.s28.l42.n1"))
   {
      duzi = int(_parent.dukuang._x / _config.number("src.s28.l44.n1") + _config.number("src.s28.l44.n2")) * _config.number("src.s28.l44.n3");
      if(dong == _config.number("src.s28.l45.n1"))
      {
         temp = Key.getCode();
         if(temp == _config.number("src.s28.l48.n1") && this._x < _config.number("src.s28.l48.n2"))
         {
            this._x += _config.number("src.s28.l50.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s28.l55.n1") && this._x > _config.number("src.s28.l55.n2"))
         {
            this._x -= _config.number("src.s28.l57.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s28.l62.n1"))
         {
            if(_root.xianjin2 < duzi)
            {
               _root.wenben = "您的现金不够";
            }
            else
            {
               _root.wenben = "祝您好运";
               _root.xianjin2 -= duzi;
               _parent.keyizhuan = _config.number("src.s28.l72.n1");
               dong = _config.number("src.s28.l73.n1");
            }
         }
         else if(temp == _config.number("src.s28.l76.n1"))
         {
            _root.wenben = "不赌一把别想走";
         }
      }
   }

} },
// DefineSprite_62_ducheng1/frame_1/DoAction.as
function(__scope) { with (__scope) {
dukuang.dong = _config.number("src.s29.l1.n1");
keyizhuan = _config.number("src.s29.l2.n1");
h = _config.number("src.s29.l3.n1");
bu = _config.number("src.s29.l4.n1");
_root.wenben = "请您押注";

} },
// DefineSprite_62_ducheng1/frame_1/PlaceObject2_33_quan_24/CLIPACTIONRECORD onClipEvent(enterFrame).as
function(__scope) { with (__scope) {

   if(_root.shui == _config.number("src.s30.l2.n1"))
   {
      if(_parent.keyizhuan == _config.number("src.s30.l4.n1"))
      {
         if(random(_config.number("src.s30.l6.n1")) == _config.number("src.s30.l6.n2") && _parent.bu > _config.number("src.s30.l6.n3"))
         {
            _parent.bu--;
         }
         _parent.h = (_parent.h + _parent.bu) % _config.number("src.s30.l10.n1");
         this._rotation = _parent.h;
         if(_parent.bu == _config.number("src.s30.l12.n1"))
         {
            _parent.keyizhuan = _config.number("src.s30.l14.n1");
            if(_parent.h < _config.number("src.s30.l15.n1"))
            {
               shu = _config.number("src.s30.l17.n1");
            }
            else if(_parent.h < _config.number("src.s30.l19.n1"))
            {
               shu = _config.number("src.s30.l21.n1");
            }
            else if(_parent.h < _config.number("src.s30.l23.n1"))
            {
               shu = _config.number("src.s30.l25.n1");
            }
            else if(_parent.h < _config.number("src.s30.l27.n1"))
            {
               shu = _config.number("src.s30.l29.n1");
            }
            else if(_parent.h < _config.number("src.s30.l31.n1"))
            {
               shu = _config.number("src.s30.l33.n1");
            }
            else if(_parent.h < _config.number("src.s30.l35.n1"))
            {
               shu = _config.number("src.s30.l37.n1");
            }
            else
            {
               shu = _config.number("src.s30.l41.n1");
            }
            ying = int(_parent.dukuang._x / _config.number("src.s30.l43.n1") + _config.number("src.s30.l43.n2")) * _config.number("src.s30.l43.n3");
            jieguo = _parent.dukuang._x / _config.number("src.s30.l44.n1") % _config.number("src.s30.l44.n2");
            if(shu % _config.number("src.s30.l45.n1") + jieguo == _config.number("src.s30.l45.n2"))
            {
               _root.wenben = "恭喜您赢了" + ying + "元";
               _root.xianjin1 += ying;
               ss = new Sound();
               _invoke(ss,"attachSound","shengli");
               _invoke(ss,"start",);
            }
            else
            {
               _root.wenben = "命该如此";
            }
            if(_root.zhuyuan2 == _config.number("src.s30.l57.n1"))
            {
               _root.shui = _config.number("src.s30.l59.n1");
               _root.xingqi = _config.number("src.s30.l60.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s30.l62.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s30.l66.n1");
               _root.xingqi = _config.number("src.s30.l67.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s30.l69.n1"));
            }
         }
      }
   }
   else if(_root.shui == _config.number("src.s30.l74.n1"))
   {
      if(_parent.keyizhuan == _config.number("src.s30.l76.n1"))
      {
         if(random(_config.number("src.s30.l78.n1")) == _config.number("src.s30.l78.n2") && _parent.bu > _config.number("src.s30.l78.n3"))
         {
            _parent.bu--;
         }
         _parent.h = (_parent.h + _parent.bu) % _config.number("src.s30.l82.n1");
         this._rotation = _parent.h;
         if(_parent.bu == _config.number("src.s30.l84.n1"))
         {
            _parent.keyizhuan = _config.number("src.s30.l86.n1");
            if(_parent.h < _config.number("src.s30.l87.n1"))
            {
               shu = _config.number("src.s30.l89.n1");
            }
            else if(_parent.h < _config.number("src.s30.l91.n1"))
            {
               shu = _config.number("src.s30.l93.n1");
            }
            else if(_parent.h < _config.number("src.s30.l95.n1"))
            {
               shu = _config.number("src.s30.l97.n1");
            }
            else if(_parent.h < _config.number("src.s30.l99.n1"))
            {
               shu = _config.number("src.s30.l101.n1");
            }
            else if(_parent.h < _config.number("src.s30.l103.n1"))
            {
               shu = _config.number("src.s30.l105.n1");
            }
            else if(_parent.h < _config.number("src.s30.l107.n1"))
            {
               shu = _config.number("src.s30.l109.n1");
            }
            else
            {
               shu = _config.number("src.s30.l113.n1");
            }
            ying = int(_parent.dukuang._x / _config.number("src.s30.l115.n1") + _config.number("src.s30.l115.n2")) * _config.number("src.s30.l115.n3");
            jieguo = _parent.dukuang._x / _config.number("src.s30.l116.n1") % _config.number("src.s30.l116.n2");
            if(shu % _config.number("src.s30.l117.n1") + jieguo == _config.number("src.s30.l117.n2"))
            {
               _root.wenben = "恭喜您赢了" + ying + "元";
               _root.xianjin2 += ying;
               ss = new Sound();
               _invoke(ss,"attachSound","shengli");
               _invoke(ss,"start",);
            }
            else
            {
               _root.wenben = "命该如此";
            }
            if(_root.zhuyuan1 == _config.number("src.s30.l129.n1"))
            {
               _root.shui = _config.number("src.s30.l131.n1");
               _root.xingqi = _config.number("src.s30.l132.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s30.l134.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s30.l138.n1");
               _root.xingqi = _config.number("src.s30.l139.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s30.l141.n1"));
            }
         }
      }
   }

} },
// DefineSprite_62_ducheng1/frame_1/PlaceObject2_61_dukuang1_22/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(_root.shui == _config.number("src.s31.l2.n1"))
   {
      duzi = int(_parent.dukuang._x / _config.number("src.s31.l4.n1") + _config.number("src.s31.l4.n2")) * _config.number("src.s31.l4.n3");
      if(dong == _config.number("src.s31.l5.n1"))
      {
         temp = Key.getCode();
         if(temp == _config.number("src.s31.l8.n1") && this._x < _config.number("src.s31.l8.n2"))
         {
            this._x += _config.number("src.s31.l10.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s31.l15.n1") && this._x > _config.number("src.s31.l15.n2"))
         {
            this._x -= _config.number("src.s31.l17.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s31.l22.n1"))
         {
            if(_root.xianjin1 < duzi)
            {
               _root.wenben = "您的现金不够";
            }
            else
            {
               _root.wenben = "祝您好运";
               _root.xianjin1 -= duzi;
               _parent.keyizhuan = _config.number("src.s31.l32.n1");
               dong = _config.number("src.s31.l33.n1");
            }
         }
         else if(temp == _config.number("src.s31.l36.n1"))
         {
            _root.wenben = "不赌一把不许走";
         }
      }
   }
   else if(_root.shui == _config.number("src.s31.l42.n1"))
   {
      duzi = int(_parent.dukuang._x / _config.number("src.s31.l44.n1") + _config.number("src.s31.l44.n2")) * _config.number("src.s31.l44.n3");
      if(dong == _config.number("src.s31.l45.n1"))
      {
         temp = Key.getCode();
         if(temp == _config.number("src.s31.l48.n1") && this._x < _config.number("src.s31.l48.n2"))
         {
            this._x += _config.number("src.s31.l50.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s31.l55.n1") && this._x > _config.number("src.s31.l55.n2"))
         {
            this._x -= _config.number("src.s31.l57.n1");
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
         }
         else if(temp == _config.number("src.s31.l62.n1"))
         {
            if(_root.xianjin2 < duzi)
            {
               _root.wenben = "您的现金不够";
            }
            else
            {
               _root.wenben = "祝您好运";
               _root.xianjin2 -= duzi;
               _parent.keyizhuan = _config.number("src.s31.l72.n1");
               dong = _config.number("src.s31.l73.n1");
            }
         }
         else if(temp == _config.number("src.s31.l76.n1"))
         {
            _root.wenben = "不赌一把不许走";
         }
      }
   }

} },
// DefineSprite_71_ducheng/frame_1/PlaceObject2_70_dukuang_6/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(_root.shui == _config.number("src.s32.l2.n1"))
   {
      temp = Key.getCode();
      if(temp == _config.number("src.s32.l5.n1") && this._x < _config.number("src.s32.l5.n2"))
      {
         this._x += _config.number("src.s32.l7.n1");
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
      }
      else if(temp == _config.number("src.s32.l12.n1") && this._x > _config.number("src.s32.l12.n2"))
      {
         this._x -= _config.number("src.s32.l14.n1");
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
      }
      else if(temp == _config.number("src.s32.l19.n1"))
      {
         if(_root.xianjin1 >= _config.number("src.s32.l21.n1"))
         {
            if(this._x == _config.number("src.s32.l23.n1"))
            {
               _invoke(_root,"attachMovie","ducheng1","ducheng1",_config.number("src.s32.l25.n1"),{_x:_config.number("src.s32.l25.n2"),_y:_config.number("src.s32.l25.n3")});
            }
            else if(this._x == _config.number("src.s32.l27.n1"))
            {
               _invoke(_root,"attachMovie","ducheng2","ducheng2",_config.number("src.s32.l29.n1"),{_x:_config.number("src.s32.l29.n2"),_y:_config.number("src.s32.l29.n3")});
            }
         }
         else
         {
            _root.wenben = "赌城不欢迎穷光蛋";
         }
      }
      else if(temp == _config.number("src.s32.l37.n1"))
      {
         _root.wenben = "好孩子不赌博";
         if(_root.zhuyuan2 == _config.number("src.s32.l40.n1"))
         {
            _root.shui = _config.number("src.s32.l42.n1");
            _root.xingqi = _config.number("src.s32.l43.n1");
            _root.pp = "2P";
            _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s32.l45.n1"));
         }
         else
         {
            _root.shui = _config.number("src.s32.l49.n1");
            _root.xingqi = _config.number("src.s32.l50.n1");
            _root.pp = "1P";
            _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s32.l52.n1"));
         }
         _invoke(_root,"attachMovie","tt","tt",_config.number("src.s32.l54.n1"),{_x:_config.number("src.s32.l54.n2"),_y:_config.number("src.s32.l54.n3")});
      }
   }
   else if(_root.shui == _config.number("src.s32.l57.n1"))
   {
      temp = Key.getCode();
      if(temp == _config.number("src.s32.l60.n1") && this._x < _config.number("src.s32.l60.n2"))
      {
         this._x += _config.number("src.s32.l62.n1");
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
      }
      else if(temp == _config.number("src.s32.l67.n1") && this._x > _config.number("src.s32.l67.n2"))
      {
         this._x -= _config.number("src.s32.l69.n1");
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
      }
      else if(temp == _config.number("src.s32.l74.n1"))
      {
         if(_root.xianjin2 >= _config.number("src.s32.l76.n1"))
         {
            if(this._x == _config.number("src.s32.l78.n1"))
            {
               _invoke(_root,"attachMovie","ducheng1","ducheng1",_config.number("src.s32.l80.n1"),{_x:_config.number("src.s32.l80.n2"),_y:_config.number("src.s32.l80.n3")});
            }
            else if(this._x == _config.number("src.s32.l82.n1"))
            {
               _invoke(_root,"attachMovie","ducheng2","ducheng2",_config.number("src.s32.l84.n1"),{_x:_config.number("src.s32.l84.n2"),_y:_config.number("src.s32.l84.n3")});
            }
         }
         else
         {
            _root.wenben = "赌城不欢迎穷光蛋";
         }
      }
      else if(temp == _config.number("src.s32.l92.n1"))
      {
         _root.wenben = "好孩子不赌博";
         if(_root.zhuyuan1 == _config.number("src.s32.l95.n1"))
         {
            _root.shui = _config.number("src.s32.l97.n1");
            _root.xingqi = _config.number("src.s32.l98.n1");
            _root.pp = "1P";
            _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s32.l100.n1"));
         }
         else
         {
            _root.shui = _config.number("src.s32.l104.n1");
            _root.xingqi = _config.number("src.s32.l105.n1");
            _root.pp = "2P";
            _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s32.l107.n1"));
         }
         _invoke(_root,"attachMovie","tt","tt",_config.number("src.s32.l109.n1"),{_x:_config.number("src.s32.l109.n2"),_y:_config.number("src.s32.l109.n3")});
      }
   }

} },
// DefineSprite_94_chaoshi/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "欢迎光临";
kuang.h = _config.number("src.s33.l2.n1");

} },
// DefineSprite_94_chaoshi/frame_1/PlaceObject2_92_kakuang_27/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(_root.shui == _config.number("src.s34.l2.n1"))
   {
      if(h == _config.number("src.s34.l4.n1"))
      {
         temp = Key.getCode();
         if(temp == _config.number("src.s34.l7.n1") && this._x < _config.number("src.s34.l7.n2"))
         {
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
            this._x += _config.number("src.s34.l12.n1");
         }
         else if(temp == _config.number("src.s34.l14.n1") && this._x > _config.number("src.s34.l14.n2"))
         {
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
            this._x -= _config.number("src.s34.l19.n1");
         }
         else if(temp == _config.number("src.s34.l21.n1"))
         {
            _root.wenben = "谢谢惠顾";
            if(this._x == _config.number("src.s34.l24.n1"))
            {
               if(_root.zuanshi1 == _config.number("src.s34.l26.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l29.n1");
                  _root.wenben = "终于有回报了";
                  _root.xianjin1 += _config.number("src.s34.l31.n1");
                  _root.zuanshi1 = _config.number("src.s34.l32.n1");
                  if(_root.zhuyuan2 == _config.number("src.s34.l33.n1"))
                  {
                     _root.shui = _config.number("src.s34.l35.n1");
                     _root.xingqi = _config.number("src.s34.l36.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l38.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l42.n1");
                     _root.xingqi = _config.number("src.s34.l43.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l45.n1"));
                  }
               }
               else if(_root.xianjin1 >= _config.number("src.s34.l48.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l51.n1");
                  _root.xianjin1 -= _config.number("src.s34.l52.n1");
                  _root.zuanshi1++;
                  if(_root.zhuyuan2 == _config.number("src.s34.l54.n1"))
                  {
                     _root.shui = _config.number("src.s34.l56.n1");
                     _root.xingqi = _config.number("src.s34.l57.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l59.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l63.n1");
                     _root.xingqi = _config.number("src.s34.l64.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l66.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == _config.number("src.s34.l74.n1"))
            {
               if(_root.wuxing1 == _config.number("src.s34.l76.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l79.n1");
                  _root.wenben = "发笔小财";
                  _root.xianjin1 += _config.number("src.s34.l81.n1");
                  _root.wuxing1 = _config.number("src.s34.l82.n1");
                  if(_root.zhuyuan2 == _config.number("src.s34.l83.n1"))
                  {
                     _root.shui = _config.number("src.s34.l85.n1");
                     _root.xingqi = _config.number("src.s34.l86.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l88.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l92.n1");
                     _root.xingqi = _config.number("src.s34.l93.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l95.n1"));
                  }
               }
               else if(_root.xianjin1 >= _config.number("src.s34.l98.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l101.n1");
                  _root.xianjin1 -= _config.number("src.s34.l102.n1");
                  _root.wuxing1++;
                  if(_root.zhuyuan2 == _config.number("src.s34.l104.n1"))
                  {
                     _root.shui = _config.number("src.s34.l106.n1");
                     _root.xingqi = _config.number("src.s34.l107.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l109.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l113.n1");
                     _root.xingqi = _config.number("src.s34.l114.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l116.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == _config.number("src.s34.l124.n1"))
            {
               if(_root.yumao1 == _config.number("src.s34.l126.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l129.n1");
                  _root.wenben = "有钱真好";
                  _root.xianjin1 += _config.number("src.s34.l131.n1");
                  _root.yumao1 = _config.number("src.s34.l132.n1");
                  if(_root.zhuyuan2 == _config.number("src.s34.l133.n1"))
                  {
                     _root.shui = _config.number("src.s34.l135.n1");
                     _root.xingqi = _config.number("src.s34.l136.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l138.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l142.n1");
                     _root.xingqi = _config.number("src.s34.l143.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l145.n1"));
                  }
               }
               else if(_root.xianjin1 >= _config.number("src.s34.l148.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l151.n1");
                  _root.xianjin1 -= _config.number("src.s34.l152.n1");
                  _root.yumao1++;
                  if(_root.zhuyuan2 == _config.number("src.s34.l154.n1"))
                  {
                     _root.shui = _config.number("src.s34.l156.n1");
                     _root.xingqi = _config.number("src.s34.l157.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l159.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l163.n1");
                     _root.xingqi = _config.number("src.s34.l164.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l166.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == _config.number("src.s34.l174.n1"))
            {
               if(_root.dilei1 == _config.number("src.s34.l176.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l179.n1");
                  _root.wenben = "赚发了";
                  _root.xianjin1 += _config.number("src.s34.l181.n1");
                  _root.dilei1 = _config.number("src.s34.l182.n1");
                  if(_root.zhuyuan2 == _config.number("src.s34.l183.n1"))
                  {
                     _root.shui = _config.number("src.s34.l185.n1");
                     _root.xingqi = _config.number("src.s34.l186.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l188.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l192.n1");
                     _root.xingqi = _config.number("src.s34.l193.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l195.n1"));
                  }
               }
               else if(_root.xianjin1 >= _config.number("src.s34.l198.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l201.n1");
                  _root.xianjin1 -= _config.number("src.s34.l202.n1");
                  _root.dilei1++;
                  if(_root.zhuyuan2 == _config.number("src.s34.l204.n1"))
                  {
                     _root.shui = _config.number("src.s34.l206.n1");
                     _root.xingqi = _config.number("src.s34.l207.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l209.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l213.n1");
                     _root.xingqi = _config.number("src.s34.l214.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l216.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
         }
         else if(temp == _config.number("src.s34.l225.n1"))
         {
            this._visible = false;
            h = _config.number("src.s34.l228.n1");
            if(_root.zhuyuan2 == _config.number("src.s34.l229.n1"))
            {
               _root.shui = _config.number("src.s34.l231.n1");
               _root.xingqi = _config.number("src.s34.l232.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l234.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s34.l238.n1");
               _root.xingqi = _config.number("src.s34.l239.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l241.n1"));
            }
            _root.wenben = "下次再买";
            _invoke(_root,"attachMovie","tt","tt",_config.number("src.s34.l244.n1"),{_x:_config.number("src.s34.l244.n2"),_y:_config.number("src.s34.l244.n3")});
         }
      }
   }
   else if(_root.shui == _config.number("src.s34.l248.n1"))
   {
      if(h == _config.number("src.s34.l250.n1"))
      {
         temp = Key.getCode();
         if(temp == _config.number("src.s34.l253.n1") && this._x < _config.number("src.s34.l253.n2"))
         {
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
            this._x += _config.number("src.s34.l258.n1");
         }
         else if(temp == _config.number("src.s34.l260.n1") && this._x > _config.number("src.s34.l260.n2"))
         {
            ss = new Sound();
            _invoke(ss,"attachSound","xuanren");
            _invoke(ss,"start",);
            this._x -= _config.number("src.s34.l265.n1");
         }
         else if(temp == _config.number("src.s34.l267.n1"))
         {
            _root.wenben = "谢谢惠顾";
            if(this._x == _config.number("src.s34.l270.n1"))
            {
               if(_root.zuanshi2 == _config.number("src.s34.l272.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l275.n1");
                  _root.wenben = "终于有回报了";
                  _root.xianjin2 += _config.number("src.s34.l277.n1");
                  _root.zuanshi2 = _config.number("src.s34.l278.n1");
                  if(_root.zhuyuan1 == _config.number("src.s34.l279.n1"))
                  {
                     _root.shui = _config.number("src.s34.l281.n1");
                     _root.xingqi = _config.number("src.s34.l282.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l284.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l288.n1");
                     _root.xingqi = _config.number("src.s34.l289.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l291.n1"));
                  }
               }
               else if(_root.xianjin2 >= _config.number("src.s34.l294.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l297.n1");
                  _root.xianjin2 -= _config.number("src.s34.l298.n1");
                  _root.zuanshi2++;
                  if(_root.zhuyuan1 == _config.number("src.s34.l300.n1"))
                  {
                     _root.shui = _config.number("src.s34.l302.n1");
                     _root.xingqi = _config.number("src.s34.l303.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l305.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l309.n1");
                     _root.xingqi = _config.number("src.s34.l310.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l312.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == _config.number("src.s34.l320.n1"))
            {
               if(_root.wuxing2 == _config.number("src.s34.l322.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l325.n1");
                  _root.wenben = "发笔小财";
                  _root.xianjin2 += _config.number("src.s34.l327.n1");
                  _root.wuxing2 = _config.number("src.s34.l328.n1");
                  if(_root.zhuyuan1 == _config.number("src.s34.l329.n1"))
                  {
                     _root.shui = _config.number("src.s34.l331.n1");
                     _root.xingqi = _config.number("src.s34.l332.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l334.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l338.n1");
                     _root.xingqi = _config.number("src.s34.l339.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l341.n1"));
                  }
               }
               else if(_root.xianjin2 >= _config.number("src.s34.l344.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l347.n1");
                  _root.xianjin2 -= _config.number("src.s34.l348.n1");
                  _root.wuxing2++;
                  if(_root.zhuyuan1 == _config.number("src.s34.l350.n1"))
                  {
                     _root.shui = _config.number("src.s34.l352.n1");
                     _root.xingqi = _config.number("src.s34.l353.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l355.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l359.n1");
                     _root.xingqi = _config.number("src.s34.l360.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l362.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == _config.number("src.s34.l370.n1"))
            {
               if(_root.yumao2 == _config.number("src.s34.l372.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l375.n1");
                  _root.wenben = "有钱真好";
                  _root.xianjin2 += _config.number("src.s34.l377.n1");
                  _root.yumao2 = _config.number("src.s34.l378.n1");
                  if(_root.zhuyuan1 == _config.number("src.s34.l379.n1"))
                  {
                     _root.shui = _config.number("src.s34.l381.n1");
                     _root.xingqi = _config.number("src.s34.l382.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l384.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l388.n1");
                     _root.xingqi = _config.number("src.s34.l389.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l391.n1"));
                  }
               }
               else if(_root.xianjin2 >= _config.number("src.s34.l394.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l397.n1");
                  _root.xianjin2 -= _config.number("src.s34.l398.n1");
                  _root.yumao2++;
                  if(_root.zhuyuan1 == _config.number("src.s34.l400.n1"))
                  {
                     _root.shui = _config.number("src.s34.l402.n1");
                     _root.xingqi = _config.number("src.s34.l403.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l405.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l409.n1");
                     _root.xingqi = _config.number("src.s34.l410.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l412.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
            else if(this._x == _config.number("src.s34.l420.n1"))
            {
               if(_root.dilei2 == _config.number("src.s34.l422.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l425.n1");
                  _root.wenben = "赚发了";
                  _root.xianjin2 += _config.number("src.s34.l427.n1");
                  _root.dilei2 = _config.number("src.s34.l428.n1");
                  if(_root.zhuyuan1 == _config.number("src.s34.l429.n1"))
                  {
                     _root.shui = _config.number("src.s34.l431.n1");
                     _root.xingqi = _config.number("src.s34.l432.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l434.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l438.n1");
                     _root.xingqi = _config.number("src.s34.l439.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l441.n1"));
                  }
               }
               else if(_root.xianjin2 >= _config.number("src.s34.l444.n1"))
               {
                  this._visible = false;
                  h = _config.number("src.s34.l447.n1");
                  _root.xianjin2 -= _config.number("src.s34.l448.n1");
                  _root.dilei2++;
                  if(_root.zhuyuan1 == _config.number("src.s34.l450.n1"))
                  {
                     _root.shui = _config.number("src.s34.l452.n1");
                     _root.xingqi = _config.number("src.s34.l453.n1");
                     _root.pp = "1P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l455.n1"));
                  }
                  else
                  {
                     _root.shui = _config.number("src.s34.l459.n1");
                     _root.xingqi = _config.number("src.s34.l460.n1");
                     _root.pp = "2P";
                     _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l462.n1"));
                  }
               }
               else
               {
                  _root.wenben = "您的现金不足";
               }
            }
         }
         else if(temp == _config.number("src.s34.l471.n1"))
         {
            this._visible = false;
            h = _config.number("src.s34.l474.n1");
            if(_root.zhuyuan1 == _config.number("src.s34.l475.n1"))
            {
               _root.shui = _config.number("src.s34.l477.n1");
               _root.xingqi = _config.number("src.s34.l478.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l480.n1"));
            }
            else
            {
               _root.shui = _config.number("src.s34.l484.n1");
               _root.xingqi = _config.number("src.s34.l485.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s34.l487.n1"));
            }
            _root.wenben = "下次再买";
            _invoke(_root,"attachMovie","tt","tt",_config.number("src.s34.l490.n1"),{_x:_config.number("src.s34.l490.n2"),_y:_config.number("src.s34.l490.n3")});
         }
      }
   }

} },
// DefineSprite_9_shengji/frame_1/DoAction.as
function(__scope) { with (__scope) {
_root.wenben = "是否换新房";
ss = new Sound();
_invoke(ss,"attachSound","foushi");
_invoke(ss,"start",);

} },
// DefineSprite_9_shengji/frame_1/PlaceObject2_7_shifou_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s36.l2.n1") && _root.shui == _config.number("src.s36.l2.n2"))
   {
      _root.wenben = _root.name1 + "鸟枪换炮了";
      _root.wuxing1--;
      _root.f11--;
      _root.f12++;
      _root.jibie[_root.weizhi] = _config.number("src.s36.l8.n1");
      x = int(_root.renwu1._x / _config.number("src.s36.l9.n1")) * _config.number("src.s36.l9.n2");
      y = int(_root.renwu1._y / _config.number("src.s36.l10.n1")) * _config.number("src.s36.l10.n2");
      _invoke(_root,"attachMovie","f2","f2",_config.number("src.s36.l11.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan2 == _config.number("src.s36.l12.n1"))
      {
         _root.shui = _config.number("src.s36.l14.n1");
         _root.xingqi = _config.number("src.s36.l15.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l17.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s36.l21.n1");
         _root.xingqi = _config.number("src.s36.l22.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l24.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s36.l26.n1"),{_x:_config.number("src.s36.l26.n2"),_y:_config.number("src.s36.l26.n3")});
   }
   else if(Key.getCode() == _config.number("src.s36.l28.n1") && _root.shui == _config.number("src.s36.l28.n2"))
   {
      if(_root.zhuyuan2 == _config.number("src.s36.l30.n1"))
      {
         _root.shui = _config.number("src.s36.l32.n1");
         _root.xingqi = _config.number("src.s36.l33.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l35.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s36.l39.n1");
         _root.xingqi = _config.number("src.s36.l40.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l42.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s36.l44.n1"),{_x:_config.number("src.s36.l44.n2"),_y:_config.number("src.s36.l44.n3")});
   }
   else if(Key.getCode() == _config.number("src.s36.l46.n1") && _root.shui == _config.number("src.s36.l46.n2"))
   {
      _root.wenben = _root.name2 + "鸟枪换炮了";
      _root.wuxing2--;
      _root.f21--;
      _root.f22++;
      _root.jibie[_root.weizhi] = _config.number("src.s36.l52.n1");
      x = int(_root.renwu2._x / _config.number("src.s36.l53.n1")) * _config.number("src.s36.l53.n2");
      y = int(_root.renwu2._y / _config.number("src.s36.l54.n1")) * _config.number("src.s36.l54.n2");
      _invoke(_root,"attachMovie","z2","z2",_config.number("src.s36.l55.n1") + _root.weizhi,{_x:x,_y:y});
      if(_root.zhuyuan1 == _config.number("src.s36.l56.n1"))
      {
         _root.shui = _config.number("src.s36.l58.n1");
         _root.xingqi = _config.number("src.s36.l59.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l61.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s36.l65.n1");
         _root.xingqi = _config.number("src.s36.l66.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l68.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s36.l70.n1"),{_x:_config.number("src.s36.l70.n2"),_y:_config.number("src.s36.l70.n3")});
   }
   else if(Key.getCode() == _config.number("src.s36.l72.n1") && _root.shui == _config.number("src.s36.l72.n2"))
   {
      if(_root.zhuyuan1 == _config.number("src.s36.l74.n1"))
      {
         _root.shui = _config.number("src.s36.l76.n1");
         _root.xingqi = _config.number("src.s36.l77.n1");
         _root.pp = "1P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l79.n1"));
      }
      else
      {
         _root.shui = _config.number("src.s36.l83.n1");
         _root.xingqi = _config.number("src.s36.l84.n1");
         _root.pp = "2P";
         _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s36.l86.n1"));
      }
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s36.l88.n1"),{_x:_config.number("src.s36.l88.n2"),_y:_config.number("src.s36.l88.n3")});
   }

} },
// frame_1/DoAction.as
function(__scope) { with (__scope) {
kaishi = function kaishi()
{
   if(_root.pp1 == _config.number("src.s37.l3.n1") && _root.pp2 == _config.number("src.s37.l3.n2"))
   {
      _root.n = _root.n - _config.number("src.s37.l5.n1");
      if(_root.n == _config.number("src.s37.l6.n1"))
      {
         clearInterval(mm1);
         _invoke(_root,"gotoAndPlay",_config.number("src.s37.l9.n1"));
      }
   }
}
stop();
pp1 = _config.number("src.s37.l14.n1");
pp2 = _config.number("src.s37.l15.n1");
n = _config.number("rules.selectionTicks");
mm1 = setInterval(kaishi,_config.number("rules.selectionTickMilliseconds"));

} },
// frame_1/PlaceObject2_140_P2_258/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   temp = Key.getCode();
   if(_root.pp2 == _config.number("src.s38.l3.n1"))
   {
      if(temp == _config.number("src.s38.l5.n1") && this._x > _config.number("src.s38.l5.n2"))
      {
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
         if(_root.p1._x == this._x - _config.number("src.s38.l10.n1") && this._x > _config.number("src.s38.l10.n2"))
         {
            this._x -= _config.number("src.s38.l12.n1");
         }
         else if(_root.p1._x != this._x - _config.number("src.s38.l14.n1"))
         {
            this._x -= _config.number("src.s38.l16.n1");
         }
      }
      else if(temp == _config.number("src.s38.l19.n1") && this._x < _config.number("src.s38.l19.n2"))
      {
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
         if(_root.p1._x == this._x + _config.number("src.s38.l24.n1") && this._x < _config.number("src.s38.l24.n2"))
         {
            this._x += _config.number("src.s38.l26.n1");
         }
         else if(_root.p1._x != this._x + _config.number("src.s38.l28.n1"))
         {
            this._x += _config.number("src.s38.l30.n1");
         }
      }
      else if(temp == _config.number("src.s38.l33.n1"))
      {
         ss = new Sound();
         _invoke(ss,"attachSound","tiao.wav");
         _invoke(ss,"start",);
         _root.pp2 = _config.number("src.s38.l38.n1");
         _invoke(this,"gotoAndStop",_config.number("src.s38.l39.n1"));
         if(this._x == _config.number("src.s38.l40.n1"))
         {
            _root.ppp2 = "b1";
         }
         else if(this._x == _config.number("src.s38.l44.n1"))
         {
            _root.ppp2 = "b2";
         }
         else if(this._x == _config.number("src.s38.l48.n1"))
         {
            _root.ppp2 = "b3";
         }
         else if(this._x == _config.number("src.s38.l52.n1"))
         {
            _root.ppp2 = "b4";
         }
         else if(this._x == _config.number("src.s38.l56.n1"))
         {
            _root.ppp2 = "b5";
         }
         else if(this._x == _config.number("src.s38.l60.n1"))
         {
            _root.ppp2 = "b6";
         }
         else if(this._x == _config.number("src.s38.l64.n1"))
         {
            _root.ppp2 = "b7";
         }
      }
   }

} },
// frame_1/PlaceObject2_143_P1_255/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   temp = Key.getCode();
   if(_root.pp1 == _config.number("src.s39.l3.n1"))
   {
      if(temp == _config.number("src.s39.l5.n1") && this._x > _config.number("src.s39.l5.n2"))
      {
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
         if(_root.p2._x == this._x - _config.number("src.s39.l10.n1") && this._x > _config.number("src.s39.l10.n2"))
         {
            this._x -= _config.number("src.s39.l12.n1");
         }
         else if(_root.p2._x != this._x - _config.number("src.s39.l14.n1"))
         {
            this._x -= _config.number("src.s39.l16.n1");
         }
      }
      else if(temp == _config.number("src.s39.l19.n1") && this._x < _config.number("src.s39.l19.n2"))
      {
         ss = new Sound();
         _invoke(ss,"attachSound","xuanren");
         _invoke(ss,"start",);
         if(_root.p2._x == this._x + _config.number("src.s39.l24.n1") && this._x < _config.number("src.s39.l24.n2"))
         {
            this._x += _config.number("src.s39.l26.n1");
         }
         else if(_root.p2._x != this._x + _config.number("src.s39.l28.n1"))
         {
            this._x += _config.number("src.s39.l30.n1");
         }
      }
      else if(temp == _config.number("src.s39.l33.n1"))
      {
         ss = new Sound();
         _invoke(ss,"attachSound","tiao.wav");
         _invoke(ss,"start",);
         _root.pp1 = _config.number("src.s39.l38.n1");
         _invoke(this,"gotoAndStop",_config.number("src.s39.l39.n1"));
         if(this._x == _config.number("src.s39.l40.n1"))
         {
            _root.ppp1 = "b1";
         }
         else if(this._x == _config.number("src.s39.l44.n1"))
         {
            _root.ppp1 = "b2";
         }
         else if(this._x == _config.number("src.s39.l48.n1"))
         {
            _root.ppp1 = "b3";
         }
         else if(this._x == _config.number("src.s39.l52.n1"))
         {
            _root.ppp1 = "b4";
         }
         else if(this._x == _config.number("src.s39.l56.n1"))
         {
            _root.ppp1 = "b5";
         }
         else if(this._x == _config.number("src.s39.l60.n1"))
         {
            _root.ppp1 = "b6";
         }
         else if(this._x == _config.number("src.s39.l64.n1"))
         {
            _root.ppp1 = "b7";
         }
      }
   }

} },
// frame_2/DoAction.as
function(__scope) { with (__scope) {
jiajia = function jiajia()
{
   yongshi++;
}
stop();
f11 = _config.number("src.s40.l6.n1");
f12 = _config.number("src.s40.l7.n1");
f13 = _config.number("src.s40.l8.n1");
f21 = _config.number("src.s40.l9.n1");
f22 = _config.number("src.s40.l10.n1");
f23 = _config.number("src.s40.l11.n1");
yongshi = _config.number("src.s40.l12.n1");
mm = shijian = setInterval(jiajia,_config.number("rules.minuteMilliseconds"));
xingqi = _config.number("src.s40.l14.n1");
shui = _config.number("src.s40.l15.n1");
pp = "1P";
zhuyuan1 = _config.number("src.s40.l17.n1");
zhuyuan2 = _config.number("src.s40.l18.n1");
shuyu = new Array();
jibie = new Array();
xianjin = new Array();
zuanshi = new Array();
tanchu = _config.number("src.s40.l23.n1");
i = _config.number("src.s40.l24.n1");
while(i < _config.number("src.s40.l25.n1"))
{
   shuyu[i] = _config.number("src.s40.l27.n1");
   jibie[i] = _config.number("src.s40.l28.n1");
   i++;
}
i = _config.number("src.s40.l31.n1");
while(i < _config.number("src.s40.l32.n1"))
{
   xianjin[i] = _config.number("src.s40.l34.n1");
   zuanshi[i] = _config.number("src.s40.l35.n1");
   i++;
}
i = _config.number("src.s40.l38.n1");
while(i < _config.number("src.s40.l39.n1"))
{
   xianjin[i] = _config.number("src.s40.l41.n1");
   zuanshi[i] = _config.number("src.s40.l42.n1");
   i++;
}
i = _config.number("src.s40.l45.n1");
while(i < _config.number("src.s40.l46.n1"))
{
   xianjin[i] = _config.number("src.s40.l48.n1");
   zuanshi[i] = _config.number("src.s40.l49.n1");
   i++;
}
xianjin[_config.number("src.s40.l52.n1")] = _config.number("src.s40.l52.n2");
zuanshi[_config.number("src.s40.l53.n1")] = _config.number("src.s40.l53.n2");
i = _config.number("src.s40.l54.n1");
while(i < _config.number("src.s40.l55.n1"))
{
   xianjin[i] = _config.number("src.s40.l57.n1");
   zuanshi[i] = _config.number("src.s40.l58.n1");
   i++;
}
i = _config.number("src.s40.l61.n1");
while(i < _config.number("src.s40.l62.n1"))
{
   xianjin[i] = _config.number("src.s40.l64.n1");
   zuanshi[i] = _config.number("src.s40.l65.n1");
   i++;
}
i = _config.number("src.s40.l68.n1");
while(i < _config.number("src.s40.l69.n1"))
{
   xianjin[i] = _config.number("src.s40.l71.n1");
   zuanshi[i] = _config.number("src.s40.l72.n1");
   i++;
}
i = _config.number("src.s40.l75.n1");
while(i < _config.number("src.s40.l76.n1"))
{
   xianjin[i] = _config.number("src.s40.l78.n1");
   zuanshi[i] = _config.number("src.s40.l79.n1");
   i++;
}
i = _config.number("src.s40.l82.n1");
while(i < _config.number("src.s40.l83.n1"))
{
   xianjin[i] = _config.number("src.s40.l85.n1");
   zuanshi[i] = _config.number("src.s40.l86.n1");
   i++;
}
xianjin[_config.number("src.s40.l89.n1")] = _config.number("src.s40.l89.n2");
zuanshi[_config.number("src.s40.l90.n1")] = _config.number("src.s40.l90.n2");
i = _config.number("src.s40.l91.n1");
while(i < _config.number("src.s40.l92.n1"))
{
   wenben = "欢迎来到大富翁俱乐部";
   i++;
}
keyizhuan = _config.number("src.s40.l97.n1");
if(ppp1 == "b1")
{
   _invoke(_root,"attachMovie","c1","renwu1",_config.number("src.s40.l100.n1"),{_x:_config.number("src.s40.l100.n2"),_y:_config.number("src.s40.l100.n3")});
   _invoke(_root,"attachMovie","b1","b1",_config.number("src.s40.l101.n1"),{_x:_config.number("src.s40.l101.n2"),_y:_config.number("src.s40.l101.n3")});
   name1 = "阿布";
   xianjin1 = _config.number("src.s40.l103.n1");
   touzhi1 = _config.number("src.s40.l104.n1");
   jiangjin1 = _config.number("src.s40.l105.n1");
   shuilv1 = _config.number("src.s40.l106.n1");
   zuanshi1 = _config.number("src.s40.l107.n1");
   wuxing1 = _config.number("src.s40.l108.n1");
   yumao1 = _config.number("src.s40.l109.n1");
   dilei1 = _config.number("src.s40.l110.n1");
}
else if(ppp1 == "b2")
{
   _invoke(_root,"attachMovie","c2","renwu1",_config.number("src.s40.l114.n1"),{_x:_config.number("src.s40.l114.n2"),_y:_config.number("src.s40.l114.n3")});
   _invoke(_root,"attachMovie","b2","b2",_config.number("src.s40.l115.n1"),{_x:_config.number("src.s40.l115.n2"),_y:_config.number("src.s40.l115.n3")});
   name1 = "忍者";
   xianjin1 = _config.number("src.s40.l117.n1");
   touzhi1 = _config.number("src.s40.l118.n1");
   jiangjin1 = _config.number("src.s40.l119.n1");
   shuilv1 = _config.number("src.s40.l120.n1");
   zuanshi1 = _config.number("src.s40.l121.n1");
   wuxing1 = _config.number("src.s40.l122.n1");
   yumao1 = _config.number("src.s40.l123.n1");
   dilei1 = _config.number("src.s40.l124.n1");
}
else if(ppp1 == "b3")
{
   _invoke(_root,"attachMovie","c3","renwu1",_config.number("src.s40.l128.n1"),{_x:_config.number("src.s40.l128.n2"),_y:_config.number("src.s40.l128.n3")});
   _invoke(_root,"attachMovie","b3","b3",_config.number("src.s40.l129.n1"),{_x:_config.number("src.s40.l129.n2"),_y:_config.number("src.s40.l129.n3")});
   name1 = "丽丽";
   xianjin1 = _config.number("src.s40.l131.n1");
   touzhi1 = _config.number("src.s40.l132.n1");
   jiangjin1 = _config.number("src.s40.l133.n1");
   shuilv1 = _config.number("src.s40.l134.n1");
   zuanshi1 = _config.number("src.s40.l135.n1");
   wuxing1 = _config.number("src.s40.l136.n1");
   yumao1 = _config.number("src.s40.l137.n1");
   dilei1 = _config.number("src.s40.l138.n1");
}
else if(ppp1 == "b4")
{
   _invoke(_root,"attachMovie","c4","renwu1",_config.number("src.s40.l142.n1"),{_x:_config.number("src.s40.l142.n2"),_y:_config.number("src.s40.l142.n3")});
   _invoke(_root,"attachMovie","b4","b4",_config.number("src.s40.l143.n1"),{_x:_config.number("src.s40.l143.n2"),_y:_config.number("src.s40.l143.n3")});
   name1 = "小强";
   xianjin1 = _config.number("src.s40.l145.n1");
   touzhi1 = _config.number("src.s40.l146.n1");
   jiangjin1 = _config.number("src.s40.l147.n1");
   shuilv1 = _config.number("src.s40.l148.n1");
   zuanshi1 = _config.number("src.s40.l149.n1");
   wuxing1 = _config.number("src.s40.l150.n1");
   yumao1 = _config.number("src.s40.l151.n1");
   dilei1 = _config.number("src.s40.l152.n1");
}
else if(ppp1 == "b5")
{
   _invoke(_root,"attachMovie","c5","renwu1",_config.number("src.s40.l156.n1"),{_x:_config.number("src.s40.l156.n2"),_y:_config.number("src.s40.l156.n3")});
   _invoke(_root,"attachMovie","b5","b5",_config.number("src.s40.l157.n1"),{_x:_config.number("src.s40.l157.n2"),_y:_config.number("src.s40.l157.n3")});
   name1 = "咚咚";
   xianjin1 = _config.number("src.s40.l159.n1");
   touzhi1 = _config.number("src.s40.l160.n1");
   jiangjin1 = _config.number("src.s40.l161.n1");
   shuilv1 = _config.number("src.s40.l162.n1");
   zuanshi1 = _config.number("src.s40.l163.n1");
   wuxing1 = _config.number("src.s40.l164.n1");
   yumao1 = _config.number("src.s40.l165.n1");
   dilei1 = _config.number("src.s40.l166.n1");
}
else if(ppp1 == "b6")
{
   _invoke(_root,"attachMovie","c6","renwu1",_config.number("src.s40.l170.n1"),{_x:_config.number("src.s40.l170.n2"),_y:_config.number("src.s40.l170.n3")});
   _invoke(_root,"attachMovie","b6","b6",_config.number("src.s40.l171.n1"),{_x:_config.number("src.s40.l171.n2"),_y:_config.number("src.s40.l171.n3")});
   name1 = "小镁";
   xianjin1 = _config.number("src.s40.l173.n1");
   touzhi1 = _config.number("src.s40.l174.n1");
   jiangjin1 = _config.number("src.s40.l175.n1");
   shuilv1 = _config.number("src.s40.l176.n1");
   zuanshi1 = _config.number("src.s40.l177.n1");
   wuxing1 = _config.number("src.s40.l178.n1");
   yumao1 = _config.number("src.s40.l179.n1");
   dilei1 = _config.number("src.s40.l180.n1");
}
else if(ppp1 == "b7")
{
   _invoke(_root,"attachMovie","c7","renwu1",_config.number("src.s40.l184.n1"),{_x:_config.number("src.s40.l184.n2"),_y:_config.number("src.s40.l184.n3")});
   _invoke(_root,"attachMovie","b7","b7",_config.number("src.s40.l185.n1"),{_x:_config.number("src.s40.l185.n2"),_y:_config.number("src.s40.l185.n3")});
   name1 = "大宝";
   xianjin1 = _config.number("src.s40.l187.n1");
   touzhi1 = _config.number("src.s40.l188.n1");
   jiangjin1 = _config.number("src.s40.l189.n1");
   shuilv1 = _config.number("src.s40.l190.n1");
   zuanshi1 = _config.number("src.s40.l191.n1");
   wuxing1 = _config.number("src.s40.l192.n1");
   yumao1 = _config.number("src.s40.l193.n1");
   dilei1 = _config.number("src.s40.l194.n1");
}
if(ppp2 == "b1")
{
   _invoke(_root,"attachMovie","c1","renwu2",_config.number("src.s40.l198.n1"),{_x:_config.number("src.s40.l198.n2"),_y:_config.number("src.s40.l198.n3")});
   _invoke(_root,"attachMovie","b1","b1",_config.number("src.s40.l199.n1"),{_x:_config.number("src.s40.l199.n2"),_y:_config.number("src.s40.l199.n3")});
   name2 = "阿布";
   xianjin2 = _config.number("src.s40.l201.n1");
   touzhi2 = _config.number("src.s40.l202.n1");
   jiangjin2 = _config.number("src.s40.l203.n1");
   shuilv2 = _config.number("src.s40.l204.n1");
   zuanshi2 = _config.number("src.s40.l205.n1");
   wuxing2 = _config.number("src.s40.l206.n1");
   yumao2 = _config.number("src.s40.l207.n1");
   dilei2 = _config.number("src.s40.l208.n1");
}
else if(ppp2 == "b2")
{
   _invoke(_root,"attachMovie","c2","renwu2",_config.number("src.s40.l212.n1"),{_x:_config.number("src.s40.l212.n2"),_y:_config.number("src.s40.l212.n3")});
   _invoke(_root,"attachMovie","b2","b2",_config.number("src.s40.l213.n1"),{_x:_config.number("src.s40.l213.n2"),_y:_config.number("src.s40.l213.n3")});
   name2 = "忍者";
   xianjin2 = _config.number("src.s40.l215.n1");
   touzhi2 = _config.number("src.s40.l216.n1");
   jiangjin2 = _config.number("src.s40.l217.n1");
   shuilv2 = _config.number("src.s40.l218.n1");
   zuanshi2 = _config.number("src.s40.l219.n1");
   wuxing2 = _config.number("src.s40.l220.n1");
   yumao2 = _config.number("src.s40.l221.n1");
   dilei2 = _config.number("src.s40.l222.n1");
}
else if(ppp2 == "b3")
{
   _invoke(_root,"attachMovie","c3","renwu2",_config.number("src.s40.l226.n1"),{_x:_config.number("src.s40.l226.n2"),_y:_config.number("src.s40.l226.n3")});
   _invoke(_root,"attachMovie","b3","b3",_config.number("src.s40.l227.n1"),{_x:_config.number("src.s40.l227.n2"),_y:_config.number("src.s40.l227.n3")});
   name2 = "丽丽";
   xianjin2 = _config.number("src.s40.l229.n1");
   touzhi2 = _config.number("src.s40.l230.n1");
   jiangjin2 = _config.number("src.s40.l231.n1");
   shuilv2 = _config.number("src.s40.l232.n1");
   zuanshi2 = _config.number("src.s40.l233.n1");
   wuxing2 = _config.number("src.s40.l234.n1");
   yumao2 = _config.number("src.s40.l235.n1");
   dilei2 = _config.number("src.s40.l236.n1");
}
else if(ppp2 == "b4")
{
   _invoke(_root,"attachMovie","c4","renwu2",_config.number("src.s40.l240.n1"),{_x:_config.number("src.s40.l240.n2"),_y:_config.number("src.s40.l240.n3")});
   _invoke(_root,"attachMovie","b4","b4",_config.number("src.s40.l241.n1"),{_x:_config.number("src.s40.l241.n2"),_y:_config.number("src.s40.l241.n3")});
   name2 = "小强";
   xianjin2 = _config.number("src.s40.l243.n1");
   touzhi2 = _config.number("src.s40.l244.n1");
   jiangjin2 = _config.number("src.s40.l245.n1");
   shuilv2 = _config.number("src.s40.l246.n1");
   zuanshi2 = _config.number("src.s40.l247.n1");
   wuxing2 = _config.number("src.s40.l248.n1");
   yumao2 = _config.number("src.s40.l249.n1");
   dilei2 = _config.number("src.s40.l250.n1");
}
else if(ppp2 == "b5")
{
   _invoke(_root,"attachMovie","c5","renwu2",_config.number("src.s40.l254.n1"),{_x:_config.number("src.s40.l254.n2"),_y:_config.number("src.s40.l254.n3")});
   _invoke(_root,"attachMovie","b5","b5",_config.number("src.s40.l255.n1"),{_x:_config.number("src.s40.l255.n2"),_y:_config.number("src.s40.l255.n3")});
   name2 = "咚咚";
   xianjin2 = _config.number("src.s40.l257.n1");
   touzhi2 = _config.number("src.s40.l258.n1");
   jiangjin2 = _config.number("src.s40.l259.n1");
   shuilv2 = _config.number("src.s40.l260.n1");
   zuanshi2 = _config.number("src.s40.l261.n1");
   wuxing2 = _config.number("src.s40.l262.n1");
   yumao2 = _config.number("src.s40.l263.n1");
   dilei2 = _config.number("src.s40.l264.n1");
}
else if(ppp2 == "b6")
{
   _invoke(_root,"attachMovie","c6","renwu2",_config.number("src.s40.l268.n1"),{_x:_config.number("src.s40.l268.n2"),_y:_config.number("src.s40.l268.n3")});
   _invoke(_root,"attachMovie","b6","b6",_config.number("src.s40.l269.n1"),{_x:_config.number("src.s40.l269.n2"),_y:_config.number("src.s40.l269.n3")});
   name2 = "小镁";
   xianjin2 = _config.number("src.s40.l271.n1");
   touzhi2 = _config.number("src.s40.l272.n1");
   jiangjin2 = _config.number("src.s40.l273.n1");
   shuilv2 = _config.number("src.s40.l274.n1");
   zuanshi2 = _config.number("src.s40.l275.n1");
   wuxing2 = _config.number("src.s40.l276.n1");
   yumao2 = _config.number("src.s40.l277.n1");
   dilei2 = _config.number("src.s40.l278.n1");
}
else if(ppp2 == "b7")
{
   _invoke(_root,"attachMovie","c7","renwu2",_config.number("src.s40.l282.n1"),{_x:_config.number("src.s40.l282.n2"),_y:_config.number("src.s40.l282.n3")});
   _invoke(_root,"attachMovie","b7","b7",_config.number("src.s40.l283.n1"),{_x:_config.number("src.s40.l283.n2"),_y:_config.number("src.s40.l283.n3")});
   name2 = "大宝";
   xianjin2 = _config.number("src.s40.l285.n1");
   touzhi2 = _config.number("src.s40.l286.n1");
   jiangjin2 = _config.number("src.s40.l287.n1");
   shuilv2 = _config.number("src.s40.l288.n1");
   zuanshi2 = _config.number("src.s40.l289.n1");
   wuxing2 = _config.number("src.s40.l290.n1");
   yumao2 = _config.number("src.s40.l291.n1");
   dilei2 = _config.number("src.s40.l292.n1");
}
ss = new Sound();
_invoke(ss,"attachSound","bei2");
_invoke(ss,"start",_config.number("src.s40.l296.n1"),_config.number("src.s40.l296.n2"));

} },
// frame_2/PlaceObject2_137_f4_72/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   if(Key.getCode() == _config.number("src.s41.l2.n1") || Key.getCode() == _config.number("src.s41.l2.n2"))
   {
      _invoke(_root.ss,"stop",);
   }
   else if(Key.getCode() == _config.number("src.s41.l6.n1") || Key.getCode() == _config.number("src.s41.l6.n2"))
   {
      _invoke(_root.ss,"stop",);
      _invoke(_root.ss,"attachSound","bei2");
      _invoke(_root.ss,"start",_config.number("src.s41.l10.n1"),_config.number("src.s41.l10.n2"));
   }
   else if(Key.getCode() == _config.number("src.s41.l12.n1") || Key.getCode() == _config.number("src.s41.l12.n2"))
   {
      _invoke(_root.ss,"stop",);
      _invoke(_root.ss,"attachSound","bei3");
      _invoke(_root.ss,"start",_config.number("src.s41.l16.n1"),_config.number("src.s41.l16.n2"));
   }

} },
// frame_2/PlaceObject2_206_1/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   xingzou = function xingzou()
   {
      ss = new Sound();
      _invoke(ss,"attachSound","tiao.wav");
      _invoke(ss,"start",);
      if(_root.renwu1._y < _config.number("src.s42.l7.n1") && _root.renwu1._x < _config.number("src.s42.l7.n2"))
      {
         _root.renwu1._x += _config.number("src.s42.l9.n1");
      }
      else if(_root.renwu1._x > _config.number("src.s42.l11.n1") && _root.renwu1._y < _config.number("src.s42.l11.n2"))
      {
         _root.renwu1._y += _config.number("src.s42.l13.n1");
      }
      else if(_root.renwu1._y > _config.number("src.s42.l15.n1") && _root.renwu1._x > _config.number("src.s42.l15.n2"))
      {
         _root.renwu1._x -= _config.number("src.s42.l17.n1");
      }
      else if(_root.renwu1._x < _config.number("src.s42.l19.n1") && _root.renwu1._y > _config.number("src.s42.l19.n2"))
      {
         _root.renwu1._y -= _config.number("src.s42.l21.n1");
      }
      p--;
      if(_root.renwu1._y < _config.number("src.s42.l24.n1") && _root.renwu1._x > _config.number("src.s42.l24.n2") && _root.renwu1._x < _config.number("src.s42.l24.n3"))
      {
         _root.wenben = "经过银行奖励" + _root.jiangjin1 + "元";
         _root.xianjin1 += _root.jiangjin1;
      }
      if(p == _config.number("src.s42.l29.n1"))
      {
         if(_root.renwu1._y < _config.number("src.s42.l31.n1") && _root.renwu1._x > _config.number("src.s42.l31.n2") && _root.renwu1._x < _config.number("src.s42.l31.n3"))
         {
            _root.weizhi = _config.number("src.s42.l33.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l35.n1") && _root.renwu1._x > _config.number("src.s42.l35.n2") && _root.renwu1._x < _config.number("src.s42.l35.n3"))
         {
            _root.weizhi = _config.number("src.s42.l37.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l39.n1") && _root.renwu1._x > _config.number("src.s42.l39.n2") && _root.renwu1._x < _config.number("src.s42.l39.n3"))
         {
            _root.weizhi = _config.number("src.s42.l41.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l43.n1") && _root.renwu1._x > _config.number("src.s42.l43.n2") && _root.renwu1._x < _config.number("src.s42.l43.n3"))
         {
            _root.weizhi = _config.number("src.s42.l45.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l47.n1") && _root.renwu1._x > _config.number("src.s42.l47.n2") && _root.renwu1._x < _config.number("src.s42.l47.n3"))
         {
            _root.weizhi = _config.number("src.s42.l49.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l51.n1") && _root.renwu1._y > _config.number("src.s42.l51.n2") && _root.renwu1._x > _config.number("src.s42.l51.n3"))
         {
            _root.weizhi = _config.number("src.s42.l53.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l55.n1") && _root.renwu1._y > _config.number("src.s42.l55.n2") && _root.renwu1._x > _config.number("src.s42.l55.n3"))
         {
            _root.weizhi = _config.number("src.s42.l57.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l59.n1") && _root.renwu1._y > _config.number("src.s42.l59.n2") && _root.renwu1._x > _config.number("src.s42.l59.n3"))
         {
            _root.weizhi = _config.number("src.s42.l61.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l63.n1") && _root.renwu1._y > _config.number("src.s42.l63.n2") && _root.renwu1._x > _config.number("src.s42.l63.n3"))
         {
            _root.weizhi = _config.number("src.s42.l65.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l67.n1") && _root.renwu1._y > _config.number("src.s42.l67.n2") && _root.renwu1._x > _config.number("src.s42.l67.n3"))
         {
            _root.weizhi = _config.number("src.s42.l69.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l71.n1") && _root.renwu1._y > _config.number("src.s42.l71.n2") && _root.renwu1._x > _config.number("src.s42.l71.n3"))
         {
            _root.weizhi = _config.number("src.s42.l73.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l75.n1") && _root.renwu1._x > _config.number("src.s42.l75.n2") && _root.renwu1._x < _config.number("src.s42.l75.n3"))
         {
            _root.weizhi = _config.number("src.s42.l77.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l79.n1") && _root.renwu1._x > _config.number("src.s42.l79.n2") && _root.renwu1._x < _config.number("src.s42.l79.n3"))
         {
            _root.weizhi = _config.number("src.s42.l81.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l83.n1") && _root.renwu1._x > _config.number("src.s42.l83.n2") && _root.renwu1._x < _config.number("src.s42.l83.n3"))
         {
            _root.weizhi = _config.number("src.s42.l85.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l87.n1") && _root.renwu1._x > _config.number("src.s42.l87.n2") && _root.renwu1._x < _config.number("src.s42.l87.n3"))
         {
            _root.weizhi = _config.number("src.s42.l89.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l91.n1") && _root.renwu1._x > _config.number("src.s42.l91.n2") && _root.renwu1._x < _config.number("src.s42.l91.n3"))
         {
            _root.weizhi = _config.number("src.s42.l93.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l95.n1") && _root.renwu1._x > _config.number("src.s42.l95.n2") && _root.renwu1._x < _config.number("src.s42.l95.n3"))
         {
            _root.weizhi = _config.number("src.s42.l97.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l99.n1") && _root.renwu1._x > _config.number("src.s42.l99.n2") && _root.renwu1._x < _config.number("src.s42.l99.n3"))
         {
            _root.weizhi = _config.number("src.s42.l101.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l103.n1") && _root.renwu1._x > _config.number("src.s42.l103.n2") && _root.renwu1._x < _config.number("src.s42.l103.n3"))
         {
            _root.weizhi = _config.number("src.s42.l105.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l107.n1") && _root.renwu1._x > _config.number("src.s42.l107.n2") && _root.renwu1._x < _config.number("src.s42.l107.n3"))
         {
            _root.weizhi = _config.number("src.s42.l109.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l111.n1") && _root.renwu1._y > _config.number("src.s42.l111.n2") && _root.renwu1._x < _config.number("src.s42.l111.n3"))
         {
            _root.weizhi = _config.number("src.s42.l113.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l115.n1") && _root.renwu1._y > _config.number("src.s42.l115.n2") && _root.renwu1._x < _config.number("src.s42.l115.n3"))
         {
            _root.weizhi = _config.number("src.s42.l117.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l119.n1") && _root.renwu1._y > _config.number("src.s42.l119.n2") && _root.renwu1._x < _config.number("src.s42.l119.n3"))
         {
            _root.weizhi = _config.number("src.s42.l121.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l123.n1") && _root.renwu1._y > _config.number("src.s42.l123.n2") && _root.renwu1._x < _config.number("src.s42.l123.n3"))
         {
            _root.weizhi = _config.number("src.s42.l125.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l127.n1") && _root.renwu1._y > _config.number("src.s42.l127.n2") && _root.renwu1._x < _config.number("src.s42.l127.n3"))
         {
            _root.weizhi = _config.number("src.s42.l129.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l131.n1") && _root.renwu1._y > _config.number("src.s42.l131.n2") && _root.renwu1._x < _config.number("src.s42.l131.n3"))
         {
            _root.weizhi = _config.number("src.s42.l133.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l135.n1") && _root.renwu1._x > _config.number("src.s42.l135.n2") && _root.renwu1._x < _config.number("src.s42.l135.n3"))
         {
            _root.weizhi = _config.number("src.s42.l137.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l139.n1") && _root.renwu1._x > _config.number("src.s42.l139.n2") && _root.renwu1._x < _config.number("src.s42.l139.n3"))
         {
            _root.weizhi = _config.number("src.s42.l141.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l143.n1") && _root.renwu1._x > _config.number("src.s42.l143.n2") && _root.renwu1._x < _config.number("src.s42.l143.n3"))
         {
            _root.weizhi = _config.number("src.s42.l145.n1");
         }
         else if(_root.renwu1._y < _config.number("src.s42.l147.n1") && _root.renwu1._x > _config.number("src.s42.l147.n2") && _root.renwu1._x < _config.number("src.s42.l147.n3"))
         {
            _root.weizhi = _config.number("src.s42.l149.n1");
         }
         else
         {
            _root.weizhi = _config.number("src.s42.l153.n1");
         }
         if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l155.n1") && _root.xianjin1 >= _root.xianjin[_root.weizhi] && _root.zuanshi1 >= _root.zuanshi[_root.weizhi] && _root.jibie[_root.weizhi] == _config.number("src.s42.l155.n2"))
         {
            _invoke(_root,"attachMovie","maidi","maidi",_config.number("src.s42.l157.n1"),{_x:_config.number("src.s42.l157.n2"),_y:_config.number("src.s42.l157.n3")});
            _root.tanchu = _config.number("src.s42.l158.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l160.n1") && _root.xianjin1 >= _config.number("rules.houseCash") && _root.jibie[_root.weizhi] == _config.number("src.s42.l160.n3"))
         {
            _invoke(_root,"attachMovie","jianfang","jianfang",_config.number("src.s42.l162.n1"),{_x:_config.number("src.s42.l162.n2"),_y:_config.number("src.s42.l162.n3")});
            _root.tanchu = _config.number("src.s42.l163.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l165.n1") && _root.wuxing1 >= _config.number("src.s42.l165.n2") && _root.jibie[_root.weizhi] == _config.number("src.s42.l165.n3"))
         {
            _invoke(_root,"attachMovie","shengji","shengji",_config.number("src.s42.l167.n1"),{_x:_config.number("src.s42.l167.n2"),_y:_config.number("src.s42.l167.n3")});
            _root.tanchu = _config.number("src.s42.l168.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l170.n1") && _root.wuxing1 >= _config.number("src.s42.l170.n2") && _root.jibie[_root.weizhi] == _config.number("src.s42.l170.n3"))
         {
            _invoke(_root,"attachMovie","bieshu","bieshu",_config.number("src.s42.l172.n1"),{_x:_config.number("src.s42.l172.n2"),_y:_config.number("src.s42.l172.n3")});
            _root.tanchu = _config.number("src.s42.l173.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l175.n1") && _root.xianjin1 < _config.number("rules.houseCash") && _root.jibie[_root.weizhi] == _config.number("src.s42.l175.n3") && _root.dilei1 > _config.number("src.s42.l175.n4"))
         {
            _invoke(_root,"attachMovie","fanglei","fanglei",_config.number("src.s42.l177.n1"),{_x:_config.number("src.s42.l177.n2"),_y:_config.number("src.s42.l177.n3")});
            _root.tanchu = _config.number("src.s42.l178.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l180.n1") && _root.jibie[_root.weizhi] == _config.number("src.s42.l180.n2") && _root.yumao1 == _config.number("src.s42.l180.n3") && _root.zhuyuan2 == _config.number("src.s42.l180.n4"))
         {
            _root.wenben = "请付" + _config.number("rules.rentHouse") + "元住宿费";
            _root.xianjin1 -= _config.number("rules.rentHouse");
            _root.xianjin2 += _config.number("rules.rentHouse") * (_config.number("src.s42.l184.n2") - _root.shuilv2 / _config.number("src.s42.l184.n3"));
            if(_root.xianjin1 + _root.touzhi1 < _config.number("src.s42.l185.n1"))
            {
               _invoke(ss,"stop",);
               _invoke(_root,"gotoAndPlay",_config.number("src.s42.l188.n1"));
            }
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l191.n1") && _root.jibie[_root.weizhi] == _config.number("src.s42.l191.n2") && _root.yumao1 == _config.number("src.s42.l191.n3") && _root.zhuyuan2 == _config.number("src.s42.l191.n4"))
         {
            _root.wenben = "请付" + _config.number("rules.rentTower") + "元住宿费";
            _root.xianjin1 -= _config.number("rules.rentTower");
            _root.xianjin2 += _config.number("rules.rentTower") * (_config.number("src.s42.l195.n2") - _root.shuilv2 / _config.number("src.s42.l195.n3"));
            if(_root.xianjin1 + _root.touzhi1 < _config.number("src.s42.l196.n1"))
            {
               _invoke(ss,"stop",);
               _invoke(_root,"gotoAndPlay",_config.number("src.s42.l199.n1"));
            }
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l202.n1") && _root.jibie[_root.weizhi] == _config.number("src.s42.l202.n2") && _root.zhuyuan2 == _config.number("src.s42.l202.n3"))
         {
            _invoke(_root,"attachMovie","lunzi","lunzi",_config.number("src.s42.l204.n1"),{_x:_config.number("src.s42.l204.n2"),_y:_config.number("src.s42.l204.n3")});
            _root.tanchu = _config.number("src.s42.l205.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l207.n1") && (_root.jibie[_root.weizhi] == _config.number("src.s42.l207.n2") || _root.jibie[_root.weizhi] == _config.number("src.s42.l207.n3")) && _root.yumao1 > _config.number("src.s42.l207.n4") && _root.zhuyuan2 == _config.number("src.s42.l207.n5"))
         {
            _invoke(_root,"attachMovie","baohu","baohu",_config.number("src.s42.l209.n1"),{_x:_config.number("src.s42.l209.n2"),_y:_config.number("src.s42.l209.n3")});
            _root.tanchu = _config.number("src.s42.l210.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l212.n1") && _root.jibie[_root.weizhi] == _config.number("src.s42.l212.n2") && _root.yumao1 == _config.number("src.s42.l212.n3"))
         {
            _root.zhuyuan1 = _config.number("src.s42.l214.n1") + random(_config.number("src.s42.l214.n2"));
            if(_root.zhuyuan1 == _config.number("src.s42.l215.n1"))
            {
               _root.wenben = "小毛病，住院3天";
            }
            else if(_root.zhuyuan1 == _config.number("src.s42.l219.n1"))
            {
               _root.wenben = "摔了一交，住院4天";
            }
            else if(_root.zhuyuan1 == _config.number("src.s42.l223.n1"))
            {
               _root.wenben = "掉进下水道，住院5天";
            }
            else if(_root.zhuyuan1 == _config.number("src.s42.l227.n1"))
            {
               _root.wenben = "遭人殴打，住院6天";
            }
            else if(_root.zhuyuan1 == _config.number("src.s42.l231.n1"))
            {
               _root.wenben = "天外来砖，住院7天";
            }
            else if(_root.zhuyuan1 == _config.number("src.s42.l235.n1"))
            {
               _root.wenben = "出车祸，住院8天";
            }
            else if(_root.zhuyuan1 == _config.number("src.s42.l239.n1"))
            {
               _root.wenben = "炸成残废，住院9天";
            }
            ss = new Sound();
            _invoke(ss,"attachSound","zha");
            _invoke(ss,"start",);
            x = int(_root.renwu1._x / _config.number("src.s42.l246.n1")) * _config.number("src.s42.l246.n2") + _config.number("src.s42.l246.n3");
            y = int(_root.renwu1._y / _config.number("src.s42.l247.n1")) * _config.number("src.s42.l247.n2") + _config.number("src.s42.l247.n3");
            while(_root.renwu1._x > _config.number("src.s42.l248.n1"))
            {
               _root.renwu1._x -= _config.number("src.s42.l250.n1");
            }
            while(_root.renwu1._y < _config.number("src.s42.l252.n1"))
            {
               _root.renwu1._y += _config.number("src.s42.l254.n1");
            }
            _root.renwu1._x += _config.number("src.s42.l256.n1");
            _root.jibie[_root.weizhi] = _config.number("src.s42.l257.n1");
            _invoke(_root,"attachMovie","baozha","baozha",_config.number("src.s42.l258.n1") + _root.weizhi,{_x:x,_y:y});
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l260.n1") && (_root.jibie[_root.weizhi] == _config.number("src.s42.l260.n2") || _root.jibie[_root.weizhi] == _config.number("src.s42.l260.n3") || _root.jibie[_root.weizhi] == _config.number("src.s42.l260.n4")) && _root.zhuyuan2 > _config.number("src.s42.l260.n5"))
         {
            _root.wenben = _root.name2 + "在医院，免费住店";
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l264.n1") && _root.jibie[_root.weizhi] == _config.number("src.s42.l264.n2") && _root.zhuyuan2 > _config.number("src.s42.l264.n3"))
         {
            _root.wenben = _root.name2 + "在住院，逃过一劫";
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s42.l268.n1") && _root.jibie[_root.weizhi] == _config.number("src.s42.l268.n2") && _root.zhuyuan2 == _config.number("src.s42.l268.n3") && _root.yumao1 > _config.number("src.s42.l268.n4"))
         {
            _invoke(_root,"attachMovie","baohulei","baohulei",_config.number("src.s42.l270.n1"),{_x:_config.number("src.s42.l270.n2"),_y:_config.number("src.s42.l270.n3")});
            _root.tanchu = _config.number("src.s42.l271.n1");
         }
         else if((_root.renwu1._y < _config.number("src.s42.l273.n1") || _root.renwu1._y > _config.number("src.s42.l273.n2")) && (_root.renwu1._x < _config.number("src.s42.l273.n3") || _root.renwu1._x > _config.number("src.s42.l273.n4")))
         {
            _invoke(_root,"attachMovie","chaoshi","chaoshi",_config.number("src.s42.l275.n1"),{_x:_config.number("src.s42.l275.n2"),_y:_config.number("src.s42.l275.n3")});
            _root.tanchu = _config.number("src.s42.l276.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l278.n1") && _root.renwu1._y < _config.number("src.s42.l278.n2") && _root.renwu1._x > _config.number("src.s42.l278.n3"))
         {
            _invoke(_root,"attachMovie","ducheng","ducheng",_config.number("src.s42.l280.n1"),{_x:_config.number("src.s42.l280.n2"),_y:_config.number("src.s42.l280.n3")});
            _root.tanchu = _config.number("src.s42.l281.n1");
         }
         else if(_root.renwu1._y > _config.number("src.s42.l283.n1") && _root.renwu1._y < _config.number("src.s42.l283.n2") && _root.renwu1._x < _config.number("src.s42.l283.n3"))
         {
            _invoke(_root,"attachMovie","mingyun","mingyun",_config.number("src.s42.l285.n1"),{_x:_config.number("src.s42.l285.n2"),_y:_config.number("src.s42.l285.n3")});
            _root.tanchu = _config.number("src.s42.l286.n1");
         }
         else if(_root.renwu1._x > _config.number("src.s42.l288.n1") && _root.renwu1._x < _config.number("src.s42.l288.n2") && _root.renwu1._y > _config.number("src.s42.l288.n3") && _root.zhuyuan2 == _config.number("src.s42.l288.n4"))
         {
            _root.zhuyuan1 = _config.number("src.s42.l290.n1");
            _root.wenben = "住院1天";
         }
         else if(_root.renwu1._x > _config.number("src.s42.l293.n1") && _root.renwu1._x < _config.number("src.s42.l293.n2") && _root.renwu1._y > _config.number("src.s42.l293.n3") && _root.zhuyuan2 > _config.number("src.s42.l293.n4"))
         {
            _root.wenben = "医院没有空位了";
         }
         if(_root.zhuyuan2 > _config.number("src.s42.l297.n1"))
         {
            _root.zhuyuan2 = _root.zhuyuan2 - _config.number("src.s42.l299.n1");
            if(_root.tanchu == _config.number("src.s42.l300.n1"))
            {
               _root.xingqi = _config.number("src.s42.l302.n1");
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s42.l303.n1"));
            }
            if(_root.zhuyuan2 == _config.number("src.s42.l305.n1") && _root.tanchu == _config.number("src.s42.l305.n2"))
            {
               _root.wenben = _root.name2 + "出院";
               _root.shui = _config.number("src.s42.l308.n1");
               _root.xingqi = _config.number("src.s42.l309.n1");
               _root.pp = "2P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s42.l311.n1"));
            }
         }
         else if(_root.tanchu == _config.number("src.s42.l314.n1"))
         {
            _root.shui = _config.number("src.s42.l316.n1");
            _root.xingqi = _config.number("src.s42.l317.n1");
            _root.pp = "2P";
            _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s42.l319.n1"));
         }
         clearInterval(mm);
      }
   }
   if(_root.xingqi == _config.number("src.s42.l324.n1") && Key.getCode() == _config.number("src.s42.l324.n2"))
   {
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s42.l326.n1"),{_x:_config.number("src.s42.l326.n2"),_y:_config.number("src.s42.l326.n3")});
      _root.tanchu = _config.number("src.s42.l327.n1");
      p = random(_config.number("rules.diceFaces")) + _config.number("src.s42.l328.n2");
      _root.xingqi = _config.number("src.s42.l329.n1");
      _invoke(_root.shaizi,"gotoAndStop",p);
      _root.wenben = "前进";
      mm = setInterval(xingzou,_config.number("rules.stepMilliseconds"));
   }

} },
// frame_2/PlaceObject2_206_3/CLIPACTIONRECORD onClipEvent(keyDown).as
function(__scope) { with (__scope) {

   xingzou = function xingzou()
   {
      ss = new Sound();
      _invoke(ss,"attachSound","tiao.wav");
      _invoke(ss,"start",);
      if(_root.renwu2._y < _config.number("src.s43.l7.n1") && _root.renwu2._x < _config.number("src.s43.l7.n2"))
      {
         _root.renwu2._x += _config.number("src.s43.l9.n1");
      }
      else if(_root.renwu2._x > _config.number("src.s43.l11.n1") && _root.renwu2._y < _config.number("src.s43.l11.n2"))
      {
         _root.renwu2._y += _config.number("src.s43.l13.n1");
      }
      else if(_root.renwu2._y > _config.number("src.s43.l15.n1") && _root.renwu2._x > _config.number("src.s43.l15.n2"))
      {
         _root.renwu2._x -= _config.number("src.s43.l17.n1");
      }
      else if(_root.renwu2._x < _config.number("src.s43.l19.n1") && _root.renwu2._y > _config.number("src.s43.l19.n2"))
      {
         _root.renwu2._y -= _config.number("src.s43.l21.n1");
      }
      p--;
      if(_root.renwu2._y < _config.number("src.s43.l24.n1") && _root.renwu2._x > _config.number("src.s43.l24.n2") && _root.renwu2._x < _config.number("src.s43.l24.n3"))
      {
         _root.wenben = "经过银行奖励" + _root.jiangjin2 + "元";
         _root.xianjin2 += _root.jiangjin2;
      }
      if(p == _config.number("src.s43.l29.n1"))
      {
         if(_root.renwu2._y < _config.number("src.s43.l31.n1") && _root.renwu2._x > _config.number("src.s43.l31.n2") && _root.renwu2._x < _config.number("src.s43.l31.n3"))
         {
            _root.weizhi = _config.number("src.s43.l33.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l35.n1") && _root.renwu2._x > _config.number("src.s43.l35.n2") && _root.renwu2._x < _config.number("src.s43.l35.n3"))
         {
            _root.weizhi = _config.number("src.s43.l37.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l39.n1") && _root.renwu2._x > _config.number("src.s43.l39.n2") && _root.renwu2._x < _config.number("src.s43.l39.n3"))
         {
            _root.weizhi = _config.number("src.s43.l41.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l43.n1") && _root.renwu2._x > _config.number("src.s43.l43.n2") && _root.renwu2._x < _config.number("src.s43.l43.n3"))
         {
            _root.weizhi = _config.number("src.s43.l45.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l47.n1") && _root.renwu2._x > _config.number("src.s43.l47.n2") && _root.renwu2._x < _config.number("src.s43.l47.n3"))
         {
            _root.weizhi = _config.number("src.s43.l49.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l51.n1") && _root.renwu2._y > _config.number("src.s43.l51.n2") && _root.renwu2._x > _config.number("src.s43.l51.n3"))
         {
            _root.weizhi = _config.number("src.s43.l53.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l55.n1") && _root.renwu2._y > _config.number("src.s43.l55.n2") && _root.renwu2._x > _config.number("src.s43.l55.n3"))
         {
            _root.weizhi = _config.number("src.s43.l57.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l59.n1") && _root.renwu2._y > _config.number("src.s43.l59.n2") && _root.renwu2._x > _config.number("src.s43.l59.n3"))
         {
            _root.weizhi = _config.number("src.s43.l61.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l63.n1") && _root.renwu2._y > _config.number("src.s43.l63.n2") && _root.renwu2._x > _config.number("src.s43.l63.n3"))
         {
            _root.weizhi = _config.number("src.s43.l65.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l67.n1") && _root.renwu2._y > _config.number("src.s43.l67.n2") && _root.renwu2._x > _config.number("src.s43.l67.n3"))
         {
            _root.weizhi = _config.number("src.s43.l69.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l71.n1") && _root.renwu2._y > _config.number("src.s43.l71.n2") && _root.renwu2._x > _config.number("src.s43.l71.n3"))
         {
            _root.weizhi = _config.number("src.s43.l73.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l75.n1") && _root.renwu2._x > _config.number("src.s43.l75.n2") && _root.renwu2._x < _config.number("src.s43.l75.n3"))
         {
            _root.weizhi = _config.number("src.s43.l77.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l79.n1") && _root.renwu2._x > _config.number("src.s43.l79.n2") && _root.renwu2._x < _config.number("src.s43.l79.n3"))
         {
            _root.weizhi = _config.number("src.s43.l81.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l83.n1") && _root.renwu2._x > _config.number("src.s43.l83.n2") && _root.renwu2._x < _config.number("src.s43.l83.n3"))
         {
            _root.weizhi = _config.number("src.s43.l85.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l87.n1") && _root.renwu2._x > _config.number("src.s43.l87.n2") && _root.renwu2._x < _config.number("src.s43.l87.n3"))
         {
            _root.weizhi = _config.number("src.s43.l89.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l91.n1") && _root.renwu2._x > _config.number("src.s43.l91.n2") && _root.renwu2._x < _config.number("src.s43.l91.n3"))
         {
            _root.weizhi = _config.number("src.s43.l93.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l95.n1") && _root.renwu2._x > _config.number("src.s43.l95.n2") && _root.renwu2._x < _config.number("src.s43.l95.n3"))
         {
            _root.weizhi = _config.number("src.s43.l97.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l99.n1") && _root.renwu2._x > _config.number("src.s43.l99.n2") && _root.renwu2._x < _config.number("src.s43.l99.n3"))
         {
            _root.weizhi = _config.number("src.s43.l101.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l103.n1") && _root.renwu2._x > _config.number("src.s43.l103.n2") && _root.renwu2._x < _config.number("src.s43.l103.n3"))
         {
            _root.weizhi = _config.number("src.s43.l105.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l107.n1") && _root.renwu2._x > _config.number("src.s43.l107.n2") && _root.renwu2._x < _config.number("src.s43.l107.n3"))
         {
            _root.weizhi = _config.number("src.s43.l109.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l111.n1") && _root.renwu2._y > _config.number("src.s43.l111.n2") && _root.renwu2._x < _config.number("src.s43.l111.n3"))
         {
            _root.weizhi = _config.number("src.s43.l113.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l115.n1") && _root.renwu2._y > _config.number("src.s43.l115.n2") && _root.renwu2._x < _config.number("src.s43.l115.n3"))
         {
            _root.weizhi = _config.number("src.s43.l117.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l119.n1") && _root.renwu2._y > _config.number("src.s43.l119.n2") && _root.renwu2._x < _config.number("src.s43.l119.n3"))
         {
            _root.weizhi = _config.number("src.s43.l121.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l123.n1") && _root.renwu2._y > _config.number("src.s43.l123.n2") && _root.renwu2._x < _config.number("src.s43.l123.n3"))
         {
            _root.weizhi = _config.number("src.s43.l125.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l127.n1") && _root.renwu2._y > _config.number("src.s43.l127.n2") && _root.renwu2._x < _config.number("src.s43.l127.n3"))
         {
            _root.weizhi = _config.number("src.s43.l129.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l131.n1") && _root.renwu2._y > _config.number("src.s43.l131.n2") && _root.renwu2._x < _config.number("src.s43.l131.n3"))
         {
            _root.weizhi = _config.number("src.s43.l133.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l135.n1") && _root.renwu2._x > _config.number("src.s43.l135.n2") && _root.renwu2._x < _config.number("src.s43.l135.n3"))
         {
            _root.weizhi = _config.number("src.s43.l137.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l139.n1") && _root.renwu2._x > _config.number("src.s43.l139.n2") && _root.renwu2._x < _config.number("src.s43.l139.n3"))
         {
            _root.weizhi = _config.number("src.s43.l141.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l143.n1") && _root.renwu2._x > _config.number("src.s43.l143.n2") && _root.renwu2._x < _config.number("src.s43.l143.n3"))
         {
            _root.weizhi = _config.number("src.s43.l145.n1");
         }
         else if(_root.renwu2._y < _config.number("src.s43.l147.n1") && _root.renwu2._x > _config.number("src.s43.l147.n2") && _root.renwu2._x < _config.number("src.s43.l147.n3"))
         {
            _root.weizhi = _config.number("src.s43.l149.n1");
         }
         else
         {
            _root.weizhi = _config.number("src.s43.l153.n1");
         }
         if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l155.n1") && _root.xianjin2 >= _root.xianjin[_root.weizhi] && _root.zuanshi2 >= _root.zuanshi[_root.weizhi] && _root.jibie[_root.weizhi] == _config.number("src.s43.l155.n2"))
         {
            _invoke(_root,"attachMovie","maidi","maidi",_config.number("src.s43.l157.n1"),{_x:_config.number("src.s43.l157.n2"),_y:_config.number("src.s43.l157.n3")});
            _root.tanchu = _config.number("src.s43.l158.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l160.n1") && _root.xianjin2 >= _config.number("rules.houseCash") && _root.jibie[_root.weizhi] == _config.number("src.s43.l160.n3"))
         {
            _invoke(_root,"attachMovie","jianfang","jianfang",_config.number("src.s43.l162.n1"),{_x:_config.number("src.s43.l162.n2"),_y:_config.number("src.s43.l162.n3")});
            _root.tanchu = _config.number("src.s43.l163.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l165.n1") && _root.wuxing2 >= _config.number("src.s43.l165.n2") && _root.jibie[_root.weizhi] == _config.number("src.s43.l165.n3"))
         {
            _invoke(_root,"attachMovie","shengji","shengji",_config.number("src.s43.l167.n1"),{_x:_config.number("src.s43.l167.n2"),_y:_config.number("src.s43.l167.n3")});
            _root.tanchu = _config.number("src.s43.l168.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l170.n1") && _root.wuxing2 >= _config.number("src.s43.l170.n2") && _root.jibie[_root.weizhi] == _config.number("src.s43.l170.n3"))
         {
            _invoke(_root,"attachMovie","bieshu","bieshu",_config.number("src.s43.l172.n1"),{_x:_config.number("src.s43.l172.n2"),_y:_config.number("src.s43.l172.n3")});
            _root.tanchu = _config.number("src.s43.l173.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l175.n1") && _root.xianjin2 < _config.number("rules.houseCash") && _root.jibie[_root.weizhi] == _config.number("src.s43.l175.n3") && _root.dilei2 > _config.number("src.s43.l175.n4"))
         {
            _invoke(_root,"attachMovie","fanglei","fanglei",_config.number("src.s43.l177.n1"),{_x:_config.number("src.s43.l177.n2"),_y:_config.number("src.s43.l177.n3")});
            _root.tanchu = _config.number("src.s43.l178.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l180.n1") && _root.jibie[_root.weizhi] == _config.number("src.s43.l180.n2") && _root.yumao2 == _config.number("src.s43.l180.n3") && _root.zhuyuan1 == _config.number("src.s43.l180.n4"))
         {
            _root.wenben = "请付" + _config.number("rules.rentHouse") + "元住宿费";
            _root.xianjin2 -= _config.number("rules.rentHouse");
            _root.xianjin1 += _config.number("rules.rentHouse") * (_config.number("src.s43.l184.n2") - _root.shuilv1 / _config.number("src.s43.l184.n3"));
            if(_root.xianjin2 + _root.touzhi2 < _config.number("src.s43.l185.n1"))
            {
               _invoke(ss,"stop",);
               _invoke(_root,"gotoAndPlay",_config.number("src.s43.l188.n1"));
            }
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l191.n1") && _root.jibie[_root.weizhi] == _config.number("src.s43.l191.n2") && _root.yumao2 == _config.number("src.s43.l191.n3") && _root.zhuyuan1 == _config.number("src.s43.l191.n4"))
         {
            _root.wenben = "请付" + _config.number("rules.rentTower") + "元住宿费";
            _root.xianjin2 -= _config.number("rules.rentTower");
            _root.xianjin1 += _config.number("rules.rentTower") * (_config.number("src.s43.l195.n2") - _root.shuilv1 / _config.number("src.s43.l195.n3"));
            if(_root.xianjin2 + _root.touzhi2 < _config.number("src.s43.l196.n1"))
            {
               _invoke(ss,"stop",);
               _invoke(_root,"gotoAndPlay",_config.number("src.s43.l199.n1"));
            }
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l202.n1") && _root.jibie[_root.weizhi] == _config.number("src.s43.l202.n2") && _root.zhuyuan1 == _config.number("src.s43.l202.n3"))
         {
            _invoke(_root,"attachMovie","lunzi","lunzi",_config.number("src.s43.l204.n1"),{_x:_config.number("src.s43.l204.n2"),_y:_config.number("src.s43.l204.n3")});
            _root.tanchu = _config.number("src.s43.l205.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l207.n1") && (_root.jibie[_root.weizhi] == _config.number("src.s43.l207.n2") || _root.jibie[_root.weizhi] == _config.number("src.s43.l207.n3")) && _root.yumao2 > _config.number("src.s43.l207.n4") && _root.zhuyuan1 == _config.number("src.s43.l207.n5"))
         {
            _invoke(_root,"attachMovie","baohu","baohu",_config.number("src.s43.l209.n1"),{_x:_config.number("src.s43.l209.n2"),_y:_config.number("src.s43.l209.n3")});
            _root.tanchu = _config.number("src.s43.l210.n1");
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l212.n1") && _root.jibie[_root.weizhi] == _config.number("src.s43.l212.n2") && _root.yumao2 == _config.number("src.s43.l212.n3"))
         {
            _root.zhuyuan2 = _config.number("src.s43.l214.n1") + random(_config.number("src.s43.l214.n2"));
            if(_root.zhuyuan2 == _config.number("src.s43.l215.n1"))
            {
               _root.wenben = "小毛病，住院3天";
            }
            else if(_root.zhuyuan2 == _config.number("src.s43.l219.n1"))
            {
               _root.wenben = "摔了一交，住院4天";
            }
            else if(_root.zhuyuan2 == _config.number("src.s43.l223.n1"))
            {
               _root.wenben = "掉进下水道，住院5天";
            }
            else if(_root.zhuyuan2 == _config.number("src.s43.l227.n1"))
            {
               _root.wenben = "遭人殴打，住院6天";
            }
            else if(_root.zhuyuan2 == _config.number("src.s43.l231.n1"))
            {
               _root.wenben = "天外来砖，住院7天";
            }
            else if(_root.zhuyuan2 == _config.number("src.s43.l235.n1"))
            {
               _root.wenben = "出车祸，住院8天";
            }
            else if(_root.zhuyuan2 == _config.number("src.s43.l239.n1"))
            {
               _root.wenben = "炸成残废，住院9天";
            }
            ss = new Sound();
            _invoke(ss,"attachSound","zha");
            _invoke(ss,"start",);
            x = int(_root.renwu2._x / _config.number("src.s43.l246.n1")) * _config.number("src.s43.l246.n2") + _config.number("src.s43.l246.n3");
            y = int(_root.renwu2._y / _config.number("src.s43.l247.n1")) * _config.number("src.s43.l247.n2") + _config.number("src.s43.l247.n3");
            while(_root.renwu2._x > _config.number("src.s43.l248.n1"))
            {
               _root.renwu2._x -= _config.number("src.s43.l250.n1");
            }
            while(_root.renwu2._y < _config.number("src.s43.l252.n1"))
            {
               _root.renwu2._y += _config.number("src.s43.l254.n1");
            }
            _root.renwu2._x += _config.number("src.s43.l256.n1");
            _root.jibie[_root.weizhi] = _config.number("src.s43.l257.n1");
            _invoke(_root,"attachMovie","baozha","baozha",_config.number("src.s43.l258.n1") + _root.weizhi,{_x:x,_y:y});
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l260.n1") && (_root.jibie[_root.weizhi] == _config.number("src.s43.l260.n2") || _root.jibie[_root.weizhi] == _config.number("src.s43.l260.n3") || _root.jibie[_root.weizhi] == _config.number("src.s43.l260.n4")) && _root.zhuyuan1 > _config.number("src.s43.l260.n5"))
         {
            _root.wenben = _root.name1 + "在医院，免费住店";
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l264.n1") && _root.jibie[_root.weizhi] == _config.number("src.s43.l264.n2") && _root.zhuyuan1 > _config.number("src.s43.l264.n3"))
         {
            _root.wenben = _root.name1 + "在住院，逃过一劫";
         }
         else if(_root.shuyu[_root.weizhi] == _config.number("src.s43.l268.n1") && _root.jibie[_root.weizhi] == _config.number("src.s43.l268.n2") && _root.zhuyuan1 == _config.number("src.s43.l268.n3") && _root.yumao2 > _config.number("src.s43.l268.n4"))
         {
            _invoke(_root,"attachMovie","baohulei","baohulei",_config.number("src.s43.l270.n1"),{_x:_config.number("src.s43.l270.n2"),_y:_config.number("src.s43.l270.n3")});
            _root.tanchu = _config.number("src.s43.l271.n1");
         }
         else if((_root.renwu2._y < _config.number("src.s43.l273.n1") || _root.renwu2._y > _config.number("src.s43.l273.n2")) && (_root.renwu2._x < _config.number("src.s43.l273.n3") || _root.renwu2._x > _config.number("src.s43.l273.n4")))
         {
            _invoke(_root,"attachMovie","chaoshi","chaoshi",_config.number("src.s43.l275.n1"),{_x:_config.number("src.s43.l275.n2"),_y:_config.number("src.s43.l275.n3")});
            _root.tanchu = _config.number("src.s43.l276.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l278.n1") && _root.renwu2._y < _config.number("src.s43.l278.n2") && _root.renwu2._x > _config.number("src.s43.l278.n3"))
         {
            _invoke(_root,"attachMovie","ducheng","ducheng",_config.number("src.s43.l280.n1"),{_x:_config.number("src.s43.l280.n2"),_y:_config.number("src.s43.l280.n3")});
            _root.tanchu = _config.number("src.s43.l281.n1");
         }
         else if(_root.renwu2._y > _config.number("src.s43.l283.n1") && _root.renwu2._y < _config.number("src.s43.l283.n2") && _root.renwu2._x < _config.number("src.s43.l283.n3"))
         {
            _invoke(_root,"attachMovie","mingyun","mingyun",_config.number("src.s43.l285.n1"),{_x:_config.number("src.s43.l285.n2"),_y:_config.number("src.s43.l285.n3")});
            _root.tanchu = _config.number("src.s43.l286.n1");
         }
         else if(_root.renwu2._x > _config.number("src.s43.l288.n1") && _root.renwu2._x < _config.number("src.s43.l288.n2") && _root.renwu2._y > _config.number("src.s43.l288.n3") && _root.zhuyuan1 == _config.number("src.s43.l288.n4"))
         {
            _root.zhuyuan2 = _config.number("src.s43.l290.n1");
            _root.wenben = "住院1天";
         }
         else if(_root.renwu2._x > _config.number("src.s43.l293.n1") && _root.renwu2._x < _config.number("src.s43.l293.n2") && _root.renwu2._y > _config.number("src.s43.l293.n3") && _root.zhuyuan1 > _config.number("src.s43.l293.n4"))
         {
            _root.wenben = "医院没有空位了";
         }
         if(_root.zhuyuan1 > _config.number("src.s43.l297.n1"))
         {
            _root.zhuyuan1 = _root.zhuyuan1 - _config.number("src.s43.l299.n1");
            if(_root.tanchu == _config.number("src.s43.l300.n1"))
            {
               _root.xingqi = _config.number("src.s43.l302.n1");
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s43.l303.n1"));
            }
            if(_root.zhuyuan1 == _config.number("src.s43.l305.n1") && _root.tanchu == _config.number("src.s43.l305.n2"))
            {
               _root.wenben = _root.name1 + "出院";
               _root.shui = _config.number("src.s43.l308.n1");
               _root.xingqi = _config.number("src.s43.l309.n1");
               _root.pp = "1P";
               _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s43.l311.n1"));
            }
         }
         else if(_root.tanchu == _config.number("src.s43.l314.n1"))
         {
            _root.shui = _config.number("src.s43.l316.n1");
            _root.xingqi = _config.number("src.s43.l317.n1");
            _root.pp = "1P";
            _invoke(_root.shaizi,"gotoAndPlay",_config.number("src.s43.l319.n1"));
         }
         clearInterval(mm);
      }
   }
   if(_root.xingqi == _config.number("src.s43.l324.n1") && Key.getCode() == _config.number("src.s43.l324.n2"))
   {
      _invoke(_root,"attachMovie","tt","tt",_config.number("src.s43.l326.n1"),{_x:_config.number("src.s43.l326.n2"),_y:_config.number("src.s43.l326.n3")});
      _root.tanchu = _config.number("src.s43.l327.n1");
      p = random(_config.number("rules.diceFaces")) + _config.number("src.s43.l328.n2");
      _root.xingqi = _config.number("src.s43.l329.n1");
      _invoke(_root.shaizi,"gotoAndStop",p);
      _root.wenben = "前进";
      mm = setInterval(xingzou,_config.number("rules.stepMilliseconds"));
   }

} },
// frame_3/DoAction.as
function(__scope) { with (__scope) {
stop();
shijian = yongshi;
i = _config.number("src.s44.l3.n1");
while(i < _config.number("src.s44.l4.n1"))
{
   _invoke(_root,"attachMovie","tt","tt",i,{_x:_config.number("src.s44.l6.n1"),_y:_config.number("src.s44.l6.n2")});
   i++;
}
if(_root.touzhi1 + _root.xianjin1 < _config.number("src.s44.l9.n1"))
{
   _invoke(_root,"attachMovie",ppp2,ppp2,_config.number("src.s44.l11.n1"),{_x:_config.number("src.s44.l11.n2"),_y:_config.number("src.s44.l11.n3"),_width:_config.number("src.s44.l11.n4"),_height:_config.number("src.s44.l11.n5")});
   jieguo = "胜利者是" + name2;
}
else if(_root.touzhi2 + _root.xianjin2 < _config.number("src.s44.l14.n1"))
{
   _invoke(_root,"attachMovie",ppp1,ppp1,_config.number("src.s44.l16.n1"),{_x:_config.number("src.s44.l16.n2"),_y:_config.number("src.s44.l16.n3"),_width:_config.number("src.s44.l16.n4"),_height:_config.number("src.s44.l16.n5")});
   jieguo = "胜利者是" + name1;
}
clearInterval(jiajia);

} }
];
if (typeof module !== "undefined") module.exports = RichmanScripts;
