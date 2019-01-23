//index.js
//获取应用实例
const gank = require('../../utils/gank.js')

Page({
  data: {
    list: [],
    imgUrls: []
  },
  onLoad: function() {
    wx.startPullDownRefresh();
  },
  onPullDownRefresh: function() {
    var that = this;
    gank.getTodayData({
      success: function(res) {
        console.log(res);
        if (!res.error) {
          var newList = [];
          var newImgUrls = [];
          for (var key in res.results) {
            if (key != '福利') {
              newList = newList.concat(res.results[key]);
            } else {
              if (res.results[key]) {
                res.results[key].forEach(v => {
                  newImgUrls.push(v.url);
                });
              }
            }
          }
          that.setData({
            list: newList,
            imgUrls: newImgUrls
          });
        } else {
          console.log(res);
          wx.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 1000
          });
        }
        wx.stopPullDownRefresh();
      },
      fail: function(e) {
        console.log(e);
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 1000
        });
        wx.stopPullDownRefresh();
      }
    });
  },
  onSwiperImageClick: function(e) {
    console.log(e.currentTarget.dataset);
    wx.previewImage({
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
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
      urls: e.currentTarget.dataset.urls // 需要预览的图片http链接列表
    });
  }
})