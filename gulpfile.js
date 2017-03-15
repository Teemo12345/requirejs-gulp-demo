var gulp = require("gulp");

//rjs打包
var rjs = require("requirejs"); 
var gulpif = require("gulp-if")

//增加版本号hash值，文件改变，版本号更新
var rev = require("gulp-rev");

//文件替换
var replace = require('gulp-rev-replace');

//html压缩
var htmlmin = require("gulp-htmlmin");

//revr的增版本，此处没有用到
var revAll = require('gulp-rev-all');

//改变gulp执行路径
var filter = require("gulp-filter")
//gulp工具箱
var util = require("gulp-util")
//del folder
var rimraf = require('rimraf')
//按顺序执行TASK
var runSequence = require('run-sequence')


gulp.task('default',function(){
  util.log("build = all")
})

gulp.task('del:dist',function(cb){
  rimraf('dist',cb)
})

gulp.task('del:src',function(cb){
  rimraf('dist/src',cb)
})
//使用rjs合并JS与CSS
gulp.task("rjs",function(cb){
  var conf = {
    appDir:'public', //项目路径
    baseUrl:'./', 
    mainConfigFile:'public/js/app/common.js', //require.config({})文件绝对路径
    modules:[ //模块名，可能存在多个require() data-main 启动文件 
      // {
      //   name:"js/app/common" //name 路径相对此conf的baseUrl
      // }
      // ,
      {  
        name:"js/app/app1",//注意此处路径为,如果设置了appDir，此处必须为appdir后的路径
        include:['js/app/home/home'],//因为APP1为require加载文件，所以这里需要手动包含哪个文件，
        exclude: ['js/lib/echarts/3.line.bar.k.min'] //排除，data-main的多页面文件中的require[comman']中的common前面加./common不然会找不到路径错误
      },
      {
        name:"js/app/app2",
        include:"js/app/user/user",
        // exclude:['js/app/common']
      }
    ],
    paths:{
    'app':'app',
    'echarts': 'js/lib/echarts/3.line.bar.k.min'
    },
    optimizeCss:"standard",
    // skipDirOptimize:true,
    // normalizeDirDefines: "skip",
    removeCombined: true, //如果设置为true，在输出目录将会删除掉已经合并了的文件
    // paths:{
    //   app:"app/"
    // },
    dir:"./dist/src", //输出路径
    optimize:"uglify"//使用uglify压缩js
  }
  rjs.optimize(conf,function(res){
    util.log("js/css compress end")
    cb()
  })
});

//复制HTML并压缩
gulp.task("html:compress",function(cb){
  gulp.src('views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/src'))
    .on('end',function(){
      util.log('html:compress end')
      cb()
    })
});


gulp.task("add:rev",["rjs"],function(cb){
  var fjs = filter("**/**/app/*.js",{restore: true})
  var fcss = filter("dist/src/css/*.css",{restore: true})
  gulp.src(['dist/src/**/*.js',"dist/src/**/*.css"])
    .pipe(fjs)
    .pipe(rev())
    .pipe(fjs.restore)
    .pipe(fcss)
    .pipe(rev())
    .pipe(fcss.restore)
    .pipe(gulp.dest("dist"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("dist/src/rev/"))
    .on('end',function(){
      util.log('add:rev end')
      cb()
    })
})

gulp.task("html:replace",["add:rev",'html:compress'],function(cb){
  var manifest = gulp.src("./dist/src/rev/rev-manifest.json");
  gulp.src("dist/src/**/*.html")
    .pipe(replace({manifest:manifest}))
    .pipe(gulp.dest("dist"))
    .on('end',function(){
      util.log('html:replace end')
      cb()
    })
})

gulp.task('build',['del:dist'],function(cb){
  runSequence(["html:replace"],function(){
    rimraf('dist/src',cb)
    util.log("all end")
  })
})
