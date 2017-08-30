let MapHelp = require("../Tool/MapHelp.js");
let DirectOne = [
    ['c', 'm', 'x', 's', 'j', 'b', 'p'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['v', 't', 'r'],//
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
];
let DirectTwo = [
    ['q', 'z', 'h'],//前q 中z 后h
    ['c', 'm', 'x', 's', 'j', 'b', 'p', '1', '2', '3'],
    ['v', 't', 'r'],//进v 退t 平r
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
];
let ConstStr = {
    c: "车",
    m: "马",
    x: "相",
    p: "炮",
    s: "士",
    b: "兵",
    j: "帅",
    C: "车",
    M: "马",
    X: "象",
    P: "炮",
    S: "士",
    B: "卒",
    J: "將"
}

let Direct = {
    //解析指令
    getPoints: (directArr, map, type) => {
        let movePoint = {};
        let toPoint = {};
        let chessCode;
        let rowNum;
        let movePoints = [];
        if (directArr[0] == "q" || directArr[0] == "z" || directArr == "h") {
            chessCode = directArr[1];
            if (directArr[1] == 1 || directArr[1] == 2) {
                if (type == 'red') {
                    chessCode = "b"
                } else {
                    chessCode = "B"
                }
            };
            movePoints = MapHelp.findPointByChessCode(chessCode, map);
            movePoints = MapHelp.filterBySameRow(movePoints);
            if (movePoints.length == 2) {
                if (directArr[0] == 'q') {
                    movePoint = movePoints[0];
                } else {
                    movePoint = movePoints[1];
                }
            } else if (movePoints.length == 3) {
                if (directArr[0] == 'q') {
                    movePoint = movePoints[0];
                } else if (directArr[0] == 'z') {
                    movePoint = movePoints[1];
                } else {
                    movePoint = movePoints[2];
                }
            } else if (movePoints.length == 4) {
                if (directArr[0] == 'q' && directArr[1] == '1') {
                    movePoint = movePoints[0];
                } else if (directArr[0] == 'q' && directArr[1] == '2') {
                    movePoint = movePoints[1];
                } else if (directArr[0] == 'h' && directArr[1] == '1') {
                    movePoint = movePoints[2];
                } else {
                    movePoint = movePoints[3];
                }
            } else if (movePoints.length == 5) {
                if (directArr[0] == 'q' && directArr[1] == '1') {
                    movePoint = movePoints[0];
                } else if (directArr[0] == 'q' && directArr[1] == '2') {
                    movePoint = movePoints[1];
                } else if (directArr[0] == 'z') {
                    movePoint = movePoints[2];
                } else if (directArr[0] == 'h' && directArr[1] == '1') {
                    movePoint = movePoints[3];
                } else {
                    movePoint = movePoints[4];
                }
            } else {
                console.error("错误");
                return false;
            }

        } else {
            chessCode = directArr[0];
            rowNum = 9-directArr[1];
            movePoints = MapHelp.findPointByChessCode(chessCode, map);
            movePoints = MapHelp.filterByRow(movePoints, rowNum);
            movePoint = movePoints[0];
        }
        if (chessCode.toLowerCase() != "s" && chessCode.toLowerCase() != "m" && chessCode.toLowerCase() != "x") {
            if (directArr[2] == "v") {
                toPoint = {
                    x: movePoint.x,
                    y: movePoint.y - directArr[3]
                }
            } else if (directArr[2] == 'r') {
                toPoint = {
                    x: 9 - directArr[3],
                    y: movePoint.y
                }
            } else if (directArr[2] == 't') {
                toPoint = {
                    x: movePoint.x,
                    y: movePoint.y + parseInt(directArr[3])
                }
            }
        } else if (chessCode.toLowerCase() == "s" || chessCode.toLowerCase() == "x") {
            let unit = 1;
            if (chessCode.toLowerCase() == "x") {
                unit = 2;
            }
            toPoint.x = 9 - directArr[3];
            if (directArr[2] == 'v') {
                toPoint.y = movePoint.y - unit;
            } else {
                toPoint.y = movePoint.y + unit;
            }
        } else if (chessCode.toLowerCase() == "m") {
            let unit = 1;
            if (Math.abs(directArr[3] - directArr[1]) == 1) {
                unit = 2;
            }
            toPoint.x = 9 - directArr[3];
            if (directArr[2] == 'v') {
                toPoint.y = movePoint.y - unit;
            } else {
                toPoint.y = movePoint.y + unit;
            }
        } else {
            console.error("错误");
            return false;
        }
        return {
            movePoint, toPoint
        };
    },
    //构建指令字符串
    getDirectCode: (movePoint, toPoint, map) => {
        let chessCode = map[movePoint.y][movePoint.x];
        let chessNumOnY = MapHelp.getChessCodeNumOnY(movePoint, map);
        let _x = toPoint.x - movePoint.x;
        let _y = toPoint.y - movePoint.y;

        let row = 9 - movePoint.x;
        let rowTo = 9 - toPoint.x;
        let _directCode = [];
        if (chessNumOnY == 1) {
            _directCode[0] = chessCode;
            _directCode[1] = "" + row;
        } else if (chessNumOnY % 10 == 2) {
            if (parseInt(chessNumOnY / 10) == 0) {
                _directCode[0] = "q"
            } else {
                _directCode[0] = "h"
            }
            _directCode[1] = chessCode
        } else if (chessNumOnY % 10 == 3) {
            if (parseInt(chessNumOnY / 10) == 0) {
                _directCode[0] = "q"
            } else if (parseInt(chessNumOnY / 10) == 1) {
                _directCode[0] = "z"
            } else {
                _directCode[0] = "h"

            }
            _directCode[1] = chessCode
        } else if (chessNumOnY % 10 == 4) {
            if (parseInt(chessNumOnY / 10) == 0) {
                _directCode[0] = "q";
                _directCode[1] = "1";
            } else if (parseInt(chessNumOnY / 10) == 1) {
                _directCode[0] = "q";
                _directCode[1] = "2";
            } else if (parseInt(chessNumOnY / 10) == 2) {
                _directCode[0] = "h";
                _directCode[1] = "1";
            } else {
                _directCode[0] = "h";
                _directCode[1] = "2";
            }
        } else if (chessNumOnY % 10 == 5) {
            if (parseInt(chessNumOnY / 10) == 0) {
                _directCode[0] = "q";
                _directCode[1] = "1";
            } else if (parseInt(chessNumOnY / 10) == 1) {
                _directCode[0] = "q";
                _directCode[1] = "2";
            } else if (parseInt(chessNumOnY / 10) == 2) {
                _directCode[0] = "z";
                _directCode[1] = "b";
            } else if (parseInt(chessNumOnY / 10) == 3) {
                _directCode[0] = "h";
                _directCode[1] = "1";
            } else {
                _directCode[0] = "h";
                _directCode[1] = "2";
            }
        }
        if (_y == 0) {
            _directCode[2] = "r";
            _directCode[3] = "" + rowTo;
        } else if (_y < 0) {
            _directCode[2] = "v";
            if (_x == 0) {
                _directCode[3] = "" + Math.abs(_y);
            } else {
                _directCode[3] = "" + rowTo;
            }

        } else if (_y > 0) {
            _directCode[2] = "t";
            if (_x == 0) {
                _directCode[3] = "" + Math.abs(_y);
            } else {
                _directCode[3] = "" + rowTo;
            }
        }
        return _directCode;
    },
    toString: (codeArr,type) => {
        try {
            let codeString = "";
            let StringArr = !type?["车","马","相","士","帅","兵","炮","前","中","后"]:["车","马","象","士","将","卒","炮","前","中","后"];
            let StringArr2 = !type?["车","马","相","士","帅","兵","炮","一","二","三","四","五","六","七","八","九"]:["车","马","象","士","将","卒","炮",'1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let StringArr3 = ['进',"退","平"];
            let StringArr4 = !type?["一","二","三","四","五","六","七","八","九"]:['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let n1 = ['c', 'm', 'x', 's', 'j', 'b', 'p','q','z','h'].indexOf(codeArr[0].toLowerCase());
            let n2 = ['c', 'm', 'x', 's', 'j', 'b', 'p', '1', '2', '3','4','5','6','7','8','9'].indexOf(codeArr[1].toLowerCase());
            let n3 = ['v', 't', 'r'].indexOf(codeArr[2]);
            let n4 = ['1', '2', '3','4','5','6','7','8','9'].indexOf(codeArr[3]);
            codeString = StringArr[n1]+StringArr2[n2]+StringArr3[n3]+StringArr4[n4]
            return codeString;
        } catch (e) {
            console.error("错误",e);
            return "";
        } 
        
    },
    toCode: (codeString,type) => {
        let code = "";


        return code;
    }

};
module.exports = Direct;