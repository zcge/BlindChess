let ChessBoard = require("../Models/ChessBoard.js");
class Game{
    constructor () {
       this.pace = [];//记录每一步
       this.chessBoard = new ChessBoard(); //定义一个棋盘
    }
    getChessBoard(){
        return this.chessBoard;
    }
    init(){
        this.pace = [];
        this.chessBoard.init();
        this.chessBoard.show();
    }
    
}
module.exports = Game;