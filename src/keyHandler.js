function actionKeyPress(keys,mario){
  if (keys[38] || keys[32] || keys[87]) {
    // up arrow or space
    mario.jump();
  }
  if (keys[39] || keys[68]) {
    mario.moveRight();
  } else if (keys[37] || keys[65]) {
    mario.moveLeft();
  } else {
    mario.stop();
  } 
}
export default actionKeyPress;