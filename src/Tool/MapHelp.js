let MapHelp = {
    //得到Y轴相同的棋子的个数 个位表示数量，十位表示前后
    getChessCodeNumOnY: ( point,map) => {
        let chessCode = map[point.y][point.x];
        let num = 0;
        for (let i = 0; i < 10; i++) {
            if (map[i][point.x] == chessCode) {
                if(point.y > i){
                    num += 11;
                }else{
                    num ++;
                }
            }
        }
        return num;
    },
    findPointByChessCode:(chessCode,map)=>{
        let points = [];
        for(let i = 0;i<map[0].length;i++){
            for(let j = 0;j<map.length;j++){
                 if(chessCode == map[j][i]){
                    points.push({
                        x:i,
                        y:j
                    })
                 }
            }
        }
        return points;
    },
    filterByRow:(movePoints,rowNum)=>{
        let points  = [];
        for(let i in movePoints){
            if(movePoints[i].x == rowNum){
               points.push(movePoints[i]);
            }
        }
        return points;
    },
    filterBySameRow:(points)=>{
        let p = [0,0,0,0,0,0,0,0,0];
        let pArr = [];
        for(let i in points){
            p[points[i].x]++;
        }
        let xNum;
        for(let j in p){
            if(p[j]>1){
                xNum = j;
            }
        }
        if(isNaN(xNum)){
            return [];
        }else{
            for(let k in points){
                if(points[k].x == xNum){
                    pArr.push(points[k]);
                }
            }
            return pArr;
        }
        
    }
    // getPointByChessCodeAndRowNum:(chessCode,rownum,map) =>{
        
    //     let points = [];
    //     for(let i = 0;i<map[0].length;i++){
    //         for(let j = 0;j<map.length;j++){
    //             if(chessCode == map[j][i]){
    //                 points.push({
    //                     x:i,
    //                     y:j
    //                 })
    //             }
    //         }
    //     }
    //     return points;
    // }
};
module.exports = MapHelp;