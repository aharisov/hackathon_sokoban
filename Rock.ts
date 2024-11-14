import { Point } from "./Point";
import { Shape } from "./Shape";

export class Rock extends Point {
    constructor(x: number, y: number, color: string, shape: Shape) {
        super(x, y, color, shape);
    }
}