// 盲棋指令
let Constant  = require("./Constant.js");
class Direct{
    constructor () {
      
        console.log(Constant)
    }
    //解析指令
    analysisDirect(game,str){
        let directArr = str.split("");
        //命中命令1
        if(Constant.DirectOne[0].indexOf(directArr[0]) > -1){

        }
        if(Contant.DirectTwo[0].indexOf(directArr[0]) > -1){
            
        }
        console.log("没有命中")
        return {
            
        }

    }
    //构建指令字符串
    buildDirectStr(type,movePoint,toPoint){
        let directStr = "";
        return str;
    }

}
module.exports = Direct;