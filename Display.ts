import Drawer from "./Drawer.js";
import { Game } from "./Game.js";
import { Player } from "./Player.js";


export class Display{
    private drawer: Drawer;
  
    constructor(width:number, height:number, scale:number = 10) {
        this.drawer = new Drawer(width,height,scale)
    }
  
    public refreshScore(){
        let score : HTMLElement|null = document.getElementById("score");
        if(score!=null) score.innerHTML = "0";
    }
  
    public draw(game:Game):void {
        this.drawer.clear();
        this.drawer.drawCircle(game.getPlayer().getX(), game.getPlayer().getY(), game.getPlayer().getColor());
        
        for (let object of game.getObjects()) {
            this.drawer.drawRectangle(object.getX(), object.getY(), object.getColor()) 
        }
    }        
}