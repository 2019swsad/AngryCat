// pages/account/settings/settings.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  // 登出逻辑
  logout(){
    var app = getApp()
    app.globalData.nickname = ""
    app.globalData.phone = ""
    app.globalData.email = ""
    app.globalData.uid = ""
    wx.setStorageSync("sessionId", "")
    wx.reLaunch({
      url: '../../../login/login',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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