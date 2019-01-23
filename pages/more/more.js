// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ['Android', 'iOS', '休息视频', '拓展资源', '前端'],
    iconList: ['../../images/Android.png', '../../images/iOS.png', '../../images/video.png', '../../images/expand.png', '../../images/web.png'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  onItemClick: function(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../list/list?type=' + e.currentTarget.dataset.type
    });
  }
})