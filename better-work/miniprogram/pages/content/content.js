// pages/content/content.js
var apiHelper = require("../../utils/api.js");
Page({
  /**
   * @description 页面的初始数据
   */
  data: {
    newsArray: [],
    newsDetail: {},
    animation: '',
    shareTitle:"",
    shareContent:"",
    shareId: 0,
    swiperIndex: 0,
    previousMargin: 35, //swiper 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: 35, //swiper 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    isBusy: false, //是否正在请求数据中
    backButton: false, // 返回首页 按钮显示状态，识别二维码进入显示 ，否则不显示
    currentPageIndex: 1, //当前请求全局页数
    currentDateIsNoData: true, //当前天是否还有数据
  },
  /**
   * @function toPage
   * @param {*} event 
   */
  toPage: function(event) {
    wx.showToast({
      title: `暂未开放！`,
      icon: 'none',
      duration: 2000
    })
    return;
    wx.navigateTo({
      url: `/pages/contentDetails/contentDetails?id=${event.target.id}`
    })
  },
  toPageIndex: function(event) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  loadData: function() {
    if (!this.data.isBusy) {
      //查看当天是否还有数据
      if (this.data.currentDateIsNoData) {
        this.data.currentPageIndex = this.data.newsArray[this.data.newsArray.length - 1].order;
        this.getNewsList(this.data.currentPageIndex);
      }
    }
  },

  swiperChange: function(event) {
    if (event.detail.current == this.data.newsArray.length - 1) {
      this.loadData();
    }
  },
  /**
   * 获取新闻列表
   */
  getNewsList(pageIndex, pageSize = 10) {
    this.data.isBusy = true;
    let self = this;
    apiHelper.paramData.cmd = "getNewsList"; //cmd getNewsList
    apiHelper.paramData.loadingState = false;
    apiHelper.paramData.param = {
      pageIndex,
      pageSize
    };
    apiHelper.request((res) => {
      if (res.status == 0) {
        let _data = res.data;
        if (_data.length == 0) {
          //标识数据已被全部请求完
          self.data.currentDateIsNoData = false;
        } else {
          self.data.newsArray = self.data.newsArray.concat(_data);
          //数据  剩余条数不超过请求条数，说明下一页已没有数据
          if (_data.length < pageSize) {
            //标识数据已被全部请求完
            self.data.currentDateIsNoData = false;
          } else {
            self.data.currentDateIsNoData = true;
          }
        }
      }
      self.setData({
        newsArray: self.data.newsArray
      });
      this.data.isBusy = false;
    }, 'post');
  },
  nothing: function() {},
  
  /**
   * @function openAttachment
   * @param {*} event
   * @description 打开附件 
   */
  openAttachment: function(event) {
    wx.downloadFile({
      url: event.target.dataset.content, //要预览的PDF的地址
      success: function (res) {
        // console.log(res);
        if (res.statusCode === 200) { //成功
          let Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path, //要打开的文件路径
            showMenu: true,
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
  },
  /**
   * @function saveShare
   * @param {*} event 
   * @description 保存分享事件
   */
  saveShare: function(event) {
    console.log('save share event !' + this.data.shareId)
    this.cancelShare();
    wx.navigateTo({
      url: `/pages/contentShare/contentShare?id=${this.data.shareId}`
    })
  },

  /**
   * @function share
   * @param {*} event 
   * @description 分享事件
   */
  share: function(event) {
    this.data.shareId = event.target.id;
    let title = event.target.dataset.title||"";
    let info = event.target.dataset.content||"";
    wx.setStorage({
      key: "shareInfo",
      data: JSON.stringify({
        title: title,
        intro: info
      })
    })
    //弹出
    this.animation.translate3d(0, 0, 0).step();
    this.setData({
      animation: this.animation.export()
    })
  },
  /**
   * @function cancelShare
   * @description 取消分享事件
   */
  cancelShare: function() {
    //收起
    this.animation.translate3d(0, 1000, 0).step();
    this.setData({
      animation: this.animation.export()
    })
  },

  /**
   * @function onLoad
   * @param {*} options 
   * @description 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (options.scene) {
      let scene = decodeURIComponent(options.scene)
      options.id = scene;
      this.setData({
        backButton: true
      });
    }

    let pages = getCurrentPages();

    let currPage = pages[pages.length - 1]; //当前页面
    let prevPage = pages[pages.length - 2]; //上一个页面

    //判断入口
    if (false) {
      //直接调用上一个页面的setData()方法，把数据存到上一个页面即编辑款项页面中去  
      // let swiperIndex = prevPage.data.newsArray.findIndex(item => {
      //   return item.id == options.id;
      // });
      
      let _newsArray = prevPage.data.newsArray.find(item => {
        return item.id == options.id;
      });

      let swiperIndex = _newsArray.newsArray.findIndex(item => {
        return item.parent_id == options.id;
      });

      this.setData({
        swiperIndex: swiperIndex,
        currentPageIndex: prevPage.data.currentPageIndex,
        currentDateIsNoData: prevPage.data.currentDateIsNoData
      });
      this.setData({
        newsArray: _newsArray.newsArray //当前选择的好友名字赋值给编辑款项中的姓名临时变量
      });
    } else {
      let id = options.id;
      let type = options.type;
      let cmd = "getNewsDetail";
      if(type=="recurite") {
        cmd = "getRecuriteDetail";
      }
      let self = this;
      self.setData({
        id: id
      });
      // apiHelper.paramData.cmd = "studyAbroadNews/getNewsDetail"; //cmd
      // apiHelper.paramData.cmd = "study_abroad_news/get_news_detail"; //cmd
      // apiHelper.paramData.cmd = "getNewsDetail";

      apiHelper.paramData.cmd = cmd;
      apiHelper.paramData.param = {
        id: id
      };
      apiHelper.request((res) => {
        console.log("res: ", res);
        if (res.code == 200 && res.result) {
          self.setData({
            newsArray: [res.result],
            newsDetail: res.result //当前选择的好友名字赋值给编辑款项中的姓名临时变量
          });
          self.loadData();
        }
      }, 'post');
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation()
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

  }
})