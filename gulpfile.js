var gulp = require("gulp");
var webpack = require('gulp-webpack');
var webpackConfig = require("./webpack.config.js");
var browserSync = require("browser-sync").create();
var open = require('gulp-open');
//定义一个打包任务
gulp.task("webpack", () => {
    console.log("开始打包JS文件到dist目录下,打包的文件是bundle.js");
    return gulp.src('src/entry.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

// 启动一个静态服务器
gulp.task('browser-sync', function() {
    // 从这个项目的根目录启动服务器
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch("dist/**/*", () => {
        console.log("dist的内容发生变化,重新加载服务器");
        browserSync.reload();
    });
});



//打开浏览器
gulp.task('open', () => {
    console.log("open 浏览器");
    gulp.src('./dist/index.html')
        .pipe(open());
});


//开启监听 调试代码的时候去重新打包
gulp.task("watch-change-src", () => {
    gulp.watch("./src/**/*", ["webpack"], () => {
        console.log("重新打包完成");
    });
});



//默认要用的
gulp.task("default", ["webpack", "browser-sync", "open", "watch-change-src"], () => {
    console.log("工程执行启动完毕")
});
