import { canvas, blockSprites, tileSprites, itemSprites, ctx, AUDIO_COIN, AUDIO_BUMP } from './constants';

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

export const coin = Object.create(sprite);
coin.init = function(spawningObjectX, spawningObjectY) {
  this.height = 16;
  this.width = 16;
  this.image = itemSprites;
  this.spriteX = 0;
  this.spriteY = 112;
  this.velY = -8;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = 1;
  this.numberOfFrames = 4;
  this.gravity = 0.8;
  this.x = spawningObjectX;
  this.y = spawningObjectY - this.height;
  this.placementY = this.y;
  this.collision = false;
  AUDIO_COIN.load();
  AUDIO_COIN.play(); // Play the coin sound when a coin is initiated
};
coin.update = function() {
  this.tickCount += 1;
  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;

    if (this.velY) {
      this.velY += this.gravity;
      this.y += this.velY;
      if (this.y >= this.placementY) {
        this.delete = true;
      }
    }

    if (this.frameIndex < this.numberOfFrames - 1) {
      // Go to the next frame
      this.frameIndex += 1;
    } else {
      this.frameIndex = 0;
    }
  }
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
  this.x = options.x;
  this.y = options.y;
  this.collision = true;
};
movingSprite.moveRight = function () {
  if (this.velX < this.speed) {
    this.moving = true;
    this.velX += 1;
    this.spriteY = 0;
    this.update();
  }
};
movingSprite.moveLeft = function () {
  if (this.velX > -this.speed) {
    this.moving = true;
    this.velX -= 1;
    this.spriteY = 17;
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
  if (this.numberOfFrames === 0) return this.frameIndex;
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


    if (this.y - this.height > canvas.height && !this.isDead) {
      this.died();
    }

    this.frameIndex = this.getNextFrameIndex();
  }
};


export const blockSprite = Object.create(sprite);
blockSprite.width = 16;
blockSprite.height = 16;
blockSprite.image = blockSprites;
blockSprite.collision = true;
blockSprite.init = function (options) {
  this.placementY = options.y;
  this.x = options.x;
  this.y = options.y || canvas.height - 16; // default to a floor block
  this.spriteX = options.spriteX || 80; // default to floor
  this.spriteY = options.spriteY || 194; // default to floor
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = options.ticksPerFrame || 2;
  this.numberOfFrames = options.numberOfFrames || 2;
  this.velY = 0;
  this.gravity = options.gravity || 0.8;
  this.isHit = false;
};
blockSprite.update = function () {
  this.tickCount += 1;
  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;

    if (this.velY) {
      this.velY += this.gravity;
      this.y += this.velY;
      if (this.y >= this.placementY) {
        this.y = this.placementY;
        this.velY = 0;
        this.isHit = false;
      }
    }

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
  this.gotBroken = false;
  this.delete = false;
  this.ticksPerFrame = 2;
};
brick.hit = function hit() {
  // move brick up a little bit
  if (!this.isHit) {
    AUDIO_BUMP.load();
    AUDIO_BUMP.play();
    this.isHit = true;
    this.velY = -2;
  }
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
  this.ticksPerFrame = 31;
  this.items = options.items || [];
};
questionBlock.hit = function() {
  let item = null;
  if (!this.isHit) {
    // If there are items - spawn them
    if (this.items.length > 0) {
      // How can I get this item into the blocking array for rendering?
      item = this.items.pop();
      item.init(this.x, this.y);
    }
    this.isHit = true;
    this.velY = -2;
  }
  if (this.isAnimated && this.items.length === 0) {
    this.isAnimated = false;
    this.ticksPerFrame = 2;
    this.spriteX = 128;
    this.numberOfFrames = 0;
  }
  return item;
};

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
  this.collision = options.isBlocking || false;
  this.breakable = options.breakable || false;
};
