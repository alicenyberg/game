import './app.js';

// Monster class

export default class Monster extends PIXI.Sprite {
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

  //   move() {
  //     this.x = this.x + this.speed;
  //     if (this.x > app.view.width - this.width / 2 || this.x < this.width / 2) {
  //       this.speed = -this.speed;
  //     }
  //   }
}
