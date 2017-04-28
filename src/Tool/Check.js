//检测方法
let Check = {
    //检测是否是友方单位
    isFriend: (v1, v2) => {
        if (v1 == "#" || v2 == "#") {
            return false;
        }
        if (/[A-Z]/.test(v1) && /[A-Z]/.test(v2)) {
            return true;
        }
        if (/[a-z]/.test(v1) && /[a-z]/.test(v2)) {
            return true;
        }
        return false;
    },
    //检测是敌对单位
    isNotFriend: (v1, v2) => {
        if (v1 == "#" || v2 == "#") {
            return false;
        }
        if (/[A-Z]/.test(v1) && /[a-z]/.test(v2)) {
            return true;
        }
        if (/[a-z]/.test(v1) && /[A-Z]/.test(v2)) {
            return true;
        }
        return false;
    },
    getMapV: (point, vertor, unit, map) => {
        let v = map[point.y + vertor.y * unit][point.x + vertor.x * unit];
        return v;
    },
    //获得移动后的点
    getMovePoint: (point, vertor, unit) => {
        let pointTo = {
            x: point.x + vertor.x * unit,
            y: point.y + vertor.y * unit
        };
        return pointTo;
    },
    //象的边界
    isOutOfboundsX: (point, vertor, unit) => {
        if ((point.x + vertor.x * unit) > 8 || (point.x + vertor.x * unit) < 0) {
            return true;
        }
        if ((point.y + vertor.y * unit) > 9 || (point.y + vertor.y * unit) < 5) {
            return true;
        }
        return false;
    },
    //棋盘的边界
    isOutOfbounds: (point, vertor, unit) => {
        if ((point.x + vertor.x * unit) > 8 || (point.x + vertor.x * unit) < 0) {
            return true;
        }
        if ((point.y + vertor.y * unit) > 9 || (point.y + vertor.y * unit) < 0) {
            return true;
        }
        return false;
    },
    //马的边界
    isOutOfboundsS: (point, vertor, unit) => {
        if ((point.x + vertor.x * unit) > 5 || (point.x + vertor.x * unit) < 3) {
            return true;
        }
        if ((point.y + vertor.y * unit) > 9 || (point.y + vertor.y * unit) < 7) {
            return true;
        }
        return false;
    },
    //是否是空的
    isHitEmpty: (point, vertor, unit, map) => {
        let v = Check.getMapV(point, vertor, unit, map);
        if (v == "#") {
            return true;
        } else {
            return false;
        }
    },
    //是否撞到友军
    isHitFriend: (point, vertor, unit, map, v) => {
        return Check.isFriend(Check.getMapV(point, vertor, unit, map), v);
    },
    isHitNotFriend: (point, vertor, unit, map, v) => {
        return Check.isNotFriend(Check.getMapV(point, vertor, unit, map), v);
    }
}
module.exports = Check;