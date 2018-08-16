//Logic for the Count Game

class NumberedBox extends createjs.Container{ //l The container is a kind of display object that can contain other graphics
    constructor(game, number=0){ //l This parameter is the number to display in the box
        super(); //l At the beginning of the constructor, we call the super to initialize the create JS container logic.
    
        this.game=game;
        this.number=number;

        var movieclip=new lib.NumberedBox();
        movieclip.numberText.text=number;
        this.addChild(movieclip);

        this.setBounds(0,0,50,50);

        //Handle click/tap
        this.on('click', this.handleClick.bind(this));
        
    }
    handleClick(){
        this.game.handleClick(this);
    }

}

//This class controls the game data.
class GameData{
    constructor(){
        this.amountOfBox=20;
        this.resetData();

    }
    resetData(){
        this.currentNumber=1;
    }
    nextNumber(){
        this.currentNumber+=1;
    }

    isRightNumber(number){
        return (number===this.currentNumber);
    }

    isGameWin(){
        //To do
        return false;
    }

}


class Game{
    constructor(){
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.canvas=document.getElementById("game-canvas");
        this.stage=new createjs.Stage(this.canvas);

        this.stage.width=this.canvas.width;
        this.stage.height=this.canvas.height;

        //Enable tap on touch device
        createjs.Touch.enable(this.stage);

        //Enable retina screen
        this.retinalize();

        window.debugStage=this.stage;//l ?


        createjs.Ticker.setFPS(60);

        //Game related initializtion
        this.gameData=new GameData();
        
        //Keep re-drawing the stage.
        createjs.Ticker.on("tick", this.stage);

        //Background
        this.stage.addChild(new lib.Background());

        //Testing code

        // var circle= new createjs.Shape();
        // circle.graphics.beginFill("red").drawCircle(0,0,40);
        // circle.x=circle.y=100;
        // this.stage.addChild(circle);

        //this.stage.addChild(new NumberedBox(68));

        this.generateMultipleBoxes();
        

    }
    version(){
        return '1.0.0';
    }

    generateMultipleBoxes(amount=10){
        for(var i=amount;i>0;i--){
            var movieclip=new NumberedBox(this,i);
            this.stage.addChild(movieclip);

            //random position
            movieclip.x=Math.random()*(this.stage.width-movieclip.getBounds().width);
            movieclip.y=Math.random()*(this.stage.height-movieclip.getBounds().height);
        }
    }
    handleClick(numberedBox){
        if(this.gameData.isRightNumber(numberedBox.number)){
            this.stage.removeChild(numberedBox);
            this.gameData.nextNumber();
        }
    }
    retinalize(){
        this.stage.width=this.canvas.width;
        this.stage.height=this.canvas.height;

        let ratio=window.devicePixelRatio;
        if(ratio===undefined){
            return;
        }
        this.canvas.setAttribute('width', Math.round(this.stage.width*ratio));
        this.canvas.setAttribute('height', Math.round(this.stage.height*ratio));

        this.stage.scaleX=this.stage.scaleY=ratio;

        //Set CSS style
        this.canvas.style.width=this.stage.width+"px";
        this.canvas.style.height=this.stage.height+"px";
    }

}

//Start the game
var game=new Game();