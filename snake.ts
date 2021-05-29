import { SnakeParts } from "./snake-parts.js";
import { Game } from "./game.js";

export class Snake {
  private headX = 0;
  private headY = 0;
  private _velocityX = 0;
  private _velocityY = 0;
  private readonly game: Game;
  private tailLength = 0;
  public readonly parts: SnakeParts[] = [];

  constructor(game: Game) {
    this.headX = Math.floor(game.tileCountX / 2);
    this.headY = Math.floor(game.tileCountY / 2);
    this.game = game;
  }

  get velocityX() {
    return this._velocityX;
  }

  get velocityY() {
    return this._velocityY;
  }

  draw() {
    const { ctx, tileSize, blockSize } = this.game;

    while (this.parts.length > this.tailLength) {
      this.parts.pop();
    }
    this.parts.unshift(new SnakeParts(this.headX, this.headY));
    for (const part of this.parts) {
      ctx.fillStyle = "green";
      ctx.fillRect(part.x * tileSize, part.y * tileSize, blockSize, blockSize);
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(
      this.headX * tileSize,
      this.headY * tileSize,
      blockSize,
      blockSize
    );
  }

  dir(x: number, y: number) {
    this._velocityX = x;
    this._velocityY = y;
  }

  move() {
    this.headX = this.headX + this._velocityX;
    this.headY = this.headY + this._velocityY;
  }

  eat() {
    const { apple } = this.game;
    if (apple.x === this.headX && apple.y === this.headY) {
      apple.spawn();
      this.game.score++;
      this.tailLength++;
      if (this.game.score && this.game.score % 5 === 0) {
        this.game.frameRate += 5;
      }
    }
  }

  isGameOver() {
    let isGameOver = false;
    if (this._velocityX === 0 && this._velocityY === 0) {
      return false;
    }

    const { tileCountX, tileCountY } = this.game;
    if (this.headX < 0) {
      isGameOver = true;
    } else if (this.headX === tileCountX) {
      isGameOver = true;
    } else if (this.headY < 0) {
      isGameOver = true;
    } else if (this.headY === tileCountY) {
      isGameOver = true;
    }

    for (const part of this.parts) {
      if (part.x === this.headX && part.y === this.headY) {
        isGameOver = true;
        break;
      }
    }

    if (isGameOver) {
      const { ctx, canvas } = this.game;
      const scoreString = `Game Over!`;
      ctx.fillStyle = "white";
      const fontSize = canvas.width / 10;
      ctx.font = fontSize + "pt Verdana";
      const textWidth = ctx.measureText(scoreString).width;
      ctx.fillText(
        scoreString,
        canvas.width / 2 - textWidth / 2,
        canvas.height / 2
      );
    }

    return isGameOver;
  }
}
