var Router = require("koa-router");
var suggestController = require("../controller/suggest/suggestController");

var suggestRouter = new Router();

var wrapSuggestRouter = new Router();


suggestRouter.get('/save', suggestController.saveSuggest);

/*最外层嵌套*/
wrapSuggestRouter.use('/suggest', suggestRouter.routes(), suggestRouter.allowedMethods());

module.exports = wrapSuggestRouter;