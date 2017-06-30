var Router = require("koa-router");
var userController = require("../controller/user/userController");

var userRouter = new Router();

var wrapUserRouter = new Router();


userRouter.get('/getUser', userController.getUser);
userRouter.post('/registerUser', userController.saveRegisterUser);

/*最外层嵌套*/
wrapUserRouter.use('/users', userRouter.routes(), userRouter.allowedMethods());

module.exports = wrapUserRouter;