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
    private dir: Direction;
    
    constructor(width:number, height:number, scale:number) {
        this.width = width;
        this.height = height;
        this.display = new Display(width,height,scale);
        this.level = 1;
        this.player = new Player(this.randomX(), this.randomY(), 'red', Shape.RECTANGLE);
        this.objects = [];
        this.dir = Direction.RIGHT;
        this.generateObjects();
        this.display.draw(this);
    }

    public getLevel(): number {
        return this.level;
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
            
            if (rock.touch(hole) || rock.getX() == 0 || rock.getX() == this.width - 1 
                || rock.getY() == 0 || rock.getY() == this.height - 1) {
                rock = new Rock(this.randomX(), this.randomY(), 'blue', Shape.CIRCLE);
                hole = new Hole(this.randomX(), this.randomY(), 'black', Shape.CIRCLE);
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

    private checkObjects(): void {
        let holes: Hole[] = this.objects.filter(obj => obj instanceof Hole);
        let rocks: Rock[] = this.objects.filter(obj => obj instanceof Rock);

        for(let hole of holes) {
            // restrict go through the hole
            if (!hole.getIsFilled() && this.player.touch(hole)) {
                this.player.touchHole(this.dir, hole);
            }
        }

        for(let rock of rocks) {
            // move rock by player
            if (this.player.touch(rock)) {
                rock.move(this.dir, this.width, this.height);
            }

            // fill the hole
            for(let hole of holes) {
                if (rock.touch(hole) && !hole.getIsFilled()) {
                    hole.setIsFilled();
                    this.objects = this.objects.filter(obj => obj != rock);
                }
            }

            // move several rocks
            for(let rock2 of rocks) {
                if (rock.touch(rock2) && rock != rock2) {
                    rock2.move(this.dir, this.width, this.height);
                }
            }
        }
    }

    private isLevelFinished(): boolean {
        let rocks: Rock[] = this.objects.filter(obj => obj instanceof Rock);

        if (rocks.length == 0) {
            return true;
        }

        return false;
    }

    public run(): void {
        this.display.refreshScore(this);
        this.player.move(this.dir, this.width - 1, this.height - 1);
        this.checkObjects();
        
        this.display.draw(this);
        
        if (this.isLevelFinished()) {
            this.level++;
            this.objects = [];
            this.generateObjects();
        }
    }

}