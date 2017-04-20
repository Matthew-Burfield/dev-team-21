export const canvas = document.getElementById('myCanvas');
export const ctx = canvas.getContext('2d');
export const heightToFloor = canvas.height - 8 - 16;
export const characterSprites = new Image();
export const blockSprites = new Image();
export const tileSprites = new Image();
export const itemSprites = new Image();
export const friction = 0.8;
export const gravity = 0.3;
export const worldLength = 3392;
characterSprites.src = 'sprites/mario.gif';
blockSprites.src = 'sprites/blocks.gif';
tileSprites.src = 'sprites/tileset.png';
itemSprites.src = 'sprites/items.png';

export const SURFACE = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM'
};


/**
 * SOUNDS
 */
export const AUDIO_ONE_UP = new Audio('sounds/smb_1-up.wav');
export const AUDIO_BREAK_BLOCK = new Audio('sounds/smb_breakblock.wav');
export const AUDIO_BUMP = new Audio('sounds/smb_bump.wav');
export const AUDIO_COIN = new Audio('sounds/smb_coin.wav');
export const AUDIO_FIREBALL = new Audio('sounds/smb_fireball.wav');
export const AUDIO_FIREWORKS = new Audio('sounds/smb_fireworks.wav');
export const AUDIO_FLAGPOLE = new Audio('sounds/smb_flagpole.wav');
export const AUDIO_GAME_OVER = new Audio('sounds/smb_gameover.wav');
export const AUDIO_JUMP_SMALL = new Audio('sounds/smb_jump-small.wav');
export const AUDIO_JUMP_SUPER = new Audio('sounds/smb_jump-super.wav');
export const AUDIO_KICK = new Audio('sounds/smb_kick.wav');
export const AUDIO_MARIO_DIE = new Audio('sounds/smb_mariodie.wav');
export const AUDIO_PAUSE = new Audio('sounds/smb_pause.wav');
export const AUDIO_PIPE = new Audio('sounds/smb_pipe.wav');
export const AUDIO_POWER_UP_APPEARS = new Audio('sounds/smb_powerup_appears.wav');
export const AUDIO_POWER_UP = new Audio('sounds/smb_powerup.wav');
export const AUDIO_STAGE_CLEAR = new Audio('sounds/smb_stage_clear.wav');
export const AUDIO_STOMP = new Audio('sounds/smb_stomp.wav');
export const AUDIO_VINE = new Audio('sounds/smb_vine.wav');
export const AUDIO_WARNING = new Audio('sounds/smb_warning.wav');
export const AUDIO_WORLD_CLEAR = new Audio('sounds/smb_world_clear.wav');
