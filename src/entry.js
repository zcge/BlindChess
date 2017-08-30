let Game = require("./Core/Game.js");
let game = new Game();
game.init();
let chessBoard = game.getChessBoard();
// chessBoard.init(0,function(){chessBoard.show()});
window.a = chessBoard;
