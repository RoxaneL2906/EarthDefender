import { Assets } from "../assets.js";
import { Input } from "../input.js";
import { GameObject } from "./gameObject.js";
import { Laser } from "./laser.js";

export class Earth extends GameObject {

  protected start(): void {
    this.setImage(Assets.getEarthImage());
    this.setPosition({
      x: (this.getGame().CANVAS_WIDTH - this.getImage().width) / 2 ,
      y: this.getGame().CANVAS_HEIGHT - this.getImage().height + 20,
    });
  }
}
