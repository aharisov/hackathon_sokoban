import { Display } from "./Display.js";
import { Game } from "./Game.js";

const game = new Game(50, 50, 10);
game.initialize();
game.run();