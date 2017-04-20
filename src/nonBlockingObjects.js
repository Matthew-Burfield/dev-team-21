import { tileSprite } from './sprite';
import { heightToFloor } from './constants';

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
  CLOUD_BOTTOM_RIGHT: { x: 32, y: 336 }
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
 * @param {number} startY The bottom left corner coordinate of the mountain
 */
function bigMountain(startX, startY) {
  const bottomUpwardSlope = createTileWrapper(startX, startY, 0, 0, TILE_SPRITE.MOUNTAIN_UPWARD_SLOPE);
  const bottomRightDot = createTileWrapper(startX, startY, 1, 0, TILE_SPRITE.MOUNTAIN_RIGHT_DOTS);
  const bottomCenter = createTileWrapper(startX, startY, 2, 0, TILE_SPRITE.MOUNTAIN_CENTER);
  const bottomLeftDots = createTileWrapper(startX, startY, 3, 0, TILE_SPRITE.MOUNTAIN_LEFT_DOTS);
  const bottomDownwardSlope = createTileWrapper(startX, startY, 4, 0, TILE_SPRITE.MOUNTAIN_DOWNWARD_SLOPE);
  const upperUpwardSlope = createTileWrapper(startX, startY, 1, 1, TILE_SPRITE.MOUNTAIN_UPWARD_SLOPE);
  const upperRightDot = createTileWrapper(startX, startY, 2, 1, TILE_SPRITE.MOUNTAIN_RIGHT_DOTS);
  const upperDownwardSlope = createTileWrapper(startX, startY, 3, 1, TILE_SPRITE.MOUNTAIN_DOWNWARD_SLOPE);
  const top = createTileWrapper(startX, startY, 2, 2, TILE_SPRITE.MOUNTAIN_TOP);

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

function smallMountain(startX, startY) {
  return [createTileWrapper(startX, startY, 0, 0, TILE_SPRITE.MOUNTAIN_UPWARD_SLOPE),
    createTileWrapper(startX, startY, 1, 0, TILE_SPRITE.MOUNTAIN_RIGHT_DOTS),
    createTileWrapper(startX, startY, 2, 0, TILE_SPRITE.MOUNTAIN_DOWNWARD_SLOPE),
    createTileWrapper(startX, startY, 1, 1, TILE_SPRITE.MOUNTAIN_TOP),
  ];
}

function cloud(startX, startY, cloudLength) {
  const arr = [];
  arr.push(createTileWrapper(startX, startY, 0, 0, TILE_SPRITE.CLOUD_BOTTOM_LEFT));
  arr.push(createTileWrapper(startX, startY, 0, 1, TILE_SPRITE.CLOUD_TOP_LEFT));

  // Need to use var here so i remains in scope after the for loop
  for (var i = 1; i < cloudLength + 1; i += 1) {
    arr.push(createTileWrapper(startX, startY, i, 0, TILE_SPRITE.CLOUD_BOTTOM_MIDDLE));
    arr.push(createTileWrapper(startX, startY, i, 1, TILE_SPRITE.CLOUD_TOP_MIDDLE));
  }
  arr.push(createTileWrapper(startX, startY, i, 0, TILE_SPRITE.CLOUD_BOTTOM_RIGHT));
  arr.push(createTileWrapper(startX, startY, i, 1, TILE_SPRITE.CLOUD_TOP_RIGHT));

  return arr;
}

function bush(startX, startY, bushLength) {
  const arr = [];
  arr.push(createTileWrapper(startX, startY, 0, 0, TILE_SPRITE.BUSH_LEFT_END));

  // Need to use var here so i remains in scope after the for loop
  for (var i = 1; i < bushLength + 1; i += 1) {
    arr.push(createTileWrapper(startX, startY, i, 0, TILE_SPRITE.BUSH_MIDDLE));
  }
  arr.push(createTileWrapper(startX, startY, i, 0, TILE_SPRITE.BUSH_RIGHT_END));

  return arr;
}

const nonBlockingObjects = [
  ...bigMountain(0, 0),
  ...bush(176, 0, 3),
  ...smallMountain(256, 0),
  ...bush(368, 0, 1),
  ...cloud(304, 160, 1),
  ...cloud(432, 128, 3),
  ...cloud(576, 160, 2)
];

export default nonBlockingObjects;
