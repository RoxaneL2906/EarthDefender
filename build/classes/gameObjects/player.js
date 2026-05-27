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
import { Input } from "../input.js";
import { GameObject } from "./gameObject.js";
import { Laser } from "./laser.js";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 3;
        _this.lastFire = Date.now();
        return _this;
    }
    Player.prototype.start = function () {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10,
        });
    };
    Player.prototype.update = function () {
        this.setPosition({
            x: Math.max(0, (this.getPosition().x += this.speed * Input.getAxisX())) &&
                Math.min((this.getPosition().x += this.speed * Input.getAxisX()), this.getGame().CANVAS_WIDTH - this.getImage().width),
            y: this.getPosition().y,
        });
        if (Input.isFiring() && (Date.now() - this.lastFire > 100) && this.getGame().getLaserCount() < 5) {
            this.lastFire = Date.now();
            this.getGame().instanciate(new Laser(this.getGame()));
        }
    };
    return Player;
}(GameObject));
export { Player };
