var formatData = {
  weichat: function (ctx) {
  	return;
  },
  default: function (ctx) {
  	var result = {
  		code: 0,
        message: "succeess"
  	};

    if (ctx.body) {
      result.data = ctx.body
    }

    ctx.body = result;

    return result; 
    
  }

};




module.exports = async (ctx, next) => {

  await next();
  formatData[ctx.intfType || 'default'](ctx);

}