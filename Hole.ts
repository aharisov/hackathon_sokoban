import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Hole extends Point {
    protected isFilled: boolean;

    constructor(x: number, y: number, color: string, shape: Shape) {
        super(x, y, color, shape);

        this.isFilled = false;
    }

    public getIsFilled(): boolean {
        return this.isFilled;
    }
}