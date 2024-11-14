import { Direction } from "./Direction.js";
import { Hole } from "./Hole.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Player extends Point {
    constructor(x: number, y: number, color: string, shape: Shape) {
        super(x, y, color, shape);
    } 

    public touchHole(dir: Direction, hole: Hole): void {
        switch (dir) {
            case 0:
                this.y = hole.getY() + 1;
                break;
            case 1:
                this.y = hole.getY() - 1;
                break;
            case 2:
                this.x = hole.getX() + 1;
                break;
            case 3:
                this.x = hole.getX() - 1;
                break;
        }
    }
}