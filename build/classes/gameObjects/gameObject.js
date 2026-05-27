import { Assets } from "../assets.js";
var GameObject = /** @class */ (function () {
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0,
        };
        this.image = Assets.getDefaultImage();
        this.game = game;
        this.start();
    }
    GameObject.prototype.start = function () { };
    GameObject.prototype.update = function () { };
    GameObject.prototype.callUpdate = function () {
        this.update();
    };
    GameObject.prototype.collide = function (other) { };
    GameObject.prototype.callCollide = function (other) {
        this.collide(other);
    };
    GameObject.prototype.overlap = function (other) {
        if (
        // Check x axis overlap
        ((other.left() <= this.left() && this.left() <= other.right()) ||
            (other.left() <= this.right() && this.right() <= other.right()) ||
            (this.left() <= other.left() && other.left() <= this.right()) ||
            (this.left() <= other.right() && other.right() <= this.right())) &&
            // check y axis overlap
            ((other.top() <= this.top() && this.top() <= other.bottom()) ||
                (other.top() <= this.bottom() && this.bottom() <= other.bottom()) ||
                (this.top() <= other.top() && other.top() <= this.bottom()) ||
                (this.top() <= other.bottom() && other.bottom() <= this.bottom()))) {
            return true; // They overlap
        }
        else {
            return false; // They do not overlap
        }
    };
    GameObject.prototype.top = function () {
        return this.position.y;
    };
    GameObject.prototype.bottom = function () {
        return this.position.y + this.image.height;
    };
    GameObject.prototype.left = function () {
        return this.position.x;
    };
    GameObject.prototype.right = function () {
        return this.position.x + this.image.width;
    };
    GameObject.prototype.getImage = function () {
        return this.image;
    };
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    GameObject.prototype.getGame = function () {
        return this.game;
    };
    GameObject.prototype.setImage = function (image) {
        this.image = image;
    };
    GameObject.prototype.setPosition = function (position) {
        this.position = position;
    };
    return GameObject;
}());
export { GameObject };
