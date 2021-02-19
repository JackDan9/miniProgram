wx.downloadFile({
  url: 'http://**.*****.***/reshaiwai/demo.pdf', //要预览的PDF的地址
  success: function (res) {
    console.log(res);
    if (res.statusCode === 200) { //成功
      var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
      wx.openDocument({
        filePath: Path, //要打开的文件路径
        success: function (res) {
          console.log('打开PDF成功');
        }
      })
    }
  },
  fail: function (res) {
    console.log(res); //失败
  }
});