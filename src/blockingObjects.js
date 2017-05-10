import { canvas, worldLength, heightToFloor } from './constants';
import { tileSprite, brick, questionBlock, blockSprite, coin } from './sprite';
import mushroom from './mushroom';

const blockingObjects = [];

function createQuestionBlock(x, y, items = [Object.create(coin)]) {
  const questionBlockSprite = Object.create(questionBlock);
  const spriteX = 80;
  const spriteY = 112;
  questionBlockSprite.initQuestionBlock({
    x,
    y: heightToFloor - (heightToFloor - y),
    spriteX,
    spriteY,
    items,
  });
  return questionBlockSprite;
}

function createBrick(x, y) {
  const brickSprite = Object.create(brick);
  brickSprite.initBrick({
    x,
    y: heightToFloor - (heightToFloor - y),
    spriteX: 272,
    spriteY: 112,
  });
  return brickSprite;
}

function createBrickWithCoins(x, y, numCoins) {
  const brickSprite = Object.create(brick);
  const arrayOfCoins = [];
  for (let i = 0; i < numCoins; i += 1) {
    arrayOfCoins.push(Object.create(coin));
  }
  brickSprite.initBrick({
    x,
    y: heightToFloor - (heightToFloor - y),
    spriteX: 272,
    spriteY: 112,
    items: arrayOfCoins,
  });
  return brickSprite;
}

function createBricksInARow(startX, y, numberInARow) {
  const arr = [];
  for (let i = 0; i < numberInARow; i += 1) {
    arr.push(createBrick(startX + (i * 16), y));
  }
  return arr;
}


function createTile(options) {
  const tile = Object.create(tileSprite);
  tile.init(options);
  return tile;
}

function createPyramidLayer(startX, length, numBlocksHeight) {
  const spriteX = 0;
  const spriteY = 16;
  const width = 16;
  const height = 16;
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    if (i < numBlocksHeight) {
      arr.push(createTile({
        width,
        height,
        x: startX + (i * width),
        y: heightToFloor - height - (i * height),
        spriteX,
        spriteY,
        isBlocking: true,
      }));
    }
  }
  return arr;
}

function createReversePyramidLayer(startX, length, numBlocksUpFromFloor) {
  const spriteX = 0;
  const spriteY = 16;
  const width = 16;
  const height = 16;
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    arr.push(createTile({
      width,
      height,
      x: startX + (i * width),
      y: heightToFloor - width - (numBlocksUpFromFloor * width),
      spriteX,
      spriteY,
      isBlocking: true,
    }));
  }
  return arr;
}

function createBlockPyramid(startX, numBlocksWidth, numBlocksHeight) {
  const width = 16;
  const arr = [];
  for (let i = 0; i <= numBlocksWidth; i += 1) {
    arr.push(...createPyramidLayer(startX + (i * width), numBlocksWidth - i, numBlocksHeight));
  }
  return arr;
}

function createReverseBlockPyramid(startX, numBlocksWidth, numBlocksHeight) {
  const arr = [];
  for (let i = 0; i < numBlocksHeight; i += 1) {
    arr.push(...createReversePyramidLayer(startX, numBlocksWidth - i, i));
  }
  return arr;
}

function createPipe(x, size) {
  const arr = [];
  const width = 32;
  const height = 16;
  for (var i = 0; i < size; i += 1) {
    arr.push(createTile({
      width,
      height,
      x,
      y: (heightToFloor - 16) - (i * 16),
      spriteX: 0,
      spriteY: 144,
      isBlocking: true,
    }));
  }
  arr.push(createTile({
    width,
    height,
    x,
    y: (heightToFloor - 16) - (i * 16),
    spriteX: 0,
    spriteY: 128,
    isBlocking: true,
  }));
  return arr;
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
  // Need to add a few conditions for holes in the floor.
  // We don't want to render a floor tile at these coodinates
  const listOfNoFloors = [1104, 1120, 1376, 1392, 1408, 2448, 2464];
  // from 1104 - 1136 (2 tiles)
  // from 1376 - 1424 (3 tiles)
  // from 2448 - 2480 (2 tiles)
  if (!listOfNoFloors.includes(i * 16)) {
    blockingObjects.push(getFloorTile(i, 8));
    blockingObjects.push(getFloorTile(i, 24));
  }
}

blockingObjects.push(createQuestionBlock(256, 136));
blockingObjects.push(createBrick(320, 136));
blockingObjects.push(createQuestionBlock(336, 136));
blockingObjects.push(createBrick(352, 136));
blockingObjects.push(createQuestionBlock(368, 136));
blockingObjects.push(createBrick(384, 136));
blockingObjects.push(createQuestionBlock(352, 72, [mushroom()]));
blockingObjects.push(...createPipe(448, 1));
blockingObjects.push(...createPipe(608, 2));
blockingObjects.push(...createPipe(912, 2));
blockingObjects.push(...createPipe(2608, 1));
blockingObjects.push(...createPipe(2864, 1));
blockingObjects.push(createBrick(1232, 136));
blockingObjects.push(createQuestionBlock(1248, 136));
blockingObjects.push(createBrick(1264, 136));

blockingObjects.push(...createBricksInARow(1280, 72, 8));
blockingObjects.push(...createBricksInARow(1456, 72, 3));

blockingObjects.push(createBrickWithCoins(1503, 136, 12)); // This brick has 12 coins
blockingObjects.push(createQuestionBlock(1504, 72));
blockingObjects.push(...createBricksInARow(1600, 136, 2));
blockingObjects.push(createQuestionBlock(1696, 136));
blockingObjects.push(createQuestionBlock(1744, 136));
blockingObjects.push(createQuestionBlock(1792, 136));
blockingObjects.push(createQuestionBlock(1744, 72));
blockingObjects.push(createBrick(1888, 136));
blockingObjects.push(...createBricksInARow(1936, 72, 3));
blockingObjects.push(...createBricksInARow(2064, 136, 2));
blockingObjects.push(createQuestionBlock(2064, 72));
blockingObjects.push(createQuestionBlock(2080, 72));
blockingObjects.push(createBrick(2048, 72));
blockingObjects.push(createBrick(2096, 72));
blockingObjects.push(...createBricksInARow(2688, 136, 2));
blockingObjects.push(createQuestionBlock(2720, 136));
blockingObjects.push(createBrick(2736, 136));

blockingObjects.push(...createBlockPyramid(2144, 4, 4));
blockingObjects.push(...createReverseBlockPyramid(2240, 4, 4));
blockingObjects.push(...createBlockPyramid(2368, 5, 4));
blockingObjects.push(...createReverseBlockPyramid(2480, 4, 4));
blockingObjects.push(...createBlockPyramid(2896, 9, 8));


export default blockingObjects;
