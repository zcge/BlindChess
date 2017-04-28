class Piece {
    constructor() {

    }
    isSameCamp(v, v2) {
        if (/[A-Z]/.test(v1) && /[A-Z]/.test(v2)) {
            return true;
        }
        if (/[a-z]/.test(v1) && /[a-z]/.test(v2)) {
            return true;
        }
        return false;
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
    CFun() {
        let points = [];
        return points;
    }
    MFun() {
        let points = [];
        return points;
    }
    PFun() {
        let points = [];
        return points;
    }
    XFun(point, v, map) {
        let points = [];
        
        
        
        return points;
    }
    // 士
    SFun(point, v, map) {
        let points = [];
        if (point.x == 3 || point.x == 5 && !this.isSameCamp(map[8][4], v)) {
            points = [{ x: 4, y: 8 }]
            return points;
        }
        if (points.x = 4) {
            let arr = [{ x: 3, y: 7 }, { x: 3, y: 9 }, { x: 5, y: 7 }, { x: 5, y: 9 }];
            for (let i = 0; i < arr.length; i++) {
                if (!this.isSameCamp(map[arr[i].y][arr[i].x], v)) {
                    points.push(arr[i]);
                }
            }
        }
        return points;
    }
    // 兵
    BFun(point, v, map) {
        let isSameCamp = this.isSameCamp(chessboard[point.y - 1][points.x], v);
        let points = [];
        
        return points;
    }

}
module.exports = Piece

