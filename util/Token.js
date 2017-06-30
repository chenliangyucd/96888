var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var rf=require("fs");  
var path = require("path");
var weichatConfig = require("../config").weichat;
var GetUrls = require("./GetUrls");

 
// 读取文件
function readFile (path, encoding) {
  return new Promise(function (resolve, reject) {
  	rf.readFile(path, encoding, function(err,data){  
      if(err){  
        console.log("读取文件失败");  
        reject();
      }else{  
        console.log(data);
        resolve(data);
      }  
    }); 
  });
}

// 写入文件
function writeFile (path, content) {
  rf.appendFile(path, content, function(err){  
    if (err) {
      console.log("fail " + err);  
    } else {  
      console.log("写入文件ok");  
    }
  });  
}

/**
*集中管理微信的access_token
*/
function Token () {
  this.appid = weichatConfig.appID;
  this.secret = weichatConfig.appSecret;
  this.filePath = path.join(__dirname, './config/access_token.txt');
  this.access_token = null;
  var that = this;
  this.getAccessToken().then(function(access_token){

    console.log("access_token", access_token);
    
  });
}


Token.prototype.getAccessToken = function () {
  var that = this;
  return new Promise(function(resolve, reject) {
    if (that.isValidAccessToken(that.access_token)) {
      console.log("直接获取access_token");
      resolve(that.access_token.access_token);
    } else {
      console.log("发送请求获取access_token");
      that.updateAccessToken().then(function (data) {
        that.access_token = data;
        resolve(data.access_token);
  
      });
    }
  });
};


Token.prototype.updateAccessToken = function () {
  var tokenUrl = GetUrls("token");
  tokenUrl += "?grant_type=client_credential&appid="+ weichatConfig.appID +"&secret=" + weichatConfig.appSecret;
  
  return new Promise(function (resolve, reject) {
    request({url: tokenUrl,json: true}).then(function (response) {
    	
    	var time = (new Date()).getTime();
    	//response.body.access_token;
    	response.body.expires_in = response.body.expires_in + time;
    	
    	resolve(response.body);
    });
  });
};


Token.prototype.isValidAccessToken = function (access_token) {
  if (!access_token) {
    return false;
  }

  var time = (new Date()).getTime() - 20;
  
  //过期了需要重新请求
  if (access_token.expires_in < time) {
    return false;
  }

  return true;

};





module.exports = new Token();