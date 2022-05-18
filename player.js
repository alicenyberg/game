const Container = PIXI.Container,
  Application = PIXI.Application;

let app;

app = new Application({
  width: 500,
  height: 500,
});

document.body.appendChild(app.view);
