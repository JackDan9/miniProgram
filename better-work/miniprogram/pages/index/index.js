"use strict";

// pages/index/index.js
let apiHelper = require("../../utils/api.js");
let util = require("../../utils/util.js");

let app = getApp();

Page({
  /**
   * @description 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX ? true : false,
    currentPageNumber: 1, //当前请求全局页数
    currentDate: util.getLocalTime(), //当前请求日期
    currentDateIsNoData: true, //当前天是否还有数据
    isBusy: false, //是否正在请求数据中
    fastScroll: true, //第一次滚动加载
    array: [], //日期结构数据
    newsArray: [] //所有文章存放数组
  },
  /**
   * @function toPage
   * @param {*} event
   * @description 
   */
  toPage: function (event) {
    wx.navigateTo({
      url: `/pages/content/content?id=${event.currentTarget.id}`
    })
  },
  /**
   * @function openNews
   * @param {object} event
   * @description 跳转到经济新闻页面
   */
  openNews: function(event) {
    wx.navigateTo({
      url: '/pages/news/news',
    });
  },
  /**
   * @function openPolicy
   * @param {object} event
   * @description 跳转到经济政策页面
   */
  openPolicy: function(event) {
    wx.navigateTo({
      url: '/pages/policy/policy',
    });
  },
  /**
   * 
   * @param {*} options 
   */
  openRecurite: function(event) {
    wx.navigateTo({
      url: '/pages/recurite/recurite',
    });
  },
  /**
   * @function onLoad
   * @param {*} options 
   * @description 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsList(this.data.currentPageNumber);
  },
  /**
   * @function scrollToLowerNewEvent
   * @param {*} e 
   * @description 滚动加载 new
   */
  scrollToLowerNewEvent: function (e) {
    let self = this;

    if (!self.data.isBusy) {
      //查看当天是否还有数据
      if (this.data.currentDateIsNoData) {
        // this.data.currentPageNumber = this.data.newsArray[this.data.newsArray.length-1].order;
        this.data.currentPageNumber = this.data.newsArray[this.data.newsArray.length - 1].id;
        this.getNewsList(this.data.currentPageNumber);
      } else {
        wx.showToast({
          title: '没有数据了',
          icon: 'none',
          duration: 500
        })
      }
    }
  },
  /**
   * @function getNewsList
   * @param {*} pageNumber 
   * @param {*} pageSize 
   * @description 获取新的新闻数据
   */
  getNewsList(pageNumber, pageSize = 10) {
    let self = this;

    self.data.isBusy = true;
    
    apiHelper.paramData.cmd = "getNewsList"; // cmd
    apiHelper.paramData.loadingState = false;

    apiHelper.paramData.param = {
      pageNumber,
      pageSize
    };
    apiHelper.request((res) => {
      if (res.code == 200) {
        let _data = res && res.result && res.result.rows;
        if (_data.length == 0) {
          //标识数据已被全部请求完
          self.data.currentDateIsNoData = false;
        } else {
          self.data.newsArray = self.data.newsArray.concat(_data);
          //数据剩余条数不超过请求条数，说明下一页已没有数据
          if (_data.length < pageSize) {
            //标识数据已被全部请求完
            self.data.currentDateIsNoData = false;
          } else {
            let array = _data;
            for (let i = 0; i < array.length; i++) {
              let pushdate = array[i].publish_at.substr(0, 10);
              pushdate = util.getLocalTime(0, new Date(pushdate));
              if (pushdate == util.getLocalTime()) {
                pushdate = "今天";
              } else if (pushdate == util.getLocalTime(-1)) {
                pushdate = "昨天";
              }
              let index = self.data.array.findIndex(item => { return item.date == pushdate });
              if (index != -1) {
                //如果有数据，数组
                if (_data.length > 0) {
                  self.data.array[index].array.push(array[i])
                }
                else {
                  //标识当天数据已被全部请求完
                  self.data.currentDateIsNoData = false;
                  self.data.currentPageNumber = 1;
                }
              } else {
                self.data.array.push({
                  date: pushdate,
                  array: [array[i]]
                })
              }
            }
            self.data.currentDateIsNoData = true;
          }
        }
      }
      self.setData({
        array: self.data.array
      });
      this.data.isBusy = false;
    }, 'post');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("xial")
    // wx.startPullDownRefresh()
    //在标题栏中显示加载
    // wx.showNavigationBarLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '测试',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})