import { itemSprites,
  // canvas,
  ctx } from './constants';

const mushroom = {
  // Static Variables
  image: itemSprites,
  width: 16,
  height: 16,
  spriteX: 0,
  spriteY: 0,
  ticksPerFrame: 1,
  numberOfFrames: 2,
  gravity: 0.8,
  collision: true,

  // Instance Variables
  init(x, y) {
    this.x = x;
    this.y = y - this.height - this.height;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.velX = 0;
    this.velY = -5;
    this.grounded = false;
  },
  updatePosition(xOffset = 0, yOffset = 0) {
    this.x += xOffset;
    this.y += yOffset;
  },
  updateVelX(offset = 1) {
    this.velX *= offset;
  },
  updateVelY(offset = 0) {
    this.velY += offset;
  },
  ground(isGrounded) {
    this.grounded = isGrounded;
  },
  // const moveRight = () => {
  //   if (this.velX < speed) {
  //     this.moving = true;
  //     this.velX += 1;
  //     this.spriteY = 0;
  //     this.update();
  //   }
  // };

  // const moveLeft = () => {
  //   if (this.velX > -speed) {
  //     this.moving = true;
  //     this.velX -= 1;
  //     this.spriteY = 17;
  //     this.update();
  //   }
  // };

  // const getNextFrameIndex = () => {
  //   if (numberOfFrames === 0) return this.frameIndex;
  //   if (this.jumping) {
  //     return 5;
  //   }
  //   if (!this.moving || this.frameIndex >= numberOfFrames - 1) {
  //     return 0;
  //   }
  //   return this.frameIndex + 1;
  // };

  // const update = () => {
  //   this.tickCount += 1;
  //   if (this.tickCount > this.ticksPerFrame) {
  //     this.tickCount = 0;


  //     if (this.y - this.height > canvas.height && !this.isDead) {
  //       this.kill();
  //     }

  //     this.frameIndex = this.getNextFrameIndex();
  //   }
  // };
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.velY) {
        this.velY += this.gravity;
        this.y += this.velY;
        if (this.y >= this.placementY) {
          this.delete = true;
        }
      }

      if (this.frameIndex < this.numberOfFrames - 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  },

  render() {
    ctx.drawImage(
      this.image,
      this.spriteX,
      this.spriteY + (this.frameIndex * this.height),
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  },
};

export default mushroom;
