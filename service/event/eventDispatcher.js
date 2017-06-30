var subscribeEvent = require("./subscribeEvent");
var unsubscribeEvent = require("./unsubscribeEvent");

var eventDispatcher = (function () {

  var events = {
     "subscribeEvent": subscribeEvent,//订阅公众号
     "unsubscribeEvent": unsubscribeEvent//取消订阅公众号
  };

  return function (data) {
  	//默认回掉
  	var reply = "success";
  	//如果存在匹配规则则进行
  	if (typeof events[data.Event] === "function") {
  	  reply = events[data.Event](data);	
  	}
  	return reply;
  }

})();



module.exports = eventDispatcher;