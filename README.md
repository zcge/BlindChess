# BlindChess
## 中国象棋的算法实现
### API
### var chessBoard = new ChessBoard("red");//建立棋盘 红方red 黑方black
### chessBoard.getMap(); //返回当前的棋盘数组信息
    
### chessBoard.acceptDirect("炮八平五:RED"); //接受下棋指令 指令是四个汉字加颜色
    ERROR_DIRECT 错误的指令
    
### chessBoard.catchError((errorCode) =>{}); //重新定义这个方法来解决错误信息
### chessBoard.clickPiece(point); 
    point {x,y}
    
    选中棋子 会抛出错误 
    NOT_MY 不是我方棋子
    NO_MOVE_WAY 没有可以移动的位置

### chessBoard.movePiece(point)
    CANT_MOVE 不能这么移动



