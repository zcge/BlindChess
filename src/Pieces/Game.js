let ChessBoard = require("./ChessBoard.js")
class Game{
    constructor () {
        //构造一个棋盘
        this.chessBoard = new ChessBoard();
        this.bllackClock = new Clock();
        this.redClock = new Clock();
    }
    // 开局
    start(){
        this.chessBoard.init();
    }
    
}
let game = new Game();
game.start();