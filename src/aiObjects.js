import { ctx, itemSprites } from './constants';
import { movingSprite } from './sprite';
import mario from './mario.js';

const aiObjects = [];
function createMushroom(x,y){
  const mushroom = Object.create(movingSprite);
  mushroom.init({
    context: ctx,
    width: 16,
    height: 16,
    x: x,
    y: y,
    image: itemSprites,
    moving:true,
    numberOfFrames: 0,
    ticksPerFrame: 0,
    spriteStartX: 0,
    spriteStartY: 0,
    spriteSeparator: 0,
    spritFlipOffset: 17});
  mushroom.vely = -1;
  mushroom.isPowerUp = true;
  mushroom.activePowerUp = mario.makeBigger;
  return mushroom;
}
aiObjects.push(createMushroom(40,40));
console.log(typeof(createMushroom(40,40)));
export default aiObjects;
