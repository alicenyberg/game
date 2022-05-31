// import * as PIXI from 'pixi.js';
import Player from './classes/player.js';
import Monster from './classes/monster.js';
import Food from './classes/food.js';
// Canvas

// window.onload = function createCanvas() {
let app = new PIXI.Application({
  width: 1000,
  height: 800,
});

document.body.appendChild(app.view);

// add start game screen

let startScreen = new PIXI.Container();
app.stage.addChild(startScreen);

// add the background image startScreen

let startImage = PIXI.Sprite.from('/sprites/background.svg');
startImage.width = app.view.width;
startImage.height = app.view.height;
startScreen.addChild(startImage);

// add start button to the startScreen

let startButton = PIXI.Sprite.from('/sprites/startbutton.svg');
startButton.anchor.set(0.5);
startButton.x = app.view.width / 2;
startButton.y = app.view.height / 2;
startButton.buttonMode = true;
startButton.interactive = true;
startButton.on('click', clickButton);
startScreen.addChild(startButton);

// instuctions on how to play
let style = new PIXI.TextStyle({
  fontFamily: '"Lucida Console", Monaco, monospace',
  wordWrap: true,
  wordWrapWidth: 300,
  align: 'center',
  lineHeight: 35,
});

let startText = new PIXI.Text(
  'The tomato needs water and sun to grow! But psst..watch out for the moving enemies!',
  style
);
startText.anchor.set(0.5);
startText.x = app.view.width / 2;
startText.y = 190;
startScreen.addChild(startText);

let instructionText = new PIXI.Text('Move around with your arrow keys', style);
instructionText.anchor.set(0.5);
instructionText.x = app.view.width / 2;
instructionText.y = 680;
startScreen.addChild(instructionText);

let instructions = new PIXI.Sprite.from('/sprites/arrowkeys.svg');
instructions.anchor.set(0.5);
instructions.x = app.view.width / 2;
instructions.y = app.view.height / 1.4;
startScreen.addChild(instructions);

// function to switch between startScreen and gameScreen

function clickButton() {
  startScreen.visible = false;
  gameScreen.visible = true;
}

// add container game screen

let gameScreen = new PIXI.Container();
gameScreen.visible = false;
app.stage.addChild(gameScreen);

let gameRect = new PIXI.Graphics();
gameRect.drawRect(0, 0, app.view.width, app.view.height);
gameScreen.addChild(gameRect);

// add background image to gameScreen

let backgroundImage = PIXI.Sprite.from('/sprites/background.svg');
backgroundImage.width = app.view.width;
backgroundImage.height = app.view.height;
backgroundImage.x = 0;
backgroundImage.y = 0;
gameScreen.addChild(backgroundImage);

// game over container

let endScreen = new PIXI.Container();
endScreen.visible = false;
app.stage.addChild(endScreen);

let endRect = new PIXI.Graphics();
endRect.beginFill('000000');
endRect.drawRect(0, 0, app.view.width, app.view.height);
endScreen.addChild(endRect);

// play again button

let gameOverImage = PIXI.Sprite.from('/sprites/background.svg');
gameOverImage.width = app.view.width;
gameOverImage.height = app.view.height;
gameOverImage.x = 0;
gameOverImage.y = 0;
endScreen.addChild(gameOverImage);

let playAgain = new PIXI.Sprite.from('/sprites/button.svg');
playAgain.anchor.set(0.5);
playAgain.x = app.view.width / 2;
playAgain.y = app.view.height / 2;
playAgain.buttonMode = true;
playAgain.interactive = true;
playAgain.on('click', onClick);
endScreen.addChild(playAgain);

function onClick() {
  location.reload();
}

// endScreen.addChild(button);

// get sprites

app.loader.baseUrl = 'sprites';
app.loader
  .add('tomato', 'tomato.svg')
  .add('caterpillar', 'caterpillar.svg')
  .add('raindrop', 'raindrop.svg')
  .add('sun', 'sun.svg')
  .add('scarecrow', 'scarecrow.svg')
  .add('tomat', 'mini-tomato.svg')
  .add('sound', 'silly-intro.mp3');

//  check if everything is done loading

app.loader.onComplete.add(doneLoading);
app.loader.load();
// };

// When everything is done loading, start game (more or less)

function doneLoading() {
  createMonster();
  createPlayer();
  createFood();
  app.ticker.add(gameLoop);
}

// Function walls around game screen

function walls() {
  // wall to the left
  if (tomato.x < 0 + tomato.width / 2 || tomato.x < tomato.width / 2) {
    if (keys['37']) {
      keys['37'] = null;
    }
  }
  // wall to the top
  else if (tomato.y < 0 + tomato.height / 2 || tomato.y < tomato.height / 2) {
    if (keys['38']) {
      keys['38'] = null;
    }
  }
  // wall to the right
  else if (
    tomato.x > app.view.width - tomato.width / 2 ||
    tomato.x < tomato.width / 2
  ) {
    if (keys['39']) {
      keys['39'] = null;
    }
  }
  // wall to the down
  else if (
    tomato.y > app.view.height - tomato.height / 2 ||
    tomato.x < tomato.height / 2
  ) {
    if (keys['40']) {
      keys['40'] = null;
    }
  }
}

// Gameloop

function gameLoop() {
  caterpillar.move();
  scarecrow.move();
  walls();

  // Player movement

  if (keys['37']) {
    tomato.x -= 5;
  }
  if (keys['38']) {
    tomato.y -= 5;
  }
  if (keys['39']) {
    tomato.x += 5;
  }
  if (keys['40']) {
    tomato.y += 5;
  }

  // check collison between player and monster/food

  if (collision(tomato, caterpillar)) {
    endScreen.visible = true;
    gameScreen.visible = false;
  }

  if (collision(tomato, scarecrow)) {
    endScreen.visible = true;
    gameScreen.visible = false;
  }
  if (collision(tomato, raindrop)) {
    gameScreen.removeChild(scoreBoard);
    endScreen.removeChild(endScoreBoard);
    score++;
    drawScore();
    endScore++;
    endDrawScore();
    tomato.scale.x *= 1.01;
    tomato.scale.y *= 1.01;
    raindrop.x = Math.random() * app.screen.width;
    raindrop.y = Math.random() * app.screen.height;
  }
  if (collision(tomato, sun)) {
    gameScreen.removeChild(scoreBoard);
    endScreen.removeChild(endScoreBoard);
    score++;
    endScore++;
    endDrawScore();
    drawScore();
    tomato.scale.x *= 1.01;
    tomato.scale.y *= 1.01;
    sun.x = Math.random() * app.screen.width;
    sun.y = Math.random() * app.screen.height;
  }
}

// Collision function, check if player interacts with food or enemies

function collision(a, b) {
  let player = a.getBounds();
  let object = b.getBounds();

  return (
    player.x + player.width > object.x &&
    player.x < object.x + object.width &&
    player.y + object.height > object.y &&
    player.y < object.y + object.height
  );
}

// Player

let tomato;
// create player from class, and add to canvas
function createPlayer() {
  tomato = new Player(
    // players position on the canvas
    500,
    400,
    // player size
    120,
    120,
    // load the image
    app.loader.resources['tomato'].texture,
    // name of the figure
    'mr Tomato'
  );

  // add player to canvas
  gameScreen.addChild(tomato);
}

// Player movement, listen for keypress

function keyDown(e) {
  keys[e.keyCode] = true;
}
function keyUp(e) {
  keys[e.keyCode] = false;
}

let keys = {};

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

// Monsters

// create monster from class, and add to canvas

let scarecrow;
let caterpillar;

function createMonster() {
  caterpillar = new Monster(
    // placement on the canvas
    500,
    200,
    // size of the monster
    150,
    100,
    // image
    app.loader.resources['caterpillar'].texture,
    // name
    'Wormy',
    // speed
    4.5,
    app
  );

  scarecrow = new Monster(
    500,
    600,
    130,
    100,
    app.loader.resources['scarecrow'].texture,
    'scary',
    4,
    app
  );

  // add monster to canvas
  gameScreen.addChild(caterpillar, scarecrow);
}

// Food/points

let raindrop;
let sun;

function createFood() {
  raindrop = new Food(
    (Math.random() * app.screen.width) / 2,
    (Math.random() * app.screen.height) / 2,
    50,
    80,
    app.loader.resources['raindrop'].texture
  );

  sun = new Food(
    (Math.random() * app.screen.width) / 2,
    (Math.random() * app.screen.height) / 2,
    100,
    100,
    app.loader.resources['sun'].texture
  );

  gameScreen.addChild(raindrop, sun);
}

// scoreboard

let scoreBoard;
let score = 0;

function drawScore() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Roboto',
    fill: ['#ffffff'],
    fontSize: 50,
    fontWeight: 'bold',
  });

  scoreBoard = new PIXI.Text(score, style);
  scoreBoard.x = 10;
  gameScreen.addChild(scoreBoard);
}

drawScore();

// add score to end-screen

let endScoreBoard;
let endScore = 0;

const scoreText = new PIXI.Text('Your Score:', style);
scoreText.anchor.set(0.5);
scoreText.x = app.view.width / 2;
scoreText.y = 130;
endScreen.addChild(scoreText);

function endDrawScore() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Roboto',
    fill: ['#000000'],
    fontSize: 43,
  });

  endScoreBoard = new PIXI.Text(endScore, style);
  endScoreBoard.anchor.set(0.5);
  endScoreBoard.x = app.view.width / 2;
  endScoreBoard.y = 170;
  endScreen.addChild(endScoreBoard);
}

endDrawScore();
