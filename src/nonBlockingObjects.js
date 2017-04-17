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
};

const nonBlockingObjects = bigMountain(0, 0);

/**
 * Creates a big non blocking mountain to paint to the background
 * 
 * @param {number} startX The bottom left corner coordinate of the mountain
 * @param {number} startY The bottom left corner coordinate of the mountain
 */
export function bigMountain(startX, startY) {
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