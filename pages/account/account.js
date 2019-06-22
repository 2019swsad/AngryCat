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

  changeAvatar: function(e) {
    let me = this
    console.log("changeAvatar", JSON.stringify(e))
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${DOMAIN}/file`,
          header: {
            'cookie': wx.getStorageSync("sessionId"),
          },
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'uid': app.globalData.uid,
          },
          success(res) {
            console.log("UID", app.globalData.uid)
            console.log("uploadFileRes", JSON.stringify(res))
            me.setData({
              avatarUrl: DOMAIN + '/file/' + app.globalData.uid + '?' + Math.random() / 9999,
            })
          }
        })

      }
    })
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
    console.log(getApp().globalData.nickname)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(getApp().globalData.nickname)
    console.log(app.globalData.uid)
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