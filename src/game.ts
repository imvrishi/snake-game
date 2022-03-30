import { Apple } from "./apple";
import { Snake } from "./snake";
import { config } from "./config";

const { canvasWidth, canvasHeight, fontMaxLimit, fontMinLimit } =
  config;

export class Game {
  private lastRenderTime = 0;
  private isGameOver = false;
  public score = 0;
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  public readonly snake: Snake;
  public readonly apple: Apple;

  constructor() {
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.draw = this.draw.bind(this);

    this.canvas = document.getElementById("board") as HTMLCanvasElement;
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    if (this.canvas.parentElement) {
      this.canvas.parentElement.addEventListener(
        "keydown",
        this.handleKeyPress
      );
    } else {
      console.log("Probably the html structure has changed");
    }

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.snake = new Snake(this);
    this.apple = new Apple(this);

    window.requestAnimationFrame(this.draw);
  }

  draw(currentTime: number) {
    const timeSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    window.requestAnimationFrame(this.draw);
    if (timeSinceLastRender < 1 / config.frameRate) return;
    this.lastRenderTime = currentTime;

    this.snake.move();
    if (!this.isGameOver) this.isGameOver = this.snake.isGameOver();
    if (this.isGameOver) return;
    this.clear();
    this.snake.eat();
    this.apple.draw();
    this.snake.draw();
    this.drawScore();
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  drawScore() {
    const scoreString = `Score: ${this.score} - Speed: ${config.frameRate}`;
    this.ctx.fillStyle = "white";
    let fontSize = canvasWidth / 40;
    fontSize = Math.min(fontMaxLimit, fontSize);
    fontSize = Math.max(fontMinLimit, fontSize);
    this.ctx.font = fontSize + "pt Verdana";
    const textWidth = this.ctx.measureText(scoreString).width;
    this.ctx.fillText(scoreString, canvasWidth - textWidth, fontSize);
  }

  handleKeyPress(e: KeyboardEvent) {
    switch (e.code) {
      case "KeyW":
      case "KeyI":
      case "ArrowUp":
        if (this.snake.velocityY === 1) return;
        this.snake.dir(0, -1);
        break;
      case "KeyS":
      case "KeyK":
      case "ArrowDown":
        if (this.snake.velocityY === -1) return;
        this.snake.dir(0, 1);
        break;
      case "KeyA":
      case "KeyJ":
      case "ArrowLeft":
        if (this.snake.velocityX === 1) return;
        this.snake.dir(-1, 0);
        break;
      case "KeyL":
      case "KeyD":
      case "ArrowRight":
        if (this.snake.velocityX === -1) return;
        this.snake.dir(1, 0);
        break;
    }
  }
}

new Game();
