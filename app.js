const canvas = document.querySelector('#canvas');
const select = document.querySelector('#animations');
select.addEventListener('change', (e) => {
  playerState = e.target.value;
});

const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

const spriteWidth = 575;
const spriteHeight = 523;
const staggerFrames = 5;
let gameFrame = 0;
let playerState = 'idle';

const spriteAnimations = {};
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];

animationStates.forEach((state, idx) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let posX = i * spriteWidth;
    let posY = idx * spriteHeight;
    frames.loc.push({
      x: posX,
      y: posY,
    });
  }
  spriteAnimations[state.name] = frames;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const currentAnimation = spriteAnimations[playerState];
  let position =
    Math.floor(gameFrame / staggerFrames) % currentAnimation.loc.length;
  let frameX = spriteWidth * position;
  let frameY = currentAnimation.loc[position].y;
  //   ctx.drawImage(src , sx,sy,sw,sh,dx,dy,dw,dh)
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
