import { Point } from "./Point";
import { Shape } from "./Shape";

export class Hole extends Point {
    protected isFilled: boolean;

    constructor(x: number, y: number, color: string, shape: Shape) {
        super(x, y, color, shape);

        this.isFilled = false;
    }
}