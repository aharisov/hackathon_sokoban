import { Direction } from "./Direction.js";
import { Display } from "./Display.js";
import Drawer from "./Drawer.js";
import { Hole } from "./Hole.js";
import { Player } from "./Player.js";
import { Point } from "./Point.js";
import { Rock } from "./Rock.js";
import { Shape } from "./Shape.js";

export class Game{
    private width: number;
    private height: number;
    private display: Display;
    private level: number;
    private player: Player;
    private objects: Point[];
    private holes: Hole[];
    private dir: Direction;
    
    constructor(width:number, height:number, scale:number) {
        this.width = width;
        this.height = height;
        this.display = new Display(width,height,scale);
        this.level = 1;
        this.player = new Player(this.randomX(), this.randomY(), 'red', Shape.RECTANGLE);
        this.objects = [];
        this.holes = [];
        this.dir = Direction.RIGHT;
        this.generateObjects();
        this.display.draw(this);
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getObjects(): Point[] {
        return this.objects;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public randomX(): number {
        return Math.floor(Math.random() * this.width);
    }

    public randomY(): number {
        return Math.floor(Math.random() * this.height);
    }

    public generateObjects(): void {
        let cnt: number = this.level;

        while(cnt > 0) {
            let rock: Rock = new Rock(this.randomX(), this.randomY(), 'blue', Shape.CIRCLE);
            let hole: Hole = new Hole(this.randomX(), this.randomY(), 'black', Shape.CIRCLE);
            
            if (rock.touch(hole)) {
                rock = new Rock(this.randomX(), this.randomY(), 'blue', Shape.CIRCLE);
            }

            for (let object of this.objects) {
                if (object.touch(rock)) {
                    rock = new Rock(this.randomX(), this.randomY(), 'blue', Shape.CIRCLE);
                }

                if (object.touch(hole)) {
                    hole = new Hole(this.randomX(), this.randomY(), 'black', Shape.CIRCLE);
                }
            }

            this.objects.push(rock);
            this.objects.push(hole);

            cnt--;
        }
    }

    public initialize() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.dir = Direction.UP;
                    this.run();
                    break;
                case 'ArrowDown':
                    this.dir = Direction.DOWN;
                    this.run();
                    break;
                case 'ArrowLeft':
                    this.dir = Direction.LEFT;
                    this.run();
                    break;
                case 'ArrowRight':
                    this.dir = Direction.RIGHT;
                    this.run();
                    break;
            }
        });
    }

    public run(): void {
        this.player.move(this.dir, this.width - 1, this.height - 1);
        this.display.draw(this);
        
        for(let object of this.objects) {
            if (object instanceof Hole && this.player.touch(object)) {
                console.log('found hole');
            }

            if (object instanceof Rock && this.player.touch(object)) {
                console.log('found rock');
            }
        }
    }

}