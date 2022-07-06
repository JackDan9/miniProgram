// pages/recurite/recurite.js
"use strict";

let app = getApp();
const api = require("../../utils/api.js");
let apiHelper = require("../../utils/api.js");
let util = require("../../utils/util.js");

Page({
  /**
   * @description 页面的初始数据
   */
  data: {
    isPhoneX: app.globalData.isPhoneX ? true : false,
    currentPageNumber: 1,
    currentDate: util.getLocalTime(),
    currentDateIsNoDate: true,
    isBusy: false,
    fastScroll: true,
    dateArray: [],
    recuriteArray: [],
  },
  /**
   * 去到招聘详情页
   * 
   * @param {*} event 
   */
  toRecuriteDetail: function(event) {
    wx.navigateTo({
      url: `/pages/content/content?id=${event.currentTarget.id}&type=recurite`,
    });
  },
  /**
   * 
   * @param {*} options 
   */
  onLoad: function(options) {
    this.getRecuriteList(this.data.currentPageNumber);
  },
  getRecuriteList(pageNumber, pageSize = 10) {
    let self = this;
    self.data.isBusy = true;

    apiHelper.paramData.cmd = "getRecuriteList"; // cmd
    apiHelper.paramData.loadingState = false;
    apiHelper.paramData.param = {
      pageNumber,
      pageSize
    };

    apiHelper.request((res) => {
      if(res.code == 200) {
        let _data = res && res.result && res.result.rows;
        if(_data.length == 0) {
          // 标识数据已被全部请求完
          self.data.currentDateIsNoData = false;
        } else {
          self.data.recuriteArray = self.data.recuriteArray.concat(_data);
          // 数据剩余条数不超过请求条数，说明下一页已没有数据
          if(_data.length < pageSize) {
            // 标识数据已被全部请求完
            // 这里需要考虑一种情况，它本身的数据就是小于pageSize的怎么办
            // 这个时候就这样判断容易出错
            // 例如: 初始进来的时候, pageSize是10，但是_data只有5条
            let _array = _data;
            for(let i = 0; i < _array.length; i++) {
              let _publish_date = (_array[i].publish_at || _array[i].created_at).substr(0, 10);
              _publish_date = util.getLocalTime(0, new Date(_publish_date));
              if(_publish_date == util.getLocalTime()) {
                _publish_date = "今天";
              } else if(_publish_date == util.getLocalTime(-1)) {
                _publish_date = "昨天";
              } else if(_publish_date == util.getLocalTime(-2)) {
                _publish_date = "前天";
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
                  self.data.currentPageNumber = 1;
                }
              } else {
                self.data.dateArray.push({
                  date: _publish_date,
                  array: [_array[i]]
                });
              }
            }
            self.data.currentDateIsNoData = false;
          } else {
            let _array = _data;
            for(let i = 0; i < _array.length; i++) {
              let _publish_date = (_array[i].publish_at || _array[i].created_at).substr(0, 10);
              _publish_date = util.getLocalTime(0, new Date(_publish_date));
              if(_publish_date == util.getLocalTime()) {
                _publish_date = "今天";
              } else if(_publish_date == util.getLocalTime(-1)) {
                _publish_date = "昨天";
              } else if(_publish_date == util.getLocalTime(-2)) {
                _publish_date = "前天";
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
                  self.data.currentPageNumber = 1;
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
    }, 'post');
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
        this.data.currentPageNumber = this.data.recuriteArray[this.data.recuriteArray.length - 1].id;
        this.getRecuriteList(this.data.currentPageNumber);
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
  },
});