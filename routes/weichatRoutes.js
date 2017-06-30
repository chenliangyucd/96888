var Router = require("koa-router");
var weichatController = require("../controller/weichat/weichatController");

var weichatRouter = new Router();


weichatRouter.all('/', weichatController.weichat);


module.exports = weichatRouter;