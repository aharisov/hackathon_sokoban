import Drawer from "./Drawer.js";
import { Game } from "./Game.js";
import { Hole } from "./Hole.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";


export class Display{
    private drawer: Drawer;
  
    constructor(width:number, height:number, scale:number = 10) {
        this.drawer = new Drawer(width,height,scale)
    }
  
    public refreshScore(game: Game){
        let score : HTMLElement|null = document.getElementById("score");
        if(score!=null) score.innerHTML = game.getLevel().toString();
    }
  
    public draw(game:Game):void {
        // clear field
        this.drawer.clear();
        
        // draw rocks and holes
        let holes: Hole[] = game.getObjects().filter(obj => obj instanceof Hole);
        let rocks: Rock[] = game.getObjects().filter(obj => obj instanceof Rock);

        for (let hole of holes) {
            if (hole.getIsFilled()) {
                this.drawer.drawRectangle(hole.getX(), hole.getY(), 'green'); 
            } else {
                this.drawer.drawRectangle(hole.getX(), hole.getY(), hole.getColor());
            } 
        }

        for (let rock of rocks) {
            this.drawer.drawRectangle(rock.getX(), rock.getY(), rock.getColor());
        }

        // draw player
        this.drawer.drawCircle(game.getPlayer().getX(), game.getPlayer().getY(), game.getPlayer().getColor());
    }        
}