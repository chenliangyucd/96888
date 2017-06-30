var textType = require("./textType");
var imageType = require("./imageType");
var eventDispatcher = require("../event/eventDispatcher");

var msgTypeDispatcher = (function () {

  var msgTypes = {
     "text": textType,
     "image": imageType,
     "event": eventDispatcher 
  };
  
  var commonData = {
    ToUserName : "",
    FromUserName : "gh_68c68354ff8b",
    CreateTime: null 
  };

  return function (data) {
  	//默认回掉
  	var reply = "success";
  	//如果存在匹配规则则进行
  	if (typeof msgTypes[data.MsgType] === "function") {
  	  reply = msgTypes[data.MsgType](data);	
  	}
    
    
  	return reply;

  }

})();



module.exports = msgTypeDispatcher;


