const keys = [];

/**
 * 
 * 
 * @param {any} mario
 if (e.keyCode === 37) { // left
    console.log(offsetX);
    if (playerX > 0) {
      playerX--;
    }
  } else if (e.keyCode === 39) { // right
    console.log(playerX, offsetX, deadZone);
    if (playerX >= offsetX + deadZone) {
      offsetX--;
      } else {
      playerX++;
      }
  }
   */

function actionKeyPress(mario) {
  if (keys[38] || keys[32] || keys[87]) {
    mario.jump();
  }
  if (keys[39] || keys[68]) {
    // if (mario.x >= offsetX + deadZone) {
      // Increase offset and update mario's sprite frame but keep mario stationary
    // } else {
      // Actually increase mario's x position
    mario.moveRight();
    // }
  } else if (keys[37] || keys[65]) {
    // if (mario.x > 0) {
      // Only move mario left if we isn't going to go off the screen.
      // Also dont pan the camera to the left. Mario can't run backwards.
    mario.moveLeft();
    // }
  } else {
    mario.stop();
  }
}
export default actionKeyPress;

const keyDownHandler = (e) => {
  keys[e.keyCode] = true;
};

const keyUpHandler = (e) => {
  keys[e.keyCode] = false;
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

