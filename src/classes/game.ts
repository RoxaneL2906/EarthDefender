import { Alien } from "./gameObjects/alien.js";
import { Earth } from "./gameObjects/earth.js";
import { GameObject } from "./gameObjects/gameObject.js";
import { Laser } from "./gameObjects/laser.js";
import { Player } from "./gameObjects/player.js";
import { Star } from "./gameObjects/star.js";
import { Input } from "./input.js";

export class Game {
  private context: CanvasRenderingContext2D;
  public readonly CANVAS_WIDTH: number = 900;
  public readonly CANVAS_HEIGHT: number = 600;

  private gameObjects: GameObject[] = [];
  private player: Player;
  private earth: Earth;
  private nbAliens: number = 10;
  private nbStars: number = 100;
  private wave: number = 1;

  constructor() {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    canvas.height = this.CANVAS_HEIGHT;
    canvas.width = this.CANVAS_WIDTH;
    this.context = canvas.getContext("2d");
  }

  public start(): void {
    this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.context.fillStyle = "#141414";
    this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    for (let i = 0; i < this.nbStars; i++) {
      this.instanciate(new Star(this));
    }

    this.earth = new Earth(this);
    this.instanciate(this.earth);

    this.player = new Player(this);
    this.instanciate(this.player);

    this.generateAliens();

    // Écoute les inputs
    Input.listen();
    // Démarre la boucle de jeu
    this.loop();
  }

  private generateAliens() {
    for (let i = 0; i < this.nbAliens; i++) {
      this.instanciate(new Alien(this));
    }
  }

  private draw(gameObject: GameObject) {
    this.context.drawImage(
      gameObject.getImage(),
      gameObject.getPosition().x,
      gameObject.getPosition().y,
      gameObject.getImage().width,
      gameObject.getImage().height
    );
  }

  private loop() {
    setInterval(() => {
      // J'efface la frame précédente.
      this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      this.context.fillStyle = "#141414";
      this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

      this.player.callUpdate();
      this.draw(this.player);

      this.gameObjects.forEach((g) => {
        g.callUpdate();
        this.draw(g);

        this.gameObjects.forEach((other) => {
          if (other != g && g.overlap(other)) {
            g.callCollide(other); // J'appelle la méthode collide de mon GameObject
          }
        });
      });

      if (this.gameObjects.filter((g) => g instanceof Alien).length === 0) {
        this.generateAliens();
        this.wave++;
      }
    }, 16);
    // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
  }

  public instanciate(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
  }

  public destroy(gameObject: GameObject): void {
    this.gameObjects = this.gameObjects.filter((go) => go != gameObject);
  }

  public over() {
    alert("GameOver!");
    window.location.reload();
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getLaserCount(): number {
    return this.gameObjects.filter((g) => g instanceof Laser).length;
  }

  public getWave(): number {
    return this.wave;
  }
}
