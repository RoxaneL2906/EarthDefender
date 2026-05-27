import { Game } from "./classes/game.js";
var gameName = "EarthDefender!";
console.log(gameName);
window.onload = function () {
    var game = new Game();
    game.start();
};
