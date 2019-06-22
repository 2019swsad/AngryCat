// pages/account/Info/Info.js

const app = getApp()
const fileSystemManager = wx.getFileSystemManager()
const DOMAIN = 'https://www.volley99.com'

Page({

  /**
   * Page initial data
   */
  data: {
    nickname: "",
    phone: "",
    avatarUrl: "",
  },

  changeAvatar: function (e) {
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
    this.setData({
      avatarUrl: DOMAIN + '/file/' + app.globalData.uid,
      nickname: getApp().globalData.nickname,
      phone: getApp().globalData.phone
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