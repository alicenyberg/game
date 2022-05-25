// Canvas

// detta vill vi ha i en klass istället?

// window.onload = function createCanvas() {
let app = new PIXI.Application({
  width: 1000,
  height: 720,
});

document.body.appendChild(app.view);

// add start game screen

startScreen = new PIXI.Container();
app.stage.addChild(startScreen);

// add the background image startScreen

let startImage = PIXI.Sprite.from('/sprites/background.svg');
startImage.width = app.view.width;
startImage.height = app.view.height;
// startImage.buttonMode = true;
// startImage.interactive = true;
// startImage.on('click', clickButton);
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
  'The tomato wants some water and sun! but psst..watch out for the moving enemies!',
  style
);
startText.x = 350;
startText.y = 90;
startScreen.addChild(startText);

let instructionText = new PIXI.Text('Move around with your arrow keys', style);
instructionText.x = 375;
instructionText.y = 580;
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

gameScreen = new PIXI.Container();
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

endScreen = new PIXI.Container();
endScreen.visible = false;
app.stage.addChild(endScreen);

let endRect = new PIXI.Graphics();
endRect.beginFill(000000);
endRect.drawRect(0, 0, app.view.width, app.view.height);
endScreen.addChild(endRect);

// let gameOverText = new PIXI.Text('Game Over');
// gameOverText.anchor.set(0.5);
// gameOverText.x = app.view.width / 3;
// gameOverText.y = app.view.height / 5;
// gameOverText.style = new PIXI.TextStyle({
//   fontSize: 40,
//   fontStyle: 'bold',
//   color: '#FFFFFF',
// });
// endScreen.addChild(gameOverText);

// play again text

// let playAgainText = new PIXI.Text('Play Again?');
// playAgainText.anchor.set(0.5);
// playAgainText.x = app.view.width / 2;
// playAgainText.y = app.view.height / 3;
// endScreen.addChild(playAgainText);

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

// put in loader
// get sprites

app.loader.baseUrl = 'sprites';
app.loader
  .add('tomato', 'tomato.svg')
  .add('caterpillar', 'caterpillar.svg')
  .add('raindrop', 'raindrop.svg')
  .add('sun', 'sun.svg')
  .add('scarecrow', 'scarecrow.svg')
  .add('tomat', 'mini-tomato.svg');

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

function resetGame() {}

// Function walls around game screen
function walls() {
  // wall to the left
  if (tomato.x < 0 + tomato.width / 2 || tomato.x < tomato.width / 2) {
    console.log(app.view.width);
    console.log('outside');
    console.log(tomato.x);
    if (keys['37']) {
      keys['37'] = null;
    }
  }
  // wall to the top
  else if (tomato.y < 0 + tomato.height / 2 || tomato.y < tomato.height / 2) {
    console.log('outside');
    if (keys['38']) {
      keys['38'] = null;
    }
  }
  // wall to the right
  else if (
    tomato.x > app.view.width - tomato.width / 2 ||
    tomato.x < tomato.width / 2
  ) {
    console.log('outside');
    console.log(app.width);
    console.log(tomato.x);
    if (keys['39']) {
      keys['39'] = null;
    }
  }
  // wall to the down
  else if (
    tomato.y > app.view.height - tomato.height / 2 ||
    tomato.x < tomato.height / 2
  ) {
    console.log('outside');
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

  if (collision(tomato, caterpillar)) {
    endScreen.visible = true;
    gameScreen.visible = false;
  }

  if (collision(tomato, scarecrow)) {
    endScreen.visible = true;
    gameScreen.visible = false;
  }
  if (collectPoints(tomato, raindrop)) {
    gameScreen.removeChild(scoreBoard);
    score++;
    drawScore();
    console.log(score);
    raindrop.x = Math.random() * app.screen.width;
    raindrop.y = Math.random() * app.screen.height;
  }
  if (collectPoints(tomato, sun)) {
    gameScreen.removeChild(scoreBoard);
    score++;
    drawScore();
    console.log(score);
    sun.x = Math.random() * app.screen.width;
    sun.y = Math.random() * app.screen.height;
  }
}

// Collision function

function collision(a, b) {
  let player = a.getBounds();
  let enemy = b.getBounds();

  return (
    player.x + player.width > enemy.x &&
    player.x < enemy.x + enemy.width &&
    player.y + enemy.height > enemy.y &&
    player.y < enemy.y + enemy.height
  );
}

// Player

let tomato;

// Player class

class Player extends PIXI.Sprite {
  constructor(x = 0, y = 0, width, height, texture, name = 'none') {
    super(texture);
    this.anchor.set(0.5);
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
// create player from class, and add to canvas
function createPlayer() {
  tomato = new Player(
    // players position on the canvas
    250,
    250,
    // player size
    120,
    120,
    // load the image
    app.loader.resources['tomato'].texture,
    // name of the figure
    'mr Tomato'
  );

  // add player to canvas

  // app.stage.addChild(tomato);
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

// Monster

let caterpillar;

// Monster class

class Monster extends PIXI.Sprite {
  constructor(x = 0, y = 0, width, height, texture, name = 'none', speed = 5) {
    super(texture);
    this.anchor.set(0.5);
    this.name = name;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // monster movement

  move() {
    this.x = this.x + this.speed;
    if (this.x > app.view.width - this.width / 2 || this.x < this.width / 2) {
      this.speed = -this.speed;
    }
  }
}

// create monster from class, and add to canvas

function createMonster() {
  caterpillar = new Monster(
    // placement on the canvas
    100,
    100,
    // size of the monster
    150,
    100,
    // image
    app.loader.resources['caterpillar'].texture,
    // name
    'Wormy',
    // speed
    4.5
  );

  scarecrow = new Monster(
    400,
    400,
    130,
    100,
    app.loader.resources['scarecrow'].texture,
    'scary',
    4
  );

  // add monster to canvas

  gameScreen.addChild(caterpillar, scarecrow);
}

// Food/points

class Food extends PIXI.Sprite {
  constructor(x = 0, y = 0, width, height, texture) {
    super(texture);
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

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

let scoreboard;
let score = 0;

function drawScore() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Roboto',
    fill: ['#000000'],
    fontSize: 43,
  });

  scoreBoard = new PIXI.Text(score, style);
  gameScreen.addChild(scoreBoard);
}

drawScore();

// function to collect points

function collectPoints(a, b) {
  let player = a.getBounds();
  let food = b.getBounds();

  return (
    player.x + player.width > food.x &&
    player.x < food.x + food.width &&
    player.y + food.height > food.y &&
    player.y < food.y + food.height
  );
}
