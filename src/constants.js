export const canvas = document.getElementById('myCanvas');
export const ctx = canvas.getContext('2d');
export const heightToFloor = canvas.height - 8 - 16;
export const characterSprites = new Image();
export const blockSprites = new Image();
export const tileSprites = new Image();
export const friction = 0.8;
export const gravity = 0.3;
export const worldLength = 3392;
characterSprites.src = 'sprites/mario.gif';
blockSprites.src = 'sprites/blocks.gif';
tileSprites.src = 'sprites/tileset.png';

export const SURFACE = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM'
};
