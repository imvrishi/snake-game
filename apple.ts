import { Game } from "./game.js";

export class Apple {
  private _x = 0;
  private _y = 0;
  private readonly game: Game;

  constructor(game: Game) {
    this.game = game;
    this.spawn();
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  draw() {
    const { ctx, tileSize, blockSize } = this.game;
    ctx.fillStyle = "red";
    ctx.fillRect(this._x * tileSize, this._y * tileSize, blockSize, blockSize);
  }

  spawn() {
    this._x = this.random(0, this.game.tileCountX);
    this._y = this.random(0, this.game.tileCountY);

    for (const part of this.game.snake.parts) {
      if (part.x === this._x && part.y === this._y) {
        this.spawn();
        break;
      }
    }
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
