var BusError = require('../../error/Error');
var mongoose = require('mongoose');    //引用mongoose模块
var UserTests = require('../../model/UserTests');
//连接数据库

//获取用户
exports.getUser = async (ctx, next) => {
  console.log('进入接口getUser');


  //var userTests = new UserTests({name:'abcsdfdfdfsdfdsfs'});
   
  //await userTests.save();
  /*
  await userTests.save().catch(err => {
  	console.log('dayin error log');
    console.log(err);
  });*/
  /**/
  var userTests = new UserTests({name: "chenliangyuappgetUser"}); 
  await userTests.save(); 
  ctx.body = {
    username: '阿，希爸',
    age: 30
  };
  console.log('离开接口getUser');
  

  //throw new BusError(BusError.TemplateNotFound);
};

//用户注册
exports.saveRegisterUser = async (ctx, next) => {
  console.log('registerUser', ctx.request.body);
}