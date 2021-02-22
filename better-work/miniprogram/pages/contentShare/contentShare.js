// pages/contentShare/contentShare.js
let apiHelper = require("../../utils/api.js");

/**
 * @function findBreakPoint
 * @param {@} text 
 * @param {*} width 
 * @param {*} context 
 */
function findBreakPoint(text, width, context) {
  let min = 0;
  let max = text.length - 1;
  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let middleWidth = context.measureText(text.substr(0, middle)).width;
    let oneCharWiderThanMiddleWidth = context.measureText(text.substr(0, middle + 1)).width;
    if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
      return middle;
    }

    if (middleWidth < width) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }

  return -1;
}

/**
 * @function breakLinesForCanvas
 * @param {*} context 
 * @param {*} text 
 * @param {*} width 
 * @param {*} font 
 */
function breakLinesForCanvas(context, text, width, font) {
  let result = [];
  if (font) {
    context.font = font;
  }
  let textArray = text.split('\r\n');
  for (let i = 0; i < textArray.length; i++) {
    let item = textArray[i];
    let breakPoint = 0;
    while ((breakPoint = findBreakPoint(item, width, context)) !== -1) {
      result.push(item.substr(0, breakPoint));
      item = item.substr(breakPoint);
    }
    if (item) {
      result.push(item);
    }
  }
  return result;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#010101',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });

    let self = this;
    let id = options.id;
    self.setData({
      id: id
    });
    wx.getStorage({
      key: 'shareInfo',
      success: function(res) {
        let info = JSON.parse(res.data)
        self.setData({
          info: info
        });
        self.drawInit(info);
      }
    });
  },

  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {},

  /**
   * @function drawInit
   * @param {*} info 
   * @description 绘制图片
   */
  drawInit: function(info) {
    let self = this;

    let contentTitle = info.title;
    let contentStr = info.intro;

    let res = wx.getSystemInfoSync();
    let canvasWidth = res.windowWidth;
    // 获取canvas的的宽  自适应宽（设备宽/750) px
    let Rpx = (canvasWidth / 375).toFixed(2);
    //画布高度 -底部按钮高度
    let canvasHeight = res.windowHeight - Rpx * 59;
    // 使用 wx.createContext 获取绘图上下文 context
    let context = wx.createCanvasContext('secondCanvas')
    //设置行高
    let lineHeight = Rpx * 30;
    //左边距
    let paddingLeft = Rpx * 20;
    //右边距
    let paddingRight = Rpx * 20;
    //当前行高
    let currentLineHeight = Rpx * 20;
    //背景颜色默认填充
    context.fillStyle = "#f8f8f8";
    context.fillRect(0, 0, canvasWidth + Rpx * 2, canvasHeight);
    //标题内容颜色默认
    context.fillStyle = "#fff";
    //高度减去 图片高度
    context.fillRect(Rpx * 15, Rpx * 15, canvasWidth - Rpx * 30, canvasHeight);
    //设置标题
    let resultTitle = breakLinesForCanvas(context, contentTitle, canvasWidth - paddingLeft - paddingRight, `${(Rpx * 20).toFixed(0)}px PingFangSC-Regular`);
    //字体颜色
    context.fillStyle = '#000000';
    resultTitle.forEach(function(line, index) {
      currentLineHeight += Rpx * 30;
      context.fillText(line, paddingLeft, currentLineHeight);
    });
    //设置  来源 浏览量
    let source = `来源：${info.source == 1 ? info.author || "原创" : info.reprintSource || "转载"}`
    let browsingVolume = `浏览量：${info.browseCount||0}`;
    currentLineHeight += Rpx * 30;
    // context.measureText(text).width
    context.font = `${(Rpx * 15).toFixed(0)}px PingFangSC-Regular`;
    //字体颜色
    context.fillStyle = '#999999';
    context.fillText(source, paddingLeft, currentLineHeight);
    context.setTextAlign('right');
    context.fillText(browsingVolume, canvasWidth - paddingRight, currentLineHeight);
    //恢复左对齐
    context.setTextAlign('left');
    //画分割线
    currentLineHeight += Rpx * 15;
    context.setLineDash([Rpx * 6, Rpx * 3.75]);
    context.moveTo(paddingLeft, currentLineHeight);
    context.lineTo(canvasWidth - paddingRight, currentLineHeight);
    context.strokeStyle = '#cccccc';
    context.stroke();
    //设置内容
    let result = breakLinesForCanvas(context, contentStr || '无内容', canvasWidth - paddingLeft - paddingRight, `${(Rpx * 16).toFixed(0)}px PingFangSC-Regular`);
    // console.log(result);
    //字体颜色
    context.fillStyle = '#666666';
    result.forEach(function(line, index) {
      currentLineHeight += Rpx * 30;
      context.fillText(line, paddingLeft, currentLineHeight);
    });
    //无广告位 生成文章详情二维码 
    // apiHelper.paramData.cmd = "studyAbroadNews/getQrCode"; //cmd
    apiHelper.paramData.cmd = "study_abroad_news/get_news_detail"; //cmd
    apiHelper.paramData.param = {
      id: self.data.id,
      width: 200,
      page: "pages/content/content",
      colorR: 0,
      colorG: 0,
      colorB: 0,
      isHyaline: true
    };
    apiHelper.post((res) => {
      if (res.State == 0 && typeof(res.Value) == "string") {
        context.drawImage('/imgs/nocode.png', paddingLeft - Rpx * 5, canvasHeight - Rpx * 115, canvasWidth - paddingLeft - paddingRight + Rpx * 10, Rpx * 115);
        wx.downloadFile({
          url: res.Value, //仅为示例，并非真实的资源
          success: function(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              context.drawImage(res.tempFilePath, Rpx * 30, canvasHeight - Rpx * 115 + Rpx * 10, Rpx * 100, Rpx * 100);
              context.draw();
            }
          },
          fail: function(err) {
            console.error(err)
            context.drawImage('/imgs/code.png', paddingLeft - Rpx * 5, canvasHeight - Rpx * 115, canvasWidth - paddingLeft - paddingRight + Rpx * 10, Rpx * 115);
            context.draw();
          }
        })
      } else {
        context.drawImage('/imgs/code.png', paddingLeft - Rpx * 5, canvasHeight - Rpx * 115, canvasWidth - paddingLeft - paddingRight + Rpx * 10, Rpx * 115);
        context.draw();
      }
    });
  },

  /**
   * @function saveImge
   * @description 保存图片
   */
  saveImg: function() {
    let self = this;
    wx.canvasToTempFilePath({
      canvasId: 'secondCanvas',
      fileType: 'jpg',
      success: function(res) {
        console.log(res.tempFilePath) // 返回图片路径
        wx.showLoading({
          title: '保存中...',
          mask: true
        });
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function(res) {
            wx.hideLoading()
            console.log(res)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.info.title,
      path: '/pages/content/content?id=' + this.data.id,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})