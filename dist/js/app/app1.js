require.config({baseUrl:"/js/",paths:{app:"app"}}),define("js/app/common",function(){}),require(["./common"],function(e){require(["app/home/home"],function(e){e.init()})}),define("js/app/app1",function(){}),define("js/app/home/home",[],function(){var e=function(){document.getElementById("home").innerText="home1"};return{init:e}});