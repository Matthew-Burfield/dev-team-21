import { movingSprite } from './sprite';
import { ctx, characterSprites, heightToFloor } from './constants';

const mario = Object.create(movingSprite);

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
  jumpHeight: 45,
  x: 40,
  y: heightToFloor,
});

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

export default mario;
