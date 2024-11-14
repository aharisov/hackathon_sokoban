import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Rock extends Point {
    constructor(x: number, y: number, color: string, shape: Shape) {
        super(x, y, color, shape);
    }
}