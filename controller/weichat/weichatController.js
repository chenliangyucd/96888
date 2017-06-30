var convert = require('koa-convert');// koa 官网推荐的转换方式
var sha1 = require("sha1");
var getRawBody = require("raw-body");
var xml2js = require('xml2js');
var Token = require('../../util/Token');
var weichatConfig = require("../../config").weichat;
var format = require('../../util/Format');
var msgTypeDispatcher = require('../../service/msgType/msgTypeDispatcher');

//url后面没有路径的
exports.weichat = async (ctx, next) => {
  
    var signature = ctx.query.signature;
    var nonce = ctx.query.nonce;
    var timestamp = ctx.query.timestamp;
    var echostr = ctx.query.echostr;

    var str = [weichatConfig.token, timestamp, nonce].sort().join('');
    var shaStr = sha1(str);
    
    //var that = this; 
     
    console.log("打印shaStr:", shaStr);
    console.log("打印signature:", signature);
    console.log("打印接口method", ctx.method);
    // 用于验证微信的get请求

    if (shaStr !== signature) {
      ctx.body = "wrong";    
      return;
    } else {
      ctx.intfType = "weichat";
    }
   

    //通过验证后进行接口处理    
    if (ctx.method === "GET") {
      ctx.body = echostr;
      
    } else if (ctx.method === "POST") {
      var data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: "1mb",  
        encoding: ctx.charset
      });
      console.log("xml数据结构:", data.toString());

      xml2js.parseString(data.toString(), {trim: true}, function (err, result) {

        if (err) {
          console.log(err);

        } else {
          /*格式化过后的返回正常json对象
          * {"ToUserName":"gh_68c68354ff8b","FromUserName":"oVY140ok6Xj0iXkXIfyj9-SKZOMM","CreateTime":"1497507710","MsgType":"text","Content":"哈哈哈哈哈","MsgId":"6431746640394630122"}
          */
          result = format.xmlJsonFormat(result.xml);
          console.log("result格式化过的", JSON.stringify(result));

          ctx.body = msgTypeDispatcher(result);

        }

      });
    
    } else {
      ctx.body = "wrong";
    }
};
