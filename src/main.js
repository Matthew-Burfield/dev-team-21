import mario from './mario';
import * as constant from './constants';
import collisionCheck from './collisionDetection';
import actionKeyPress from './keyHandler';
import nonBlockingObjects from './nonBlockingObjects';
import aiObjects from './aiObjects'
import blockingObjects from './blockingObjects';
import levelState from './levelState';
import movingSprite from './sprite';



/**
 * offsetX maintains the x-axis offset to control the camera panning across the level
 * deadZone is the area in which mario can freely run around the screen without
 *          the camera panning. In this case, in the left half of the screen.
 */
let offsetX = 0;
const deadZone = constant.canvas.height / 2;


function clearCanvas() {
  constant.ctx.beginPath();
  constant.ctx.rect(-offsetX, 0, constant.canvas.width, constant.canvas.height);
  constant.ctx.fillStyle = '#2196F3';
  constant.ctx.fill();
  constant.ctx.closePath();
}

/**
 * Draw non-blocking objects first so blocking objects get painted
 * on top if required
 */
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
      tile.height,
    );
  });
}

function renderText() {
  const fontHeight = 8;
  const marginTop = 7;
  const marginLeft = 20;
  constant.ctx.font = `normal ${fontHeight}px emulogic`;
  constant.ctx.fillStyle = 'white';
  constant.ctx.textBaseline = 'top';
  constant.ctx.fillText('MARIO', marginLeft - offsetX, marginTop);
  constant.ctx.fillText(levelState.getScore(), marginLeft - offsetX, marginTop + fontHeight);
  constant.ctx.fillText(`x${levelState.getCoins()}`, (marginLeft + 70) - offsetX, marginTop + fontHeight);
  constant.ctx.fillText('WORLD', (marginLeft + 110) - offsetX, marginTop);
  constant.ctx.fillText(`${levelState.world}-${levelState.stage}`, (marginLeft + 115) - offsetX, marginTop + fontHeight);
  constant.ctx.fillText('TIME', (marginLeft + 170) - offsetX, marginTop);
  constant.ctx.fillText(levelState.getTime(), (marginLeft + 175) - offsetX, marginTop + fontHeight);
}

function gameLoop() {
  // handle key and check if mario is moving
  actionKeyPress(mario);
  constant.ctx.save();

  /**
   * This is what moves the "camera". We're offsetting the canvas context
   * so the start x position is not 0, it's whatever the offset it.
   * This give the illusion that we're panning across the screen.
   */
  constant.ctx.translate(offsetX, 0);

  clearCanvas();
  /**
   * Draw non-blocking objects first so blocking objects get painted
   * on top if required
   */
  renderNonBlockingObjects();
  renderText();

  mario.velX *= constant.friction;
  mario.grounded = false;

  const blockingObjectsArray = blockingObjects.filter(item =>
    (item.x + offsetX + item.width > 0 && item.x + offsetX < constant.canvas.width));

  const aiObjectsArray = aiObjects.filter(item =>
    (item.x + offsetX + item.width > 0 && item.x + offsetX < constant.canvas.width));

  aiObjectsArray.forEach((aiObj) => {
    aiObj.applyGravity();
    blockingObjectsArray.forEach((box) => {
      if (box.collision) {
        const {
          direction,
          correctionY,
          correctionX
        } = collisionCheck(aiObj, box, offsetX);
        aiObj.x += correctionX;
        aiObj.y += correctionY;
        if (direction === constant.SURFACE.LEFT || direction === constant.SURFACE.RIGHT) {
          aiObj.velX = 0;
        } else if (direction === constant.SURFACE.BOTTOM) {
          aiObj.grounded = true;
          aiObj.jumping = false;
        } else if (direction === constant.SURFACE.TOP) {
          const itemToSpawn = box.hit();
          aiObj.velY *= -0.1;
        }
      }
    });
  });

  let animatedArray = [...blockingObjectsArray, ...aiObjectsArray]
  animatedArray.forEach((box) => {
    if (box.delete) {
      if (box.isPowerUp || box.isEnemy) {
        aiObjects.splice(aiObjects.indexOf(box), 1);
      } else {
        blockingObjects.splice(blockingObjects.indexOf(box), 1);
      }

    }
    if (box.update) {
      box.update();
    }
    box.render();

    // Only do collision detection if mario isn't dead
    if (!mario.isDead) {
      if (box.collision) {
        const {
          direction,
          correctionY,
          correctionX
        } = collisionCheck(mario, box, offsetX);
        mario.x += correctionX;
        mario.y += correctionY;
        if (direction != null) {
          if (box.isPowerUp) {
            box.kill();
            mario.makeBigger();


          } else {
            if (direction === constant.SURFACE.LEFT || direction === constant.SURFACE.RIGHT) {
              mario.velX = 0;
            } else if (direction === constant.SURFACE.BOTTOM) {
              mario.grounded = true;
              mario.jumping = false;
            } else if (direction === constant.SURFACE.TOP) {
              const itemToSpawn = box.hit(mario.isBig);
              if (itemToSpawn) {
                blockingObjects.push(itemToSpawn);
              }
              mario.velY *= -0.1;
            }
          }
        }
      }
    }
  });
  mario.applyGravity();

  /**
   * With the panning camera, instead of just updating mario's x position,
   * we only want to update the x position if mario's x position is less that
   * the deadZone. I.e. if mario is in the left side of the screen.
   *
   * If he is on the right side, then we don't update his x position, we instead
   * just decrease the offset which will move the camera to the right.
   *
   * We purposely don't move the camera to the left, as the camera never moved left
   * in the real game.
   */
  if (!mario.isDead) {
    if (mario.x >= deadZone && mario.velX > 0) {
      offsetX -= mario.velX;
    } else {
      mario.x += mario.velX;
    }
    if (mario.x < 0) {
      mario.x = 0;
    }
  }

  mario.render(offsetX);
  constant.ctx.restore();
  requestAnimationFrame(gameLoop);
} // End Gameloop

// Start the game loop as soon as the sprite sheet is loaded

window.addEventListener('load', gameLoop);
