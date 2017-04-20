import { canvas, worldLength } from './constants';
import { tileSprite, brick, questionBlock, blockSprite } from './sprite';

const blockingObjects = [];

function getSpriteOptions(numBlocksFromLeft, numBlocksHigh, spriteX, spriteY) {
  return {
    x: numBlocksFromLeft * 16,
    y: canvas.height - ((numBlocksHigh * 16) + 8),
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
    y: canvas.height - yHeight,
    numberOfFrames: 1,
  });
  return floor;
}

for (let i = 0; i * blockSprite.width < worldLength; i += 1) {
  blockingObjects.push(getFloorTile(i, 8));
  blockingObjects.push(getFloorTile(i, 24));
}

blockingObjects.push(createQuestionBlock(16, 5));
blockingObjects.push(createBrick(20, 5));
blockingObjects.push(createQuestionBlock(21, 5));
blockingObjects.push(createBrick(22, 5));
blockingObjects.push(createQuestionBlock(23, 5));
blockingObjects.push(createBrick(24, 5));
blockingObjects.push(createQuestionBlock(22, 9));
blockingObjects.push(createTile({
  width: 32,
  height: 32,
  x: 28 * 16,
  y: canvas.height - ((3 * 16) + 8),
  spriteX: 0,
  spriteY: 128,
  isBlocking: true,
}));
blockingObjects.push(createTile({
  width: 32,
  height: 16,
  x: 38 * 16,
  y: canvas.height - ((2 * 16) + 8),
  spriteX: 0,
  spriteY: 144,
  isBlocking: true,
}));
blockingObjects.push(createTile({
  width: 32,
  height: 32,
  x: 38 * 16,
  y: canvas.height - ((4 * 16) + 8),
  spriteX: 0,
  spriteY: 128,
  isBlocking: true,
}));

export default blockingObjects;
