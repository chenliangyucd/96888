var ejs = require('ejs');
var heredoc = require('heredoc');

/*
*真正生成字符串返回参数
*/
var tplStrs = {
  text: heredoc(function () {/*
    <xml>
      <ToUserName><![CDATA[<%=ToUserName%>]]></ToUserName>
      <FromUserName><![CDATA[<%=FromUserName%>]]></FromUserName>
      <CreateTime><%=CreateTime%></CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[<%=Content%>]]></Content>
    </xml>
  */})


};
var getReply = (function () {
   var templates = {
   	 text: ejs.compile(tplStrs.text)
   }

   var commonDate = function (replyData, receiveData) {
      replyData.ToUserName = receiveData.FromUserName;
      replyData.FromUserName = receiveData.ToUserName;
      replyData.CreateTime = (new Date()).getTime();
   }

   return function (replyData,receiveData) {
   	 var result = "success";
   	 replyData = replyData || {};
   	 if (templates[replyData.MsgType]) {
      commonDate(replyData, receiveData);
   	 	result = templates[replyData.MsgType](replyData);
      console.log("返回结果:", result);
   	 } else {
   	 	console.log("不存在匹配的MsgType返回默认值success");
   	 }
     return result;
   }
})();


module.exports = getReply;