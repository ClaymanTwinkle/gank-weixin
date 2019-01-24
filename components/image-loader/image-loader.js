// components/image-loader/image-loader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 默认图片
    loadImage: String,
    // 或者默认颜色
    loadColor: String,
    // // 错误图片
    // errorImage: String,
    // errorColor: String,
    // 或者错误颜色
    //原始图片
    src: String,
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    successLoadFlag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    finishLoad: function(e) {
      this.setData({
        successLoadFlag: true
      });
    }
  }
})