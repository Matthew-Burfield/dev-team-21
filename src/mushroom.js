import { itemSprites,
  // canvas,
  ctx } from './constants';

const mushroom = (function privateMushroom() {
  const width = 16;
  const height = 16;
  const image = itemSprites;
  // const speed = 2.5;
  const spriteX = 0;
  const spriteY = 0;
  // const numberOfFrames = 2;

  let x = 0;
  let y = 0;
  let frameIndex = 0;
  let tickCount = 0;
  let velX = 0;

  const init = (initX, initY) => {
    x = initX;
    y = initY;
  };

  // const init = (options) => {
  //   this.width = options.width;
  //   this.height = options.height;
  //   this.image = options.image;
  //   this.jumping = false;
  //   this.grounded = false;
  //   this.moving = false;
  //   this.speed = 2.5;
  //   this.velX = 0;
  //   this.velY = 0;
  //   // Sprite logic
  //   this.frameIndex = 0;
  //   this.tickCount = 0;
  //   this.ticksPerFrame = options.ticksPerFrame || 0;
  //   this.numberOfFrames = options.numberOfFrames || 1;
  //   this.spriteX = options.spriteStartX;
  //   this.spriteY = options.spriteStartY;
  //   this.spriteSeparator = options.spriteSeparator;
  //   // Canvas position
  //   this.x = options.x;
  //   this.y = options.y;
  //   this.collision = true;
  // };

  // const moveRight = () => {
  //   if (this.velX < speed) {
  //     this.moving = true;
  //     this.velX += 1;
  //     this.spriteY = 0;
  //     this.update();
  //   }
  // };

  // const moveLeft = () => {
  //   if (this.velX > -speed) {
  //     this.moving = true;
  //     this.velX -= 1;
  //     this.spriteY = 17;
  //     this.update();
  //   }
  // };

  // const getNextFrameIndex = () => {
  //   if (numberOfFrames === 0) return this.frameIndex;
  //   if (this.jumping) {
  //     return 5;
  //   }
  //   if (!this.moving || this.frameIndex >= numberOfFrames - 1) {
  //     return 0;
  //   }
  //   return this.frameIndex + 1;
  // };

  // const update = () => {
  //   this.tickCount += 1;
  //   if (this.tickCount > this.ticksPerFrame) {
  //     this.tickCount = 0;


  //     if (this.y - this.height > canvas.height && !this.isDead) {
  //       this.kill();
  //     }

  //     this.frameIndex = this.getNextFrameIndex();
  //   }
  // };

  const render = (offsetX) => {
    ctx.drawImage(
      image,
      spriteX,
      spriteY + (frameIndex * height),
      width,
      height,
      x - offsetX,
      y,
      width,
      height,
    );
  };

  const publicAPI = {
    init,
    // moveRight,
    // moveLeft,
    // getNextFrameIndex,
    // update,
    render,
  };

  return publicAPI;
});

export default mushroom;
