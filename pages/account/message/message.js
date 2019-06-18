// pages/account/message/message.js
Page({

  /**
   * Page initial data
   */
  data: {
    messageList: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getMessageList();
  },

  /* 获取消息列表*/
  getMessageList: function() {
    var that = this;
    wx.request({
      url: 'https://raw.githubusercontent.com/CarlSome/JavaScript-Learning/master/JsonTest_MessageCenter.json',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {
        var arrToRender = JSON.parse(JSON.stringify(res.data))
        console.log(res.data);
        that.setData({
          messageList: res.data,
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})