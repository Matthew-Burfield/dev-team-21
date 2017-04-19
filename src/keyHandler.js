import { canvas } from './constants';

const keys = [];
export var offsetX = 0;
var deadZone = canvas.height / 2;

function actionKeyPress(mario) {
  if (keys[38] || keys[32] || keys[87]) {
    mario.jump();
  }
  if (keys[39] || keys[68]) {
    if (mario.x >= deadZone) {
      offsetX -= mario.speed;
    } else {
      mario.moveRight();
    }
  } else if (keys[37] || keys[65]) {
    console.log(mario.x, deadZone);
    if (mario.x - mario.width <= offsetX) {
      mario.x = offsetX;
    } else if (mario.x < deadZone) {
      mario.moveLeft();
    }
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

