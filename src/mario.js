import { movingSprite } from './sprite.js';
import { ctx, characterSprites } from './constants';

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
});

export default mario;
