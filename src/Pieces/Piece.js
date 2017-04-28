let ChessIterator = require("../Tool/ChessIterator.js");
let Check = require("../Tool/Check.js")
class Piece {
    constructor() {

    }
    getMoveRule(v) {
        v = v.toUpperCase();
        switch (v) {
            case "C":
                return this.CFun;
                break;
            case "M":
                return this.MFun;
                break;
            case "P":
                return this.PFun;
                break;
            case "J":
                return this.JFun;
                break;
            case "X":
                return this.XFun;
                break;
            case "S":
                return this.SFun;
                break;
            case "B":
                return this.BFun;
                break;
            default:

        }
    }
    //棋子的值,点,和当前棋盘的地图
    CFun(v, point, map) {
        let points = [];
        ChessIterator.directionWASD((vertor) => {
            for (let unit = 1; unit <= 9; unit++) {
                if (Check.isOutOfbounds(point, vertor, unit) || Check.isHitFriend(point, vertor, unit, map, v)) {
                    break;
                }
                if (Check.isHitNotFriend(point, vertor, unit, map, v)) {
                    points.push(Check.getMovePoint(point, vertor, unit));
                    break;
                }
                if (Check.isHitEmpty(point, vertor, unit, map)) {
                    points.push(Check.getMovePoint(point, vertor, unit));
                }
            }
        })
        return points;
    }
    PFun(v, point, map) {
        let points = [];
        ChessIterator.directionWASD((vertor) => {
            var flag = false;
            for (let unit = 1; unit <= 9; unit++) {
                if (Check.isOutOfbounds(point, vertor, unit)) {
                    break;
                }
                if (!Check.isHitEmpty(point, vertor, unit, map, v)) {
                    if (flag == false) {
                        flag = true;
                        continue;
                    } else {
                        if (Check.isHitNotFriend(point, vertor, unit, map, v)) {
                            points.push(Check.getMovePoint(point, vertor, unit));
                            break;
                        }
                        if(Check.isHitFriend(point, vertor, unit, map, v)){
                            break;
                        }
                        
                    }
                }
                if (Check.isHitEmpty(point, vertor, unit, map)) {
                    if (flag == false) {
                        points.push(Check.getMovePoint(point, vertor, unit));
                    }
                }
            }
        });
        return points;
    }
    // 士
    SFun(v, point, map) {
        let points = [];
        ChessIterator.directQECZ((vertor) => {
            if (!Check.isOutOfboundsS(point, vertor, 1) && !Check.isHitFriend(point, vertor, 1, map, v)) {
                points.push(Check.getMovePoint(point, vertor, 1));
            };
        });
        return points;
    }

    JFun(v, point, map) {
        let points = [];
        ChessIterator.directionWASD((vertor) => {
            if (!Check.isOutOfboundsS(point, vertor, 1) && !Check.isHitFriend(point, vertor, 1, map, v)) {
                points.push(Check.getMovePoint(point, vertor, 1));
            };
        });
        return points;
    }

    MFun(v, point, map) {
        let points = [];
        // debugger;
        ChessIterator.directionM((vertor) => {
            // 计算这个方向的马眼
            let eye = {
                x: 0,
                y: 0
            };
            if (Math.abs(vertor.x) == 2) {
                eye.x = vertor.x / 2;
            } else {
                eye.y = vertor.y / 2;
            }
            if (!Check.isOutOfbounds(point, vertor, 1) && Check.isHitEmpty(point, eye, 1,map) && !Check.isHitFriend(point, vertor, 1, map, v)) {
                points.push(Check.getMovePoint(point, vertor, 1));
            }
        });
        return points;
    }
    XFun( v,point, map) {
        let points = [];
        ChessIterator.directQECZ((vertor) => {
            if (!Check.isOutOfboundsX(point, vertor, 2) && Check.isHitEmpty(point, vertor, 1, map) && !Check.isHitFriend(point, vertor, 2, map, v)) {
                points.push(Check.getMovePoint(point, vertor, 2));
            }
        });
        return points;
    }

    // 兵
    BFun( v,point, map) {
        let points = [];
        if (point.y >= 5) {
            if (!Check.isHitFriend(point, { x: 0, y: -1 }, 1, map, v)) {
                points.push(Check.getMovePoint(point, { x: 0, y: -1 }, 1));
            }
        } else {
            ChessIterator.directionBing((vertor) => {
                if (!Check.isOutOfbounds(point, vertor, 1) && !Check.isHitFriend(point, vertor, 1, map, v)) {
                    points.push(Check.getMovePoint(point, vertor, 1));
                }
            });
        }
        return points;
    }

}
module.exports = Piece

