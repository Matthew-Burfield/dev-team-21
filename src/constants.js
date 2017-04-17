export const canvas = document.getElementById("myCanvas");
export const ctx = canvas.getContext("2d");
export const characterSprites = new Image();
export const blockSprites = new Image();
export const friction = 0.8;
export const gravity = 0.3;
characterSprites.src = "sprites/mario.gif";
blockSprites.src = "sprites/blocks.png";