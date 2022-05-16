// Canvas

let app;

window.onload = function createCanvas() {
  app = new PIXI.Application({
    width: 500,
    height: 500,
  });

  document.body.appendChild(app.view);

  // get sprites

  app.loader.baseUrl = 'sprites';
  app.loader
    .add('tomato', 'hello.svg')
    .add('caterpillar', 'caterpillar.png')
    .add('raindrop', 'raindrop.svg')
    .add('sun', 'sun.svg')
    .add('scarecrow', 'scarecrow.svg')
    .add('tomat', 'mini-tomato.svg');

  //  check if everything is done loading

  app.loader.onComplete.add(doneLoading);
  app.loader.load();
};

// When everything is done loading, start game (more or less)

function doneLoading() {
  createMonster();
  createPlayer();
  createFood();
  app.ticker.add(gameLoop);
}

function newGame() {
  if (createMonster()) {
    createCanvas();
  }
  if (createPlayer()) {
    createCanvas();
  }
  if (createFood()) {
    createCanvas();
  }
}

// Gameloop

function gameLoop() {
  caterpillar.move();
  scarecrow.move();

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

  let points = 0;

  if (collision(tomato, caterpillar)) {
    console.log('game over!');
    // "Funkar" men fullösning. Tar dessutom bort console logen. vilket knaske ändå är okej om det ska innebära game over
    // location.reload();
    // app.ticker.remove(gameLoop());
    // gamla bilden blir kvar och allt går snabbare och snabbare
    // doneLoading();
    newGame();
  }

  if (collision(tomato, scarecrow)) {
    console.log('game over!');
    // "Funkar" men fullösning. Tar dessutom bort console logen. vilket knaske ändå är okej om det ska innebära game over
    // location.reload();
    // app.ticker.remove(gameLoop());
    // gamla bilden blir kvar och allt går snabbare och snabbare
    // doneLoading();
  }

  if (collectPoints(tomato, raindrop)) {
    points++;
    console.log(points);
    raindrop.x = (Math.random() * app.screen.width) / 2;
    raindrop.y = (Math.random() * app.screen.height) / 2;
  }
  if (collectPoints(tomato, sun)) {
    sun.x = (Math.random() * app.screen.width) / 2;
    sun.y = (Math.random() * app.screen.height) / 2;
    points++;
    console.log(points);
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
    100,
    100,
    // load the image
    app.loader.resources['tomato'].texture,
    // name of the figure
    'mr Tomato'
  );

  // add player to canvas

  app.stage.addChild(tomato);
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
    50,
    50,
    // image
    app.loader.resources['caterpillar'].texture,
    // name
    'Wormy',
    // speed
    3
  );

  scarecrow = new Monster(
    400,
    400,
    100,
    100,
    app.loader.resources['scarecrow'].texture,
    'scary',
    5
  );

  // add monster to canvas

  app.stage.addChild(caterpillar, scarecrow);
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
    50,
    app.loader.resources['raindrop'].texture
  );

  sun = new Food(
    (Math.random() * app.screen.width) / 2,
    (Math.random() * app.screen.height) / 2,
    50,
    50,
    app.loader.resources['sun'].texture
  );

  app.stage.addChild(raindrop, sun);
}

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
