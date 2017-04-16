  function isKeyPressed(keys,mario){
      let keyPress = false;
  if (keys[38] || keys[32] || keys[87]) {
      // up arrow or space
      mario.jump();
      keyPress = true;
  }
  if (keys[39] || keys[68]) {
      mario.moveRight();
      keyPress = true;
  }
  if (keys[37] || keys[65]) {
      mario.moveLeft();
      keyPress = true;
  }
      return keyPress;
}
  export default isKeyPressed;