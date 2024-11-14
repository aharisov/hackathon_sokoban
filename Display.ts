import Drawer from "./Drawer.js";
import { Game } from "./Game.js";
import { Hole } from "./Hole.js";
import { Player } from "./Player.js";


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
        for (let object of game.getObjects()) {
            if (object instanceof Hole && object.getIsFilled()) {
                this.drawer.drawRectangle(object.getX(), object.getY(), 'grey'); 
            } else {
                this.drawer.drawRectangle(object.getX(), object.getY(), object.getColor()) 
            }
        }

        // draw player
        this.drawer.drawCircle(game.getPlayer().getX(), game.getPlayer().getY(), game.getPlayer().getColor());
    }        
}