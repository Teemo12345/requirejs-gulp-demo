var gulp = require("gulp");
var rjs = require("requirejs")
gulp.task('default',function(){
  console.log("default")
})

gulp.task("rjs",function(){
  var conf = {
    appDir:'public', //项目路径
    baseUrl:'./', //最好和common.js中的baseUrl相同不然modules中的路径会有问题
    mainConfigFile:'public/js/app/common.js', //require.config({})文件绝对路径
    modules:[ //模块名，可能存在多个require() data-main 启动文件
      {
        name:"js/app/common"
      }
      ,
      {  
        name:"js/app/app1",//注意此处路径为,如果设置了appDir，此处必须为appdir后的路径
        include:['js/app/home/home'],//因为APP1为require加载文件，所以这里需要手动包含哪个文件，
        exclude: ['js/app/common'] //如果为多页面APP必须排除config不然会报错
      },
      {
        name:"js/app/app2",
        include:"js/app/user/user",
        // exclude:['js/app/common']
      }
    ],
    // paths:{
    //   app:"app/"
    // },
    dir:"./dist", //输出路径
    optimize:"uglify"//使用uglify压缩js
  }
  rjs.optimize(conf,function(res){
    console.log(res)
  })
})