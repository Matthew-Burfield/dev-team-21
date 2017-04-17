import mario from './mario';
import * as constant from './constants';
import collisionCheck from './collisionDetection';
import { blockSprite } from './sprite';
import actionKeyPress from './keyHandler'

var keys = [];
var renderList = [mario];

function gameLoop() {
  //handle key and check if mario is moving
  actionKeyPress(keys,mario);
  
  // Clear the screen
  constant.ctx.beginPath();
  constant.ctx.rect(0, 0, constant.canvas.width, constant.canvas.height);
  constant.ctx.fillStyle = "#2196F3";
  constant.ctx.fill();
  constant.ctx.closePath();

  mario.velX *= constant.friction;
  mario.velY += constant.gravity;

  mario.grounded = false;

  boxes.forEach(box => {
    constant.ctx.drawImage(
      box.image,
      box.spriteX,
      box.spriteY,
      box.width,
      box.height,
      box.x,
      box.y,
      box.width,
      box.height
    );
    var dir = collisionCheck(mario, box);

    if (dir === "l" || dir === "r") {
      mario.velX = 0;
      mario.jumping = false; //TODO tweak it a bit, can jump from the wall.
    } else if (dir === "b") {
      mario.grounded = true;
      mario.jumping = false;
    } else if (dir === "t") {
      mario.velY *= -1;
    }
  });

  if(mario.grounded){
      mario.velY = 0;
  }
  
  mario.x += mario.velX;
  mario.y += mario.velY;

  renderList.forEach(obj =>{
      obj.render();
  } );
  requestAnimationFrame(gameLoop);
}

const keyDownHandler = (e) => {
  keys[e.keyCode] = true;
}

const keyUpHandler = (e) => {
  keys[e.keyCode] = false;
}

const boxes = [];

for (let i = 0; i * blockSprite.width < constant.canvas.width; i += 1) {
  const newBox = Object.create(blockSprite);
  newBox.init({
    x: i * blockSprite.width,
    image: constant.blockSprites,
  });
  boxes.push(newBox);
}

for (let i = 0; i < 5; i += 1) {
  const newBox = Object.create(blockSprite);
  const startingX = 5 * 16;
  const y = constant.canvas.height - (4 * 16);
  newBox.init({
    x: startingX + (i * 16),
    y,
    image: constant.blockSprites,
  });
  boxes.push(newBox);
}

// Start the game loop as soon as the sprite sheet is loaded
window.addEventListener("load", gameLoop);
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
          