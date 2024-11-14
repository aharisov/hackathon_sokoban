import { Direction } from "./Direction.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Player extends Point {
    constructor(x: number, y: number, color: string, shape: Shape) {
        super(x, y, color, shape);
    }

    public collide(width: number, height: number): boolean {
        if( this.x < 0 || this.x >= width || this.y < 0 || this.y >= height ) return true;
        
        return false;
    }

    public touchRock(rock: Point): boolean{
        return this.touch(rock);
    }

    public touchHole(hole: Point): boolean{
        return this.touch(hole);
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

        
        // console.log(this.x, this.y, isCollide);
        
    }    
}