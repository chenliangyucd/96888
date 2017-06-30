var Koa = require('koa');
var Token = require('./util/Token');
var routes = require('./routes/routes');

var logMiddleWare = require('./middlewares/logMiddleWare');
var errorMiddleWare = require('./middlewares/errorMiddleWare');
var rfMiddleWare = require('./middlewares/rfMiddleWare');
var UserTests = require('./model/UserTests');

var mongoose = require('mongoose');    //引用mongoose模块
//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/96888');

var app = new Koa();

//打印log的中间件
app.use(logMiddleWare);
//处理异常的中间件
app.use(errorMiddleWare);
//格式化数据中间件
app.use(rfMiddleWare);

app.use(routes.routes()).use(routes.allowedMethods());

app.listen(8089);

/*node -harmony app.js*/
/*./mongod --dbpath  /Users/chenliangyu/DevApp/mongodb/data/db*/
/*https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index  测试公众号地址
*常用的反向代理微信代理到本机. ./sunny clientid 1bf8f527baf3486d
*
*
*常用网站
* http://www.jianshu.com/p/6b816c609669
* http://www.jianshu.com/p/0060d2d9b533
*https://zhuanlan.zhihu.com/p/26216336
*http://www.jianshu.com/p/dcdd116600fe
*/
console.log("listen 8089");