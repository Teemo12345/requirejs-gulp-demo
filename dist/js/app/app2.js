require.config({baseUrl:"/js/",paths:{app:"app"}}),define("js/app/common",function(){}),require(["./common"],function(e){require(["app/user/user"],function(e){e.showUser()})}),define("js/app/app2",function(){}),define("js/app/user/user",[],function(){var e={name:"teemo",pass:"123456"},n=function(){document.getElementById("user").innerHTML="<h1>"+e.name+"</h1><h2>"+e.pass+"</h2>"};return{showUser:n}});