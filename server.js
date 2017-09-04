var http =  require('http');
var express = require("express");
var app = express();
    app.use("/",express.static(__dirname+'/dist'));
    http.createServer(app).listen("3001",function(){
    console.log("启动静态服务器 成功 3001");
})