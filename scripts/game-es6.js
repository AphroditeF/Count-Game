//Logic for the Count Game

class NumberedBox extends createjs.Container{ //l The container is a kind of display object that can contain other graphics
    constructor(number=0){ //l This parameter is the number to display in the box
        super(); //l At the beginning of the constructor, we call the super to initialize the create JS container logic.
    
        var movieclip=new lib.NumberedBox();
        movieclip.numberText.text=number;
        this.addChild(movieclip);

        //random position
        movieclip.x=Math.random()*200;
        movieclip.y=Math.random()*200;
    }


}


class Game{
    constructor(){
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.canvas=document.getElementById("game-canvas");
        this.stage=new createjs.Stage(this.canvas);

        window.debugStage=this.stage;//l ?


        createjs.Ticker.setFPS(60);
        
        //Keep re-drawing the stage.
        createjs.Ticker.on("tick", this.stage);

        //Background
        this.stage.addChild(new lib.Background());

        //Testing code

        // var circle= new createjs.Shape();
        // circle.graphics.beginFill("red").drawCircle(0,0,40);
        // circle.x=circle.y=100;
        // this.stage.addChild(circle);

        this.stage.addChild(new NumberedBox(68));
        

    }
    version(){
        return '1.0.0';
    }
}

//Start the game
var game=new Game();