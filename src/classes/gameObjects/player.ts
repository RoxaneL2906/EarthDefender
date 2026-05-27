import { Assets } from "../assets.js";
import { Input } from "../input.js";
import { GameObject } from "./gameObject.js";
import { Laser } from "./laser.js";

export class Player extends GameObject {
  private speed: number = 3;
  private lastFire: number = Date.now();

  protected start(): void {
    this.setImage(Assets.getPlayerImage());
    this.setPosition({
      x: this.getGame().CANVAS_WIDTH / 2,
      y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10,
    });
  }

  protected update(): void {
    this.setPosition({
      x:
        Math.max(0, (this.getPosition().x += this.speed * Input.getAxisX())) &&
        Math.min(
          (this.getPosition().x += this.speed * Input.getAxisX()),
          this.getGame().CANVAS_WIDTH - this.getImage().width
        ),
      y: this.getPosition().y,
    });

    if (Input.isFiring() && (Date.now() - this.lastFire> 100) && this.getGame().getLaserCount() < 5) {
      this.lastFire = Date.now();
      this.getGame().instanciate(new Laser(this.getGame()));
    }
  }
}
