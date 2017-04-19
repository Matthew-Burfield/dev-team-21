import { canvas, blockSprites, tileSprites, ctx } from './constants';

const sprite = {
  render() {
    // Draw the animation
    ctx.drawImage(
      this.image,
      this.spriteX + (this.frameIndex * (this.width + (this.spriteSeparator || 0))),
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  },
};

export const movingSprite = Object.create(sprite);
movingSprite.init = function (options) {
  this.width = options.width;
  this.height = options.height;
  this.image = options.image;
  this.jumping = false;
  this.grounded = false;
  this.moving = false;
  this.speed = 2.5;
  this.velX = 0;
  this.velY = 0;
  // Sprite logic
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = options.ticksPerFrame || 0;
  this.numberOfFrames = options.numberOfFrames || 1;
  this.spriteX = options.spriteStartX;
  this.spriteY = options.spriteStartY;
  this.spriteSeparator = options.spriteSeparator;
  // Canvas position
  this.x = 0;
  this.y = 0;
};
movingSprite.moveRight = function () {
  if (this.velX < this.speed) {
    this.moving = true;
    this.velX += 1;
    this.spriteStartY = 0;
    this.update();
  }
};
movingSprite.moveLeft = function () {
  if (this.velX > -this.speed) {
    this.moving = true;
    this.velX -= 1;
    this.spriteStartY = 17;
    this.update();
  }
};
movingSprite.jump = function () {
  if (!this.jumping && this.grounded) {
    this.jumping = true;
    this.grounded = false;
    this.moving = true;
    this.velY -= this.speed * 2.55;
    this.update();
  }
};
movingSprite.stop = function () {
  this.moving = false;
  this.update();
};
movingSprite.getNextFrameIndex = function () {
  if (this.jumping) {
    return 5;
  }
  if (!this.moving || this.frameIndex >= this.numberOfFrames - 1) {
    return 0;
  }
  return this.frameIndex + 1;
};
movingSprite.update = function () {
  this.tickCount += 1;
  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;
    this.frameIndex = this.getNextFrameIndex();
  }
};


export const blockSprite = Object.create(sprite);
blockSprite.width = 16;
blockSprite.height = 16;
blockSprite.image = blockSprites;
blockSprite.init = function (options) {
  this.x = options.x;
  this.y = options.y || canvas.height - 16; // default to a floor block
  this.spriteX = options.spriteX || 80; // default to floor
  this.spriteY = options.spriteY || 194; // default to floor
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = options.ticksPerFrame || 31;
  this.numberOfFrames = options.numberOfFrames || 2;
  this.velY = 0;
  this.gravity = 0.3;
  this.isHit = false;
};
blockSprite.update = function () {
  this.tickCount += 1;
  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;

    if (this.frameIndex < this.numberOfFrames - 1) {
      // Go to the next frame
      this.frameIndex += 1;
    } else {
      this.frameIndex = 0;
    }
  }
};

export const brick = Object.create(blockSprite);
brick.initBrick = function initBrick(options) {
  this.init(options);
  this.gotHit = false;
  this.gotBroken = false;
  this.delete = false;
};
brick.hit = function hit() {
  // move brick up a little bit
  this.isHit = true;
  this.velY = -2;
};
brick.breakBlock = function breakBlock() {
  this.ticksPerFrame = 1;
  this.numberOfFrames = 3;
  this.tickCount = 0;
  this.frameIndex = 1;
  this.gotBroken = true;
};

export const questionBlock = Object.create(blockSprite);
questionBlock.initQuestionBlock = function(options) {
  this.init(options);
  this.isAnimated = true;
};
questionBlock.hit = function() {
  this.spriteX = 128;
  this.frameIndex = 0;
  this.numberOfFrames = 0;
};
    // switch (this.type) {
    //   case 'brick':
    //     this.breakable = true;
    //     this.singleAnimation = true;
    //     this.animate = false;
    //     break;
    //   case 'question':
    //     this.breakable = false;
    //     this.singleAnimation = false;
    //     this.animate = true;
    //     break;
    // }

    // change the x to static block after hit
        // if (this.gotBroken) {
        //   this.delete = true;
        // } else {
        //   this.animate = false;
        //   this.spriteX += (this.frameIndex * this.width)
        // }

export const tileSprite = Object.create(sprite);
tileSprite.image = tileSprites;
tileSprite.frameIndex = 0;
tileSprite.init = function (options) {
  this.width = options.width || 16;
  this.height = options.height || 16;
  this.x = options.x;
  this.y = options.y;
  this.spriteX = options.spriteX;
  this.spriteY = options.spriteY;
  this.isBlocking = options.isBlocking || false;
  this.breakable = options.breakable || false;
};
