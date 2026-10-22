onClipEvent(keyDown){
   if(Key.getCode() == 48 || Key.getCode() == 96)
   {
      _root.ss.stop();
   }
   else if(Key.getCode() == 49 || Key.getCode() == 97)
   {
      _root.ss.stop();
      _root.ss.attachSound("bei2");
      _root.ss.start(1,100);
   }
   else if(Key.getCode() == 50 || Key.getCode() == 98)
   {
      _root.ss.stop();
      _root.ss.attachSound("bei3");
      _root.ss.start(1,100);
   }
}
