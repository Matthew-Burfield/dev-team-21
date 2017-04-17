import mario from './mario';
import * as constant from './constants';
import collisionCheck from './collisionDetection';
import {
    blockSprite, tileSprite
}
from './sprite';
import actionKeyPress from './keyHandler';
import {
    nonBlockingObjects
}
from './nonBlockingObjects';
var keys = [];
var updateList = [];

function gameLoop() {
    //handle key and check if mario is moving
    actionKeyPress(keys, mario);
    // Clear the screen
    constant.ctx.beginPath();
    constant.ctx.rect(0, 0, constant.canvas.width, constant.canvas.height);
    constant.ctx.fillStyle = '#2196F3';
    constant.ctx.fill();
    constant.ctx.closePath();
    /**
     * Draw non-blocking objects first so blocking objects get painted
     * on top if required
     */
    nonBlockingObjects.forEach(tile => {
        constant.ctx.drawImage(tile.image, tile.spriteX, tile.spriteY, tile.width, tile.height, tile.x, tile.y, tile.width, tile.height);
    });
    mario.velX *= constant.friction;
    mario.velY += constant.gravity;
    mario.grounded = false;
    boxes.forEach(box => {
            if(box.delete){
                boxes.splice(boxes.indexOf(box), 1); //remove it
               
            }
        if (box.animate) {
            box.render();
             box.update();
        }
        else {
            constant.ctx.drawImage(box.image, box.spriteX, box.spriteY, box.width, box.height, box.x, box.y, box.width, box.height);
        }
        var dir = collisionCheck(mario, box);
        if (dir === "l" || dir === "r") {
            mario.velX = 0;
            mario.jumping = false; //TODO tweak it a bit, can jump from the wall.
        }
        else if (dir === "b") {
            mario.grounded = true;
            mario.jumping = false;
        }
        else if (dir === "t") {
            box.hit();
            mario.velY = box.gotBroken? mario.velY: mario.velY*-1;
            if (box.type == "brick"){
                box.animate = true;
            }
            
        
        }
    });
    if (mario.grounded) {
        mario.velY = 0;
    }
    mario.x += mario.velX;
    mario.y += mario.velY;
    updateList.forEach(obj => {});
    mario.render();
    requestAnimationFrame(gameLoop);
}
const keyDownHandler = (e) => {
    keys[e.keyCode] = true;
}
const keyUpHandler = (e) => {
    keys[e.keyCode] = false;
}
const boxes = [];
for (let i = 0; i * blockSprite.width < constant.canvas.width; i += 1) {
    boxes.push(getFloorTile(i, 8));
    boxes.push(getFloorTile(i, 24));
}

function getFloorTile(i, yHeight) {
    const floor = Object.create(blockSprite);
    floor.init({
        x: i * blockSprite.width
        , y: constant.canvas.height - yHeight
    , });
    return floor;
}
boxes.push(createBlock('question', 16, 5));
boxes.push(createBlock('brick', 20, 5));
boxes.push(createBlock('question', 21, 5));
boxes.push(createBlock('brick', 22, 5));
boxes.push(createBlock('question', 23, 5));
boxes.push(createBlock('brick', 24, 5));
boxes.push(createBlock('question', 22, 9));
boxes.push(createTile({
    width: 32
    , height: 32
    , x: 28 * 16
    , y: constant.canvas.height - ((3 * 16) + 8)
    , spriteX: 0
    , spriteY: 128
    , isBlocking: true
, }));
boxes.push(createTile({
    width: 32
    , height: 16
    , x: 38 * 16
    , y: constant.canvas.height - ((2 * 16) + 8)
    , spriteX: 0
    , spriteY: 144
    , isBlocking: true
, }));
boxes.push(createTile({
    width: 32
    , height: 32
    , x: 38 * 16
    , y: constant.canvas.height - ((4 * 16) + 8)
    , spriteX: 0
    , spriteY: 128
    , isBlocking: true
, }));

function createBlock(type, numBlocksFromLeft, numBlocksHigh) {
    const box = Object.create(blockSprite);
    const x = numBlocksFromLeft * 16;
    const y = constant.canvas.height - ((numBlocksHigh * 16) + 8);
    const spriteY = 112;
    const spriteX = type === 'brick' ? 272 : 80;
    box.init({
        x, y, spriteY, spriteX, type
    });
    return box;
}

function createTile(options) {
    const tile = Object.create(tileSprite);
    tile.init(options);
    return tile;
}


// Start the game loop as soon as the sprite sheet is loaded
window.addEventListener("load", gameLoop);
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);