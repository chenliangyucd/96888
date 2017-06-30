var LogUtil = require('../util/LogUtil');
module.exports = async (ctx, next) => {
  const startDate = new Date();
  var ms;
  try {
  	console.log("开始打印入参");
    await next();
    ms = new Date() - startDate;
    LogUtil.logResponse(ctx, ms);
  } catch (error) {
    console.log("开始打印错误日志");
    ms = new Date() - startDate;
    LogUtil.logError(ctx, error, ms);
  }
  
};

