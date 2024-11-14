import { Direction } from "./Direction";
import { Shape } from "./Shape";

export class Point {
    protected x: number;
    protected y: number;
    protected color: string;
    protected shape: Shape;

    constructor(x: number, y: number, color: string, shape: Shape) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getColor(): string {
        return this.color;
    }

    public getShape(): Shape {
        return this.shape;
    }

    public touch(otherPoint:Point): boolean {
        if(otherPoint == this) return false;

        return this.x == otherPoint.getX() && this.y == otherPoint.getY();
    }
}