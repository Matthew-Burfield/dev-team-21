import {
    canvas
}
from './constants';

export const movingSprite = {
    init(options) {
            this.context = options.context;
            this.width = options.width;
            this.height = options.height;
            this.image = options.image;
            this.jumping = false;
            this.grounded = false;
            this.moving = false;
            this.speed = 3;
            this.velX = 0;
            this.velY = 0;

            // Sprite logic
            this.frameIndex = 0;
            this.tickCount = 0;
            this.ticksPerFrame = options.ticksPerFrame || 0;
            this.numberOfFrames = options.numberOfFrames || 1;
            this.spriteStartX = options.spriteStartX;
            this.spriteStartY = options.spriteStartY;
            this.spriteSeparator = options.spriteSeparator;
            this.spriteSeparator = options.spriteSeparator;
            this.faceRight = true;

            // Canvas position
            this.x = 0;
            this.y = 0;
        },
        moveRight() {
            if (this.velX < this.speed) {
                this.moving = true;
                this.velX++;
                this.spriteStartY = 0;
                this.update();
            }
        },
        moveLeft() {
            if (this.velX > -this.speed) {
                this.moving = true;
                this.velX--;
                this.spriteStartY = 17;
                this.update();
            }
        },
        jump() {
            if (!this.jumping && this.grounded) {
                this.jumping = true;
                this.grounded = false;
                this.moving = true;
                this.velY -= this.speed * 2;
                this.update();
            }
        },
        stop() {
            this.moving = false;
            this.update();

        },
        render() {

            // Draw the animation
            this.context.drawImage(
                this.image,
                this.spriteStartX + (this.frameIndex * (this.width + this.spriteSeparator)),
                this.spriteStartY,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height
            );

        },
        update() {
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;

                // Check to see if the current frame index is in range
                 if (this.jumping) {
                    this.frameIndex = 5;
                     } 
                     else if(!this.moving) {
                    this.frameIndex = 0;
                } else {
                    if (this.frameIndex < this.numberOfFrames - 1) {
                        // Go to the next frame
                        this.frameIndex += 1;
                    } else if (!this.singleAnimation){
                        this.frameIndex = 0;
                    }
                }


            }
        },
};

export const blockSprite = {
    width: 16,
    height: 16,
    spriteX: 272,
    spriteY: 112,
    init(options) {
        this.x = options.x;
        this.y = options.y || canvas.height - 16;
        this.image = options.image;
        this.breakable = options.breakable | false;
    },

    

};