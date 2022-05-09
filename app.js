const app = new PIXI.Application({
  width: 500,
  height: 500,
});

document.body.appendChild(app.view);

const tomato = PIXI.Sprite.from('hello.svg');
tomato.anchor.set(0.5);
tomato.x = app.screen.width / 2;
tomato.y = app.screen.width / 2;
tomato.width = 100;
tomato.height = 100;

app.stage.addChild(tomato);

// keys movement

let keys = {};
let keysDiv;

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

app.ticker.add(movement);

function keyDown(e) {
  keys[e.keyCode] = true;
}
function keyUp(e) {
  keys[e.keyCode] = false;
}

function movement() {
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
