import { Assets } from "../assets.js";
import { Earth } from "./earth.js";
import { GameObject } from "./gameObject.js";
import { Player } from "./player.js";

export class Alien extends GameObject {
  private speed: number = 0.5;

  protected start(): void {
    // Définissez l'image de l'alien
    this.setImage(Assets.getAlienImage());

    // Faites-le apparaître à une position aléatoire dans le canvas
    this.setPosition({
      x: Math.random() * (this.getGame().CANVAS_WIDTH - this.getImage().width),
      y: (Math.random() * this.getGame().CANVAS_HEIGHT) / 4 - 50,
    });
  }

  protected update(): void {
    // Faites avancer l'alien vers le bas du Canvas
    this.setPosition({
      x: this.getPosition().x,
      y: this.getPosition().y += this.speed * (1 + super.getGame().getWave() * 0.5),
    });
  }

  protected collide(other: GameObject): void {
    if (other instanceof Player || other instanceof Earth) {
      console.log("Miam miam");
      super.getGame().over();
    }
  }
}
