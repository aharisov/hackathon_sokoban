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

    public collide(width: number, height: number): boolean {
        console.log('collide', this.x, this.y);
        
        if( this.x < 0 || this.x >= width || this.y < 0 || this.y >= height ) return true;
        
        return false;
    }

    public move(dir: Direction, w: number, h: number): void {
        let isCollide: boolean = this.collide(w, h);
        
        switch (dir) {
            case 0:
                if (isCollide) {
                    this.y >= h ? this.y-- : this.y = 0;
                } else {
                    this.y <= 0 ? this.y = 0 : this.y--;
                }
                break;
            case 1:
                if (isCollide) {
                    this.y <= 0 ? this.y++ : this.y = h;
                } else {
                    this.y++;
                }
                break;
            case 2:
                if (isCollide) {
                    this.x >= w ? this.x-- : this.x = 0;
                } else {
                    this.x <= 0 ? this.x = 0 : this.x--;
                }
                break;
            case 3:
                if (isCollide) {
                    this.x <= 0 ? this.x++ : this.x = w;
                } else {
                    this.x++;
                }
                break;
        }

        console.log(this.x, this.y, isCollide);
        
    }
}