import { SURFACE } from './constants';

function getCollisionDirection(oX, oY, vY, vX) {
  if (oX >= oY) {
    if (vY > 0) {
      return { direction: SURFACE.TOP, correctionY: oY, correctionX: 0 }; // top side
      // shapeA.y += oY;
    }
    return { direction: SURFACE.BOTTOM, correctionY: -oY, correctionX: 0 }; // bottom side
      // shapeA.y -= oY;
  }
  if (vX > 0) {
    return { direction: SURFACE.LEFT, correctionY: 0, correctionX: oX }; // bottom side
    // shapeA.x += oX;
  }
  return { direction: SURFACE.RIGHT, correctionY: 0, correctionX: -oX }; // bottom side
  // shapeA.x -= oX;
}

function collisionCheck(shapeA, shapeB) {
  // get the vectors to check against
  const vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
  const vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
  // add the half widths and half heights of the objects
  const hWidths = (shapeA.width / 2) + (shapeB.width / 2);
  const hHeights = (shapeA.height / 2) + (shapeB.height / 2);

  /**
   * if the x and y vector are less than the half width or half height,
   * they we must be inside the object, causing a collision
   */
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    // figures out on which side we are colliding (top, bottom, left, or right)
    const oX = hWidths - Math.abs(vX);
    const oY = hHeights - Math.abs(vY);
    return getCollisionDirection(oX, oY, vY, vX);
  }
  return { direction: null, correctionY: 0, correctionX: 0 };
}

export default collisionCheck;
