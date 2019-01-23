// meizi.js
const gank = require('../../utils/gank.js')

const type = "福利";
const startPage = 1;
const onePageCount = 20;

Page({
  data: {
    page: startPage,
    count: onePageCount,
    list: [],
    isEndPage: false
  },
  onLoad: function() {
    wx.startPullDownRefresh();
  },
  onPullDownRefresh: function() {
    var that = this;
    this.data.page = startPage;
    this.data.isEndPage = false;
    gank.getGankData(type, this.data.count, this.data.page, {
      success(res) {
        if (!res.error) {
          if (res.results && res.results.length > 0) {
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
    gank.getGankData(type, this.data.count, this.data.page, {
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
  onImageItemClick: function(e) {
    console.log(e.currentTarget.dataset);
    wx.previewImage({
      // current: e.currentTarget.dataset.current, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.current] // 需要预览的图片http链接列表
    });
  }
})