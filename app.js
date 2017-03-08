var express = require("express"),
ejs = require("ejs"),
open = require("open"),
app = express();
app.use(express.static("public"));
app.set("views",__dirname+"/views/");
app.engine("html",ejs.__express);
app.set("view engine","html");
app.get('*',function(req,res){
  if (req.url == '/favicon.ico'){
    return res.status(204).end() 
  }
  var file = req.url.replace(/^\//, '').split('/')[0]
  var path = file ? file : 'index'
  // console.log(req.url.replace(/^\//, '').split('/'))
  res.render(path)
})
app.listen(3200)
open('http://localhost:3200')

