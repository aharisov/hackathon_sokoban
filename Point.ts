import { Direction } from "./Direction.js";
import { Shape } from "./Shape.js";

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

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
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

    public isWall(width: number, height: number): boolean {
        if( this.x < 0 || this.x > width || this.y < 0 || this.y > height ) return true;
        
        return false;
    }

    public move(dir: Direction, w: number, h: number): void {
        let xTmp: number = this.x;
        let yTmp: number = this.y;
        
        switch (dir) {
            case Direction.UP:
                this.y--;
                break;
            case Direction.DOWN:
                this.y++;
                break;
            case Direction.LEFT:
                this.x--;
                break;
            case Direction.RIGHT:
                this.x++;
                break;
        }

        if (this.isWall(w, h)) {
            this.x = xTmp;
            this.y = yTmp;
        }
        
    }
}