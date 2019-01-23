Page({
  data: {
    url:''
  },
  onLoad: function (option) {
    if(option.title) {
      wx.setNavigationBarTitle({
        title: option.title
      });
    }
    this.setData({
      url:option.url
    });
  }
})