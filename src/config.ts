class Config {
  private static _instance: Config | null = null;
  public frameRate = 10;
  public readonly tileSize = 30;
  public readonly blockSize: number;
  public readonly tileCountX: number;
  public readonly tileCountY: number;
  public readonly canvasWidth: number;
  public readonly canvasHeight: number;
  public readonly fontMinLimit = 10;
  public readonly fontMaxLimit = 20;

  private constructor() {
    this.blockSize = this.tileSize - 2;
    this.canvasWidth = window.innerWidth - (window.innerWidth % this.tileSize);
    this.canvasHeight =
      window.innerHeight - (window.innerHeight % this.tileSize);
    this.tileCountX = Math.floor(this.canvasWidth / this.tileSize);
    this.tileCountY = Math.floor(this.canvasHeight / this.tileSize);
  }

  static instance() {
    if (this._instance == null) {
      this._instance = new Config();
    }

    return this._instance;
  }
}

const config = Config.instance();
export { config };
