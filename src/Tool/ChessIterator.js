// 遍历器
class ChessIterator {
    constructor() {

    }
    static directionBing(cb) {
        //上左右
        let directArr = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
        for (let i = 0; i < 3; i++) {
            let vector = directArr[i]
            cb(vector);
        }
    }
    static directionM(cb) {
        let directArr = [{ x: -1, y: 2 }, { x: -1, y: -2 }, { x: 1, y: 2 }, { x: 1, y: -2 }, { x: 2, y: 1 }, { x: -2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }];
        for (let i = 0; i < 8; i++) {
            let vector = directArr[i]
            cb(vector);
        }
    }
    static directionWASD(cb) {
        //上下左右
        let directArr = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
        for (let i = 0; i < 4; i++) {
            let vector = directArr[i]
            cb(vector);
        }
    }
    static directQECZ(cb) {
        let directArr = [{ x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }];
        for (let i = 0; i < 4; i++) {
            let vector = directArr[i]
            cb(vector);
        }
    }

}
module.exports = ChessIterator;
