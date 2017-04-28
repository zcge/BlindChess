let Piece = require("../Pieces/Piece.js")
class ChessBoard {
    constructor() {
        //棋盘内的所有内容
        this.map = [];
        this.player = "red";
        this.clicked = null;
        this.step = 0;
        this.points = []
    }
    init() {
        this.map = JSON.parse(JSON.stringify(ChessBoard.map));
        this.player = ChessBoard.players[0];
        this.clicked = null;
        this.step = 0;
        this.points = [];
    }
    getV(point){
        this.map[point.y][point.x];
        return v;
    }
    //翻转棋盘180度
    reversalChessBoard(){
        this.step += 1;
        let len = this.map.length-1;
        let len2 = this.map[0].length-1;
        let arr = [];
        for(let i = len;i>=0;i--){
            let arr1 = [];
            for(let j = len2;j>=0;j--){
                arr1.push(this.map[i][j]);
            }
            arr.push(arr1);
        }
        this.map = arr;
        //改变player 
        this.player = ChessBoard.players[this.step%2];
        this.show();
    }
    //选中棋子
    clickPiece(point){
        let v = this.map[point.y][point.x]; //获取棋子名称
        this.points = []
        if((this.player == ChessBoard.players[1] && /[A-Z]/.test(v)) || (this.player == ChessBoard.players[0] && /[a-z]/.test(v))){
            this.clicked = {
                v:v,
                point:point
            }
            this.points = this.pointsCanMove();
        }else{
            this.clicked = null;
            return;
        }            
    }
    //预测能移动的位置
    pointsCanMove(){
        let Points = [];
        return Points;
    }
    //移动棋子 移动到可以移动的位置 生成移动指令
    movePiece(pointTo){
        //如果能够移动就移动
        let canMove = true;
        if(canMove){
            let pointFrom = this.clicked.point;
            this.map[pointFrom.y][pointFrom.x] = "#";
            this.map[pointTo.y][pointTo.x] = this.clicked.v;
            this.reversalChessBoard();
        }
        this.clicked = null;
        this.points = [];
    }
    show(){
        console.clear();
        this.map.map(function(v,i){
            console.log(v.join(" "));
            if(i==4){
                console.log("  楚河      汉界  ");
            }
        });
        console.log('轮到'+this.player+"方下棋了");
        
    }
}
ChessBoard.map = [
    ["C", "M", "X", "S", "J", "S", "X", "M", "C"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "P", "#", "#", "#", "#", "#", "P", "#"],
    ["B", "#", "B", "#", "B", "#", "B", "#", "B"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["b", "#", "b", "#", "b", "#", "b", "#", "b"],
    ["#", "p", "#", "#", "#", "#", "#", "p", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["c", "m", "x", "s", "j", "s", "x", "m", "c"],
];
ChessBoard.players = ["red","black"]
module.exports = ChessBoard;