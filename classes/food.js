export default class Food extends PIXI.Sprite {
  constructor(x = 0, y = 0, width, height, texture) {
    super(texture);
    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
