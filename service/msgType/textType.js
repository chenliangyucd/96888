var Reply = require("../../util/Reply");

/*
*这里是对接受到的消息处理
*
*/
module.exports = function (receiveData) {
  var replyData = {
    MsgType: "text",
    Content: "啊啦啦啦啦啦啦啦啦我是来测试的"
  };

  return Reply(replyData, receiveData);

}


