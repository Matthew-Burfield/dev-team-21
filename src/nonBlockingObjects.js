import { tileSprite } from './sprite';
import { heightToFloor, worldLength } from './constants';

const TILE_SPRITE = {
  MOUNTAIN_UPWARD_SLOPE: {
    x: 128,
    y: 128,
  },
  MOUNTAIN_DOWNWARD_SLOPE: {
    x: 160,
    y: 128,
  },
  MOUNTAIN_RIGHT_DOTS: {
    x: 128,
    y: 144,
  },
  MOUNTAIN_LEFT_DOTS: {
    x: 160,
    y: 144,
  },
  MOUNTAIN_CENTER: {
    x: 144,
    y: 144,
  },
  MOUNTAIN_TOP: {
    x: 144,
    y: 128,
  },
  BUSH_LEFT_END: {
    x: 176,
    y: 144,
  },
  BUSH_MIDDLE: {
    x: 192,
    y: 144,
  },
  BUSH_RIGHT_END: {
    x: 208,
    y: 144,
  },
  CLOUD_TOP_LEFT: { x: 0, y: 320 },
  CLOUD_TOP_MIDDLE: { x: 16, y: 320 },
  CLOUD_TOP_RIGHT: { x: 32, y: 320 },
  CLOUD_BOTTOM_LEFT: { x: 0, y: 336 },
  CLOUD_BOTTOM_MIDDLE: { x: 16, y: 336 },
  CLOUD_BOTTOM_RIGHT: { x: 32, y: 336 },
};

function createTile(width, height, options) {
  const isBlocking = false;
  const tile = Object.create(tileSprite);
  tile.init({
    width,
    height,
    x: options.x,
    y: options.y,
    spriteX: options.spriteX,
    spriteY: options.spriteY,
    isBlocking,
  });
  return tile;
}


function createTileWrapper(startX, startY, xDistanceFromFirstTile, yDistanceFromBottomTile, spriteCoords) {
  const width = 16;
  const height = 16;
  return createTile(width, height, {
    x: startX + (width * xDistanceFromFirstTile),
    y: heightToFloor - startY - height - (height * yDistanceFromBottomTile),
    spriteX: spriteCoords.x,
    spriteY: spriteCoords.y,
  });
}

/**
 * Creates a big non blocking mountain to paint to the background
 *
 * @param {number} startX The bottom left corner coordinate of the mountain
 */
function bigMountain(startX) {
  const yCoord = 0;
  const bottomUpwardSlope = createTileWrapper(startX, yCoord, 0, 0, TILE_SPRITE.MOUNTAIN_UPWARD_SLOPE);
  const bottomRightDot = createTileWrapper(startX, yCoord, 1, 0, TILE_SPRITE.MOUNTAIN_RIGHT_DOTS);
  const bottomCenter = createTileWrapper(startX, yCoord, 2, 0, TILE_SPRITE.MOUNTAIN_CENTER);
  const bottomLeftDots = createTileWrapper(startX, yCoord, 3, 0, TILE_SPRITE.MOUNTAIN_LEFT_DOTS);
  const bottomDownwardSlope = createTileWrapper(startX, yCoord, 4, 0, TILE_SPRITE.MOUNTAIN_DOWNWARD_SLOPE);
  const upperUpwardSlope = createTileWrapper(startX, yCoord, 1, 1, TILE_SPRITE.MOUNTAIN_UPWARD_SLOPE);
  const upperRightDot = createTileWrapper(startX, yCoord, 2, 1, TILE_SPRITE.MOUNTAIN_RIGHT_DOTS);
  const upperDownwardSlope = createTileWrapper(startX, yCoord, 3, 1, TILE_SPRITE.MOUNTAIN_DOWNWARD_SLOPE);
  const top = createTileWrapper(startX, yCoord, 2, 2, TILE_SPRITE.MOUNTAIN_TOP);

  return [
    bottomUpwardSlope,
    bottomRightDot,
    bottomCenter,
    bottomLeftDots,
    bottomDownwardSlope,
    upperUpwardSlope,
    upperRightDot,
    upperDownwardSlope,
    top,
  ];
}

function smallMountain(startX) {
  const yCoord = 0;
  return [createTileWrapper(startX, yCoord, 0, 0, TILE_SPRITE.MOUNTAIN_UPWARD_SLOPE),
    createTileWrapper(startX, yCoord, 1, 0, TILE_SPRITE.MOUNTAIN_RIGHT_DOTS),
    createTileWrapper(startX, yCoord, 2, 0, TILE_SPRITE.MOUNTAIN_DOWNWARD_SLOPE),
    createTileWrapper(startX, yCoord, 1, 1, TILE_SPRITE.MOUNTAIN_TOP),
  ];
}

function cloud(startX, startY, cloudLength) {
  const arr = [];
  const endOfMapCorrection = 200; // pixels
  if (startX > 0 && startX < worldLength - endOfMapCorrection) {
    arr.push(createTileWrapper(startX, startY, 0, 0, TILE_SPRITE.CLOUD_BOTTOM_LEFT));
    arr.push(createTileWrapper(startX, startY, 0, 1, TILE_SPRITE.CLOUD_TOP_LEFT));

    // Need to use var here so i remains in scope after the for loop
    for (var i = 1; i < cloudLength + 1; i += 1) {
      arr.push(createTileWrapper(startX, startY, i, 0, TILE_SPRITE.CLOUD_BOTTOM_MIDDLE));
      arr.push(createTileWrapper(startX, startY, i, 1, TILE_SPRITE.CLOUD_TOP_MIDDLE));
    }
    arr.push(createTileWrapper(startX, startY, i, 0, TILE_SPRITE.CLOUD_BOTTOM_RIGHT));
    arr.push(createTileWrapper(startX, startY, i, 1, TILE_SPRITE.CLOUD_TOP_RIGHT));
  }
  return arr;
}

function bush(startX, bushLength) {
  const arr = [];
  const yCoord = 0;

  if (startX >= 0 && startX < worldLength) {
    arr.push(createTileWrapper(startX, yCoord, 0, 0, TILE_SPRITE.BUSH_LEFT_END));

    // Need to use var here so i remains in scope after the for loop
    for (var i = 1; i < bushLength + 1; i += 1) {
      arr.push(createTileWrapper(startX, yCoord, i, 0, TILE_SPRITE.BUSH_MIDDLE));
    }
    arr.push(createTileWrapper(startX, yCoord, i, 0, TILE_SPRITE.BUSH_RIGHT_END));
  }

  return arr;
}

function getRepetitiveSprites() {
  const array = [];
  for (let i = 0; i < worldLength; i += 768) {
    array.push(...[
      ...bigMountain(i),
      ...cloud(i + 128, 128, 1),
      ...bush(i + 176, 3),
      ...smallMountain(i + 256),
      ...cloud(i + 304, 144, 1),
      ...bush(i + 368, 1),
      ...cloud(i + 432, 128, 3),
      ...cloud(i + 576, 144, 2),
      ...bush(i + 656, 2),
    ]);
  }
  return array;
}

const nonBlockingObjects = [
  ...getRepetitiveSprites(),
];

export default nonBlockingObjects;
