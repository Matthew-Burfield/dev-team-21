import mario from './mario';
import * as constant from './constants';
import collisionCheck from './collisionDetection';
import {
    tileSprite, brick, questionBlock, blockSprite,
}
from './sprite';
import actionKeyPress from './keyHandler';
import {
    nonBlockingObjects,
}
from './nonBlockingObjects';

const boxes = [];
// how far offset the canvas is
let offsetX = 0;
const deadZone = constant.canvas.height / 2;


function getSpriteOptions(numBlocksFromLeft, numBlocksHigh, spriteX, spriteY) {
  return {
    x: numBlocksFromLeft * 16,
    y: constant.canvas.height - ((numBlocksHigh * 16) + 8),
    spriteX,
    spriteY,
  };
}


function createQuestionBlock(numBlocksFromLeft, numBlocksHigh) {
  const questionBlockSprite = Object.create(questionBlock);
  questionBlockSprite.initQuestionBlock(
    getSpriteOptions(numBlocksFromLeft, numBlocksHigh, 80, 112)
  );
  return questionBlockSprite;
}

function createBrick(numBlocksFromLeft, numBlocksHigh) {
  const brickSprite = Object.create(brick);
  brickSprite.initBrick(getSpriteOptions(numBlocksFromLeft, numBlocksHigh, 272, 112));
  return brickSprite;
}


function createTile(options) {
  const tile = Object.create(tileSprite);
  tile.init(options);
  return tile;
}

function getFloorTile(i, yHeight) {
  const floor = Object.create(blockSprite);
  floor.init({
    x: i * blockSprite.width,
    y: constant.canvas.height - yHeight,
    numberOfFrames: 1,
  });
  return floor;
}

function clearCanvas() {
  constant.ctx.beginPath();
  constant.ctx.rect(-offsetX, 0, constant.canvas.width, constant.canvas.height);
  constant.ctx.fillStyle = '#2196F3';
  constant.ctx.fill();
  constant.ctx.closePath();
}

function renderNonBlockingObjects() {
  const nonBlockingObjectsArray = nonBlockingObjects.filter(item =>
    (item.x + offsetX + item.width > 0 && item.x + offsetX < constant.canvas.width));

  nonBlockingObjectsArray.forEach((tile) => {
    constant.ctx.drawImage(
      tile.image,
      tile.spriteX,
      tile.spriteY,
      tile.width,
      tile.height,
      tile.x,
      tile.y,
      tile.width,
      tile.height
    );
  });
}

function gameLoop() {
  // handle key and check if mario is moving
  actionKeyPress(mario);
  // Clear the screen
  constant.ctx.save();
  constant.ctx.translate(offsetX, 0);

  clearCanvas();
  /**
   * Draw non-blocking objects first so blocking objects get painted
   * on top if required
   */
  renderNonBlockingObjects();

  mario.velX *= constant.friction;
  mario.velY += constant.gravity;
  mario.grounded = false;

  const blockingObjectsArray = boxes.filter(item =>
    (item.x + offsetX + item.width > 0 && item.x + offsetX < constant.canvas.width));

  blockingObjectsArray.forEach((box) => {
    if (box.delete) {
      boxes.splice(boxes.indexOf(box), 1); // remove it
    }
    if (box.update) {
      box.update();
    }
    box.render();

    const { direction, correctionY, correctionX } = collisionCheck(mario, box, offsetX);
    mario.x += correctionX;
    mario.y += correctionY;
    if (direction === constant.SURFACE.LEFT || direction === constant.SURFACE.RIGHT) {
      mario.velX = 0;
      mario.jumping = false; // TODO tweak it a bit, can jump from the wall.
    } else if (direction === constant.SURFACE.BOTTOM) {
      mario.grounded = true;
      mario.jumping = false;
    } else if (direction === constant.SURFACE.TOP) {
      box.hit();
      mario.velY *= -1;
      if (box.type === 'brick') {
        box.setAnimate(true);
      }
    }
  });
  if (mario.grounded) {
    mario.velY = 0;
  }
  if (mario.x >= deadZone && mario.velX > 0) {
    offsetX -= mario.velX;
  } else {
    mario.x += mario.velX;
  }
  if (mario.x < 0) {
    mario.x = 0;
  }
  mario.y += mario.velY;
  mario.render(offsetX);
  constant.ctx.restore();
  requestAnimationFrame(gameLoop);
} // End Gameloop

// function movePlayer(mario, offsetX) {

// }

for (let i = 0; i * blockSprite.width < constant.worldLength; i += 1) {
  boxes.push(getFloorTile(i, 8));
  boxes.push(getFloorTile(i, 24));
}

boxes.push(createQuestionBlock(16, 5));
boxes.push(createBrick(20, 5));
boxes.push(createQuestionBlock(21, 5));
boxes.push(createBrick(22, 5));
boxes.push(createQuestionBlock(23, 5));
boxes.push(createBrick(24, 5));
boxes.push(createQuestionBlock(22, 9));
boxes.push(createTile({
  width: 32,
  height: 32,
  x: 28 * 16,
  y: constant.canvas.height - ((3 * 16) + 8),
  spriteX: 0,
  spriteY: 128,
  isBlocking: true,
}));
boxes.push(createTile({
  width: 32,
  height: 16,
  x: 38 * 16,
  y: constant.canvas.height - ((2 * 16) + 8),
  spriteX: 0,
  spriteY: 144,
  isBlocking: true,
}));
boxes.push(createTile({
  width: 32,
  height: 32,
  x: 38 * 16,
  y: constant.canvas.height - ((4 * 16) + 8),
  spriteX: 0,
  spriteY: 128,
  isBlocking: true,
}));

// Start the game loop as soon as the sprite sheet is loaded
window.addEventListener('load', gameLoop);

