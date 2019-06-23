// pages/account/account.js
// pages/account/account.js

const app = getApp()
const fileSystemManager = wx.getFileSystemManager()
const DOMAIN = 'https://www.volley99.com'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nickname: "",
    avatarUrl: "",
  },

  avatarError(err) {
    console.log(JSON.stringify(err))
    this.setData({
      avatarUrl: "../../image/avatar.jpg"
    })
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
    // console.log(getApp().globalData.nickname)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      avatarUrl: DOMAIN + '/file/' + app.globalData.uid,
      nickname: getApp().globalData.nickname
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})