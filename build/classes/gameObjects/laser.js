var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Assets } from "../assets.js";
import { Alien } from "./alien.js";
import { GameObject } from "./gameObject.js";
var Laser = /** @class */ (function (_super) {
    __extends(Laser, _super);
    function Laser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 5;
        return _this;
    }
    Laser.prototype.start = function () {
        this.setImage(Assets.getLaserImage());
        var player = this.getGame().getPlayer();
        var playerPosition = player.getPosition();
        this.setPosition({
            x: playerPosition.x +
                player.getImage().width / 2 -
                this.getImage().width / 2,
            y: playerPosition.y - this.getImage().height,
        });
    };
    Laser.prototype.update = function () {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y - this.speed,
        });
        if (this.getPosition().y < 0) {
            this.getGame().destroy(this);
        }
    };
    Laser.prototype.collide = function (other) {
        if (other instanceof Alien) {
            this.getGame().destroy(other);
            this.getGame().destroy(this);
        }
    };
    return Laser;
}(GameObject));
export { Laser };
