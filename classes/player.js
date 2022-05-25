// Player class

export default class Player extends PIXI.Sprite {
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
