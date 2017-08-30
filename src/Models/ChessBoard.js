let Piece = require("../Pieces/Piece.js");
let piece = new Piece();
let Direct = require("../Pieces/Direct.js")
let $ = require("jquery");
class ChessBoard {
    constructor() {
        //棋盘内的所有内容
        this.map = [];
        this.player = "red";
        this.clicked = null;
        this.step = 0;
        this.points = [];
        this.type = 0;
    }
    init(type, cb) {
        this.map = JSON.parse(JSON.stringify(ChessBoard.map));
        this.player = ChessBoard.players[0];
        this.clicked = null;
        this.step = 0;
        this.points = [];
        this.type = type;
        cb && cb();
    }

    getV(point) {
        this.map[point.y][point.x];
        return v;
    }
    //翻转棋盘180度
    reversalChessBoard() {
        let len = this.map.length - 1;
        let len2 = this.map[0].length - 1;
        let arr = [];
        for (let i = len; i >= 0; i--) {
            let arr1 = [];
            for (let j = len2; j >= 0; j--) {
                arr1.push(this.map[i][j]);
            }
            arr.push(arr1);
        }
        this.map = arr;
        //改变player 
        this.player = ChessBoard.players[this.step % 2];
        // this.show();
    }
    reversalChessBoardArr(arr){
        let len = arr.length - 1;
        let len2 = arr[0].length - 1;
        let array = [];
        for (let i = len; i >= 0; i--) {
            let arr1 = [];
            for (let j = len2; j >= 0; j--) {
                arr1.push(arr[i][j]);
            }
            array.push(arr1);
        }
        return array
    }
    //选中棋子
    clickPiece(point) {
        let v = this.map[point.y][point.x]; //获取棋子名称
        this.points = [];
        if ((this.player == ChessBoard.players[1] && /[A-Z]/.test(v)) || (this.player == ChessBoard.players[0] && /[a-z]/.test(v))) {
            this.clicked = {
                v: v,
                point: point
            }
            console.log(this.clicked);
            this.points = this.pointsCanMove();
        } else {
            this.clicked = null;
            return;
        }
    }
    //预测能移动的位置
    pointsCanMove() {
        let Points = piece.getMoveRule(this.clicked.v)(this.clicked.v, this.clicked.point, this.map);
        return Points;
    }
    //移动棋子 移动到可以移动的位置 生成移动指令
    movePiece(pointTo) {
        //如果能够移动就移动
        let flag = false;
        for (let i = 0; i < this.points.length; i++) {
            if (pointTo.x == this.points[i].x && pointTo.y == this.points[i].y) {
                flag = true;
                break;
            }
        }

        if (flag) {
            let pointFrom = this.clicked.point;
            this.map[pointFrom.y][pointFrom.x] = "#";
            this.map[pointTo.y][pointTo.x] = this.clicked.v;
            this.reversalChessBoard();
            this.clicked = null;
            this.points = [];
            return true;
        }
        this.clicked = null;
        this.points = [];

    }
    //接受指令
    acceptRed(DirectCode,cb) {
        if (this.step % 2 != 0) {
            return;
        }
        this.player = ChessBoard.players[0];
        let o = Direct.getPoints(DirectCode, this.map, this.player);
        let flag = false;
        if (o) {
            this.clickPiece(o.movePoint);
            flag = this.movePiece(o.toPoint);
        };
        if (!flag) {
            console.warn("指令失败");
        } else {
            this.step++;
            console.log(JSON.stringify(o));
            this.reversalChessBoard();
            this.show();
            let v = Direct.toString(DirectCode,0);
            cb && cb(v);

        }
        return flag;

    }
    acceptBlack(DirectCode,cb) {
        if (this.step % 2 != 1) {
            return;
        }
        this.reversalChessBoard();
        this.player = ChessBoard.players[1];
        let o = Direct.getPoints(DirectCode, this.map, this.player);

        let flag = false;
        if (o) {
            this.clickPiece(o.movePoint);
            flag = this.movePiece(o.toPoint);
        };
        if (!flag) {
            console.warn("指令失败")
        } else {
            this.step++;
            console.log(JSON.stringify(o));
            this.show();
            let v = Direct.toString(DirectCode,1);
            cb && cb(v);
        }
        return flag;
    }
    show() {
        if (this.type) {
            let arr = this.reversalChessBoardArr(JSON.parse(JSON.stringify(this.map)));
            let html = ""
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[0].length; j++) {
                    if (arr[i][j] != "#") {
                        let v = arr[i][j];
                        let imgSrc = ""
                        if (/[A-Z]/.test(v)) {
                            imgSrc = "./img/stype_2/b_" + v.toLowerCase() + ".png";
                        } else {
                            imgSrc = "./img/stype_2/r_" + v.toLowerCase() + ".png";
                        }
                        let top = i * 56 + "px;";
                        let left = j * 56 + "px;";
                        let style = "position:absolute;top:" + top + "left:" + left;
                        html += "<div style=" + style + "><img src=" + imgSrc + "></div>";
                    }

                }
                $("#chess").html(html);
            }
        } else {
            let html = "";
            for (let i = 0; i < this.map.length; i++) {
                for (let j = 0; j < this.map[0].length; j++) {
                    if (this.map[i][j] != "#") {
                        let v = this.map[i][j];
                        let imgSrc = ""
                        if (/[A-Z]/.test(v)) {
                            imgSrc = "./img/stype_2/b_" + v.toLowerCase() + ".png";
                        } else {
                            imgSrc = "./img/stype_2/r_" + v.toLowerCase() + ".png";
                        }
                        let top = i * 56 + "px;";
                        let left = j * 56 + "px;";
                        let style = "position:absolute;top:" + top + "left:" + left;
                        html += "<div style=" + style + "><img src=" + imgSrc + "></div>";
                    }

                }
                $("#chess").html(html);
            }
        }

        this.map.map(function (v, i) {
            console.log(v.join(" "));
            if (i == 4) {
                console.log("  楚河      汉界  ");
            }
        });
        console.log('轮到' + this.player + "方下棋了");
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
ChessBoard.players = ["red", "black"]
module.exports = ChessBoard;