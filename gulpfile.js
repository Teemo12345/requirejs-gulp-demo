var gulp = require("gulp");
var rjs = require("requirejs")
gulp.task('default',function(){
  console.log("default")
})

gulp.task("rjs",function(){
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
        // exclude: ['js/app/common'] //排除，data-main的多页面文件中的require[comman']中的common前面加./common不然会找不到路径错误
      },
      {
        name:"js/app/app2",
        include:"js/app/user/user",
        // exclude:['js/app/common']
      }
    ],
    optimizeCss:"standard",
    // skipDirOptimize:true,
    // normalizeDirDefines: "skip",
    removeCombined: true, //如果设置为true，在输出目录将会删除掉已经合并了的文件
    // paths:{
    //   app:"app/"
    // },
    dir:"./dist", //输出路径
    optimize:"uglify"//使用uglify压缩js
  }
  rjs.optimize(conf,function(res){
    console.log("rjs end")
  })
})