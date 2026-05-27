import { Alien } from "./gameObjects/alien.js";
import { Earth } from "./gameObjects/earth.js";
import { Laser } from "./gameObjects/laser.js";
import { Player } from "./gameObjects/player.js";
import { Star } from "./gameObjects/star.js";
import { Input } from "./input.js";
var Game = /** @class */ (function () {
    function Game() {
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        this.gameObjects = [];
        this.nbAliens = 10;
        this.nbStars = 100;
        this.wave = 1;
        var canvas = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.start = function () {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        for (var i = 0; i < this.nbStars; i++) {
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
    };
    Game.prototype.generateAliens = function () {
        for (var i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }
    };
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            // J'efface la frame précédente.
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.player.callUpdate();
            _this.draw(_this.player);
            _this.gameObjects.forEach(function (g) {
                g.callUpdate();
                _this.draw(g);
                _this.gameObjects.forEach(function (other) {
                    if (other != g && g.overlap(other)) {
                        g.callCollide(other); // J'appelle la méthode collide de mon GameObject
                    }
                });
            });
            if (_this.gameObjects.filter(function (g) { return g instanceof Alien; }).length === 0) {
                _this.generateAliens();
                _this.wave++;
            }
        }, 16);
        // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
    };
    Game.prototype.instanciate = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    Game.prototype.destroy = function (gameObject) {
        this.gameObjects = this.gameObjects.filter(function (go) { return go != gameObject; });
    };
    Game.prototype.over = function () {
        alert("GameOver!");
        window.location.reload();
    };
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.getLaserCount = function () {
        return this.gameObjects.filter(function (g) { return g instanceof Laser; }).length;
    };
    Game.prototype.getWave = function () {
        return this.wave;
    };
    return Game;
}());
export { Game };
