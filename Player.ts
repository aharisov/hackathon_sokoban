import { Hole } from "./Hole";
import { Point } from "./Point";
import { Rock } from "./Rock";
import { Shape } from "./Shape";

export class Player extends Point {
    constructor(x: number, y: number, color: string, shape: Shape) {
        super(x, y, color, shape);
    }

    public collide(width: number, height: number): boolean {
        if( this.x < 0 || this.x >= width || this.y < 0 || this.y >= height ) return true;
        
        return false;
    }

    public touchRock(rock: Rock): boolean{
        return this.touch(rock);
    }

    public touchHole(hole: Hole): boolean{
        return this.touch(hole);
    }

    
}