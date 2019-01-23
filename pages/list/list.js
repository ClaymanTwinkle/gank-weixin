// pages/list/list.js

const gank = require('../../utils/gank.js')
const dateUtil = require('../../utils/util.js')

const startPage = 1;
const onePageCount = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    list: [],
    page: startPage,
    count: onePageCount,
    isEndPage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type) {
      wx.setNavigationBarTitle({
        title: options.type,
      });
      this.setData({
        type: options.type
      });
      wx.startPullDownRefresh();
    }
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
    var that = this;
    this.data.page = startPage;
    this.data.isEndPage = false;
    gank.getGankData(this.data.type, this.data.count, this.data.page, {
      success(res) {
        if (!res.error) {
          console.log(res);
          if (res.results && res.results.length > 0) {
            for (var i = 0; i < res.results.length; i++) {
              res.results[i].publishedAt = dateUtil.formatTime(new Date(res.results[i].publishedAt));
            }
            that.setData({
              list: res.results,
              page: that.data.page + 1
            });
          } else {
            that.setData({
              isEndPage: true
            });
          }
        } else {
          console.log("response:error");
          wx.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 1000
          });
        }
        wx.stopPullDownRefresh();
      },
      fail(e) {
        console.log(e);
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 1000
        });
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isEndPage) {
      console.log("我是有底线的");
      wx.showToast({
        title: '我是有底线的',
        icon: 'none',
        duration: 500
      });
      return;
    }
    console.log("加载更多 page = " + this.data.page);
    var that = this;
    gank.getGankData(this.data.type, this.data.count, this.data.page, {
      success(res) {
        if (!res.error) {
          if (res.results && res.results.length > 0) {
            console.log(res.results);
            that.setData({
              list: that.data.list.concat(res.results),
              page: that.data.page + 1
            });
            wx.showToast({
              title: '加载成功',
              icon: 'none',
              duration: 500
            });
          } else {
            that.setData({
              isEndPage: true
            });
          }
        } else {
          console.log("response:error");
        }
      },
      fail(e) {
        console.log(e);
      }
    });
  },
  onItemClick: function(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../web/web?title=' + e.currentTarget.dataset.title + '&url=' + e.currentTarget.dataset.url
    });
  },
  onImageItemClick: function(e) {
    console.log(e.currentTarget.dataset);
    wx.previewImage({
      current: e.currentTarget.dataset.current,
      urls: e.currentTarget.dataset.urls // 需要预览的图片http链接列表
    });
  }
})