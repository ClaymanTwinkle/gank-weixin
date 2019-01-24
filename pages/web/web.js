Page({
  data: {
    url:''
  },
  onLoad: function (options) {
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      });
    }
    this.setData({
      url: options.url
    });
  }
})