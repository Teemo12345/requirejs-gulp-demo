define(function(){
  var user = {
    name:'teemo',
    pass:'123456'
  }
  var showUser = function(){
    document.getElementById("user").innerHTML="<h1>"+user.name+"</h1>"+"<h2>"+user.pass+"</h2>";
  }
  return {
    showUser:showUser
  }
})