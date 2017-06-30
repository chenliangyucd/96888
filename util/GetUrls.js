var GetUrls = (function () {
  var baseUrl = "https://api.weixin.qq.com";
  var urls = {
  	"token": "/cgi-bin/token"

  };

  return function (type) {
    var url = "";

    if (urls[type]) {
      url = urls[type];
    }

    return baseUrl + url;
  }

})();



module.exports = GetUrls;