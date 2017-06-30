var format = {
  //将这个对象中所有数组中只有一个元素提取出来，去掉数组
  xmlJsonFormat: function (data) {
    console.log(typeof data);

    if (typeof data !== "object" || data === null) {
      return data;
    } 

    for (var key in data) {
      if (data[key] instanceof Array) {
      	console.log("对像的key值:", key);
      	//如果数组长度
      	if (data[key].length === 1) {
           data[key] = this.xmlJsonFormat(data[key][0]); 
      	}
      }
    }

    return data;
  }


}


module.exports = format;

