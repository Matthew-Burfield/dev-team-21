import {
  ctx,
  itemSprites
} from './constants';
import {
  movingSprite
} from './sprite';


export const mushroom = Object.create(movingSprite);
mushroom.init = function (spawningObjectX, spawningObjectY) {
  this.context= ctx;
  this.width = 16;
  this.height = 16;
  this.spriteX = 0;
  this.spriteY = 0;
  this.x = spawningObjectX;
  this.y = spawningObjectY - this.height;
  this.image = itemSprites;
  this.moving = true;
  this.numberOfFrames = 0;
  this.ticksPerFrame = 0;
  this.spriteStartX = 0;
  this.spriteStartY = 0;
  this.spriteSeparator = 0;
  //direction: 'RIGHT',
  this.spritFlipOffset = 17;
  this.vely = -1;
  this.isPowerUp = true;
};

