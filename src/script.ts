import { Game } from "./classes/game.js";

const gameName: string = "EarthDefender!";
console.log(gameName);

window.onload = () => {
  const game = new Game();
  game.start();
};
