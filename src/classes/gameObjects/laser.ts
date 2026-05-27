import { Assets } from "../assets.js";
import { Position } from "../position.js";
import { Alien } from "./alien.js";
import { GameObject } from "./gameObject.js";
import { Player } from "./player.js";

export class Laser extends GameObject {
  private speed: number = 5;
  protected start(): void {
    this.setImage(Assets.getLaserImage());

    const player: Player = this.getGame().getPlayer();
    const playerPosition: Position = player.getPosition();

    this.setPosition({
      x:
        playerPosition.x +
        player.getImage().width / 2 -
        this.getImage().width / 2,
      y: playerPosition.y - this.getImage().height,
    });
  }

  protected update(): void {
    this.setPosition({
      x: this.getPosition().x,
      y: this.getPosition().y - this.speed,
    });

    if (this.getPosition().y < 0) {
      this.getGame().destroy(this);
    }
  }

  protected collide(other: GameObject): void {
    if (other instanceof Alien) {
      this.getGame().destroy(other);
      this.getGame().destroy(this);
    }
  }
}
