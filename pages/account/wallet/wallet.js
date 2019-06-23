// pages/account/wallet/wallet.js
const app = getApp()
const util = require('../../../utils/util.js')
const DOMAIN = 'https://www.volley99.com'
Page({

  /**
   * Page initial data
   */
  data: {
    nickName:"",
    avatarUrl: "",
    balance:0,
    credit:100,
  },

  avatarError(err) {
    console.log(JSON.stringify(err))
    this.setData({
      avatarUrl: "../../image/avatar.jpg"
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getSelfInfo();
  },
  /**
   * 获取用户信息函数
   */
  getSelfInfo:function() {
    var that = this;
    wx.request({
      url: DOMAIN + '/users/self',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          nickName: res.data.nickname,
          balance: res.data.balance,
          credit:res.data.credit
        })
      }
    })
  },
  /**
   * 发送充值请求
   */
  topUp: function() {
    var that = this;
    wx.request({
      url: DOMAIN + '/wallet/deposit/100',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '您已成功充值',
          success: res => {
            that.onLoad()
          }
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
    this.setData({
      avatarUrl: DOMAIN + '/file/' + app.globalData.uid,
      nickname: getApp().globalData.nickname
    })
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