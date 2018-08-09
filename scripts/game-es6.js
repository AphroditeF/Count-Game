//Logic for the Count Game

class Game{
    constructor (){
        console.log(`Welcome to the game. Version ${this.version()}`);
    }
    version(){
        return '1.0.0';
    }
}

//Start the game
var game=new Game();