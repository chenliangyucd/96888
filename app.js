var Koa = require('koa');
var sha1 = require('sha1');

var config = {
  wechat: {
    appID: '',
    appSecret: '',
    token: ''
  }
};


var app = new Koa();

app.use(function * (next) {
  console.log(this.query);

  var signature = this.query.signature;
  var nonce = this.query.nonce;
  var timestamp = this.query.timestamp;
  var ecostr = this.query.ecostr;

  var str = [];

  if (sha === signature) {
  	this.body = ecostr;
  } else {
  	this.body = "wrong";
  }
});


app.listen(8089);

console.log("listen 8089");