import {
    canvas, blockSprites, tileSprites, ctx
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
        this.speed = 2.5;
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
    }, moveRight() {
        if (this.velX < this.speed) {
            this.moving = true;
            this.velX++;
            this.spriteStartY = 0;
            this.update();
        }
    }, moveLeft() {
        if (this.velX > -this.speed) {
            this.moving = true;
            this.velX--;
            this.spriteStartY = 17;
            this.update();
        }
    }, jump() {
        if (!this.jumping && this.grounded) {
            this.jumping = true;
            this.grounded = false;
            this.moving = true;
            this.velY -= this.speed * 2.55;
            this.update();
        }
    }, stop() {
        this.moving = false;
        this.update();
    }, render() {
        // Draw the animation
        this.context.drawImage(this.image, this.spriteStartX + (this.frameIndex * (this.width + this.spriteSeparator)), this.spriteStartY, this.width, this.height, this.x, this.y, this.width, this.height);
    }, update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            // Check to see if the current frame index is in range
            if (this.jumping) {
                this.frameIndex = 5;
            } else if (!this.moving) {
                this.frameIndex = 0;
            } else {
                if (this.frameIndex < this.numberOfFrames - 1) {
                    // Go to the next frame
                    this.frameIndex += 1;
                } else if (!this.singleAnimation) {
                    this.frameIndex = 0;
                }
            }
        }
    }
};
export const blockSprite = {
    width: 16,
    height: 16,
    image: blockSprites,
    init(options) {
        this.context = ctx;
        this.x = options.x;
        this.y = options.y || canvas.height - 16; //default to a floor block
        this.spriteX = options.spriteX || 80; // default to floor
        this.spriteY = options.spriteY || 194; // default to floor
        this.type = options.type;
        this.gotHit = false;
        this.gotBroken = false;
        this.delete = false;
        switch (this.type) {
        case 'brick':
            this.breakable = true;
            this.singleAnimation = true;
            this.animate = false;
            break;
        case 'question':
            this.breakable = false;
            this.singleAnimation = false;
            this.animate = true;
            break;
        }
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 31;
        this.numberOfFrames = options.numberOfFrames || 2;
    },
    hit() {
        if (this.breakable) {
            this.breakBlock();
        } else if (!this.gotHit) {
            this.gotHit = true;
            this.tickCount = 0;
            this.ticksPerFrame = 4;
            this.numberOfFrames = 4;
            this.frameIndex = 2;
            this.singleAnimation = true;
        }
    },
    breakBlock() {
        this.ticksPerFrame = 1;
        this.numberOfFrames = 3;
        this.tickCount = 0;
        this.frameIndex = 2;
        this.gotBroken = true;
    },
    
    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                // Go to the next frame
                this.frameIndex += 1;
            } else if (!this.singleAnimation) {
                this.frameIndex = 0;
            } else {
                // change the x to static block after hit
                if (this.gotBroken) {
                    this.delete = true;
                } else {
                                   this.animate = false;
                    this.spriteX += (this.frameIndex * this.width)
                }
            }
        }
    },
    render() {
        this.context.drawImage(this.image, this.spriteX + (this.frameIndex * this.width), this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
};
export const tileSprite = {
    image: tileSprites,
    init(options) {
        this.width = options.width || 16;
        this.height = options.height || 16;
        this.x = options.x;
        this.y = options.y;
        this.spriteX = options.spriteX;
        this.spriteY = options.spriteY;
        this.isBlocking = options.isBlocking || false;
        this.breakable = options.breakable || false;
    },
}