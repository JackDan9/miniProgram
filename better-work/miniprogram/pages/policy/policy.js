// pages/policy/policy.js
"use strict";

const api = require("../../utils/api.js");

let apiHelper = require("../../utils/api.js");
let util = require("../../utils/util.js");

let app = getApp();

Page({
  /**
   * @description 页面的初始数据
   */
  data: {
    isPhoneX: app.globalData.isPhoneX ? true : false,
    currentPageIndex: 1, 
    currentDate: util.getLocalTime(), 
    currentDateIsNoData: true,
    isBusy: false,
    fastScroll: true,
    dateArray: [],
    policiesArray: []
  },
  /**
   * @function toPage
   * @param {object} event
   * @description 到达指定id的文章目录位置
   */
  toPage: function(event) {
    wx.navigateTo({
      url: `/pages/content/content?id=${event.currentTarget.id}`
    });
  },
  /**
   * @function onLoad
   * @param {object} options
   * @description 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getListPolicies(this.data.currentPageIndex);
  },
  /**
   * @function getListPolicies
   * @param {number} pageIndex 
   * @param {number} pageSize 
   * @description 获取经济新闻信息
   */
  getListPolicies(pageIndex, pageSize =  10) {
    let self = this;
    self.data.isBusy = true;

    apiHelper.paramData.cmd = "polices"; // cmd
    apiHelper.paramData.loadingState = false;
    apiHelper.paramData.param = {
      pageIndex,
      pageSize
    };

    apiHelper.post((res) => {
      if(res.status === 0) {
        let _data = res.data;
        if(_data.length == 0) {
          // 标识数据已被全部请求完
          self.data.currentDateIsNoData = false;
        } else {
          self.data.policiesArray = self.data.policiesArray.concat(_data);
          // 数据剩余条数不超过请求条数，说明下一页已没有数据
          if(_data.length < pageSize) {
            // 标识数据已被全部请求完
            self.data.currentDateIsNoData = false;
          } else {
            let _array = _data;
            for(let i = 0; i < _array.length; i++) {
              let _publish_date = _array[i].publish_on.substr(0, 10);
              _publish_date = util.getLocalTime(0, new Date(_publish_date));
              if(_publish_date == util.getLocalTime()) {
                _publish_date = "今天";
              } else if(_publish_date == util.getLocalTime(-1)) {
                _publish_date = "昨天";
              }

              let _index = self.data.dateArray.findIndex(item => {
                return item.date == _publish_date;
              });

              if(_index != -1) {
                // 如果有数据, 数组
                if(_data.length > 0) {
                  self.data.dateArray[_index].array.push(_array[i]);
                } else {
                  // 标识当天数据已被全部请求完
                  self.data.currentDateIsNoData = false;
                  self.data.currentPageIndex = 1;
                }
              } else {
                self.data.dateArray.push({
                  date: _publish_date,
                  array: [_array[i]]
                });
              }
            }
            self.data.currentDateIsNoData = true;
          }
        }
      }
      self.setData({
        dateArray: self.data.dateArray
      });
      this.data.isBusy = false;
    }, 'get');
  },
  /**
   * @function scrollToLowerNewEvent 
   * @param {object} event 
   * @description 滚动到底部处理事件
   */
  scrollToLowerNewEvent: function (event) {
    let self = this;

    if(!self.data.isBusy) {
      // 查看当天是否还输数据
      if(this.data.currentDateIsNoData) {
        this.data.currentPageIndex = this.data.policiesArray[this.data.policiesArray.length - 1].id;
        this.getListPolicies(this.data.currentPageIndex);
      } else {
        wx.showToast({
          title: '没有数据了',
          icon: 'none',
          duration: 500
        });
      }
    }
  },
  /**
   * @function onReady
   * @description 生命周期函数---监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * @function onShow
   * @description 生命周期函数---监听页面显示
   */
  onShow: function () {

  },
  /**
   * @function onHide
   * @description 生命周期函数---监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * @function onUnload
   * @description 生命周期函数---监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * @function onPullDownRefresh
   * @description 页面相关事件处理函数---监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("xial");
    // wx.startPullDownRefresh({
    //   success: (res) => {},
    // });
    // 在标题栏中显示加载
    // wx.showNavigationBarLoading({
    //   success: (res) => {},
    // });
  },
  /**
   * @function onReachBottom
   * @description 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   *  @function onShareAppMessage
   * @description 用户点击右上角分享 
   */
  onShareAppMessage: function (res) {
    if(res.form === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }

    return {
      title: 'test',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  }
});