import { Assets } from "../assets.js";
import { GameObject } from "./gameObject.js";

export class Star extends GameObject {
  private speed: number = 0.0625;

  protected start(): void {
    this.setImage(Assets.getStarImage());

    // Faites-le apparaître à une position aléatoire dans le canvas
    this.setPosition({
      x: Math.random() * this.getGame().CANVAS_WIDTH,
      y: Math.random() * this.getGame().CANVAS_HEIGHT - 10,
    });
  }

  protected update(): void {
    this.setPosition({
      x: this.getPosition().x,
      y: this.getPosition().y + this.speed,
    });

    if (this.getPosition().y > this.getGame().CANVAS_HEIGHT) {
      this.setPosition({
        x: this.getPosition().x,
        y: 0,
      });
    }
  }
}
