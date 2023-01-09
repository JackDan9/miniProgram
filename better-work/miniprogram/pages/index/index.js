"use strict";

// pages/index/index.js
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './chinaMap';

let apiHelper = require("../../utils/api.js");
let util = require("../../utils/util.js");
let chartOption = require('../index/chartOption');

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
    isLoaded: false,
    isDisposed: false,
    array: [], //日期结构数据
    chartData: [],
    newsArray: [], //所有文章存放数组
    weatherData: null, // 天气数据
    isCityShow: false, // 城市介绍是否显示,
    location: '北京市',
    ec: {
      // 将lazyLoad设为true后，需要手动初始化图表
      lazyLoad: true,
      disableTouch: true,
    },
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
   * @function onLoad
   * @param {*} options 
   * @description 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onSearch();
  },
  onSearch: function (e) {
    let self = this;

    const location = e ? e.detail.value : 'beijing';

    self.setData({
      location: location
    })
    apiHelper.paramData.cmd = `getCityWeather`; // cmd
    apiHelper.paramData.loadingState = false;
    apiHelper.paramData.param = {
      location: location
    }

    apiHelper.request((res) => {
      if (res.code == 200) {
        res.now.obsTime = util.formatTime(new Date(res.now.obsTime))
        self.setData({
          weatherData: res.now
        });
        self.setData({
          isCityShow: res.now.introduction && res.now.palatableDishs && res.now.sight
        });
        let _chartData = [];
        _chartData.push({
          name: res.now.cityName,
          value: [parseFloat(res.now.lon), parseFloat(res.now.lat), parseFloat(res.now.temp)]
        });
        self.setData({
          chartData: _chartData
        });

        this.init(this.data.chartData);
      }
    }, 'post');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent("#mychart-china-map");
  },

  init: function(optionData) {
    
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      
      canvas.setChart(chart);
      echarts.registerMap('china', geoJson);
      chart.setOption(chartOption.getOption(optionData));

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })
  },

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
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
      title: '城市天气·城市介绍·城市美食·城市美景',
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