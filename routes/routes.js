
var Router = require("koa-router");
var userRoutes = require('./userRoutes');
var suggestRoutes = require('./suggestRoutes');
var weichatRoutes = require('./weichatRoutes');

const rootRouter = new Router();
const API = "/api";
rootRouter.use(API, userRoutes.routes(), userRoutes.allowedMethods());
rootRouter.use(API, suggestRoutes.routes(), suggestRoutes.allowedMethods());
rootRouter.use('/', weichatRoutes.routes(), weichatRoutes.allowedMethods());

module.exports = rootRouter;