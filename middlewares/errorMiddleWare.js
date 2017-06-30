/*统一拦截处理系统系统和业务级别异常*/
var BusError = require('../error/Error');

module.exports = async (ctx, next) => {
  
  try { 
    await next();    
  } catch (error) {
    if (error instanceof BusError) {
      ctx.body = {
      	code: error.code,
      	message: error.message
      }
    } else {
      ctx.body = {
      	code: '9999',
      	message: '服务有些不稳定，请稍后再试!',
      }
    }

    console.log(error);
    //再次抛出异常是为了让上面的日志记录去拦截
  	throw error;
  }


};