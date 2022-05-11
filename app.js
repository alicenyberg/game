// Canvas

let app;

window.onload = function () {
  app = new PIXI.Application({
    width: 500,
    height: 500,
  });

  document.body.appendChild(app.view);

  // get sprites

  app.loader.baseUrl = 'sprites';
  app.loader.add('tomato', 'hello.svg').add('caterpillar', 'caterpillar.png');

  //  check if everything is done loading

  app.loader.onComplete.add(doneLoading);
  app.loader.load();
};

// When everything is done loading, start game (more or less)

function doneLoading() {
  createMonster();
  createPlayer();
  app.ticker.add(gameLoop);
}

// Gameloop

function gameLoop() {
  caterpillar.move();

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
    300,
    300,
    100,
    100,
    app.loader.resources['tomato'].texture,
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
    100,
    100,
    50,
    50,
    app.loader.resources['caterpillar'].texture,
    'Wormy',
    3
  );

  // add monster to canvas

  app.stage.addChild(caterpillar);
}
