import {
  movingSprite
} from './sprite';
import {
  ctx,
  characterSprites,
  heightToFloor,
  AUDIO_MARIO_DIE,
  SURFACE
} from './constants';
import {
  disableControls
} from './keyHandler';

const mario = Object.create(movingSprite);
mario.isBig = false;
mario.isMario = true;

mario.init({
  context: ctx,
  width: 16,
  height: 16,
  image: characterSprites,
  numberOfFrames: 4,
  ticksPerFrame: 4,
  spriteStartX: 1,
  spriteStartY: 0,
  spriteSeparator: 1,
  spritFlipOffset: 17,
  x: 40,
  y: heightToFloor,
});
mario.kill = function () {
  if (!this.isDead) {
    this.isDead = true;
    this.velY = -10;
    this.velX = 0;
    this.frameIndex = 6;
    this.numberOfFrames = 0;
    AUDIO_MARIO_DIE.play();
    disableControls();
  }
};

mario.render = function (offsetX) {
  ctx.drawImage(
    this.image,
    this.spriteX + (this.frameIndex * (this.width + (this.spriteSeparator || 0))),
    this.spriteY,
    this.width,
    this.height,
    this.x - offsetX,
    this.y,
    this.width,
    this.height,
  );
};


mario.makeBigger = function () {
  if (!this.isBig) {
    this.isBig = true;
    this.height = 32;
    this.spriteSizeOffset = 34;
    this.spritFlipOffset = 33;
    if (!this.moving) {
      this.spriteY = this.spriteSizeOffset;
    }
    if (this.direction == SURFACE.LEFT) {
      this.spriteY += this.spritFlipOffset;
    }
    this.speed = 3.0;
  }
}

mario.makeSmaller = function () {
  this.isBig = false;

  this.height = 16;
  this.spriteSizeOffset = 0;
  this.spritFlipOffset = 17;
  if (!this.moving) {
    this.spriteY = this.spriteSizeOffset;
  }
  if (this.direction == SURFACE.LEFT) {
    this.spriteY += this.spritFlipOffset;
  }
  this.speed = 2.5;
}

export default mario;
