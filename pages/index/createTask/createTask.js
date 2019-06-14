// pages/index/createTask/createTask.js

var util = require('../../../utils/util.js')

// const DOMAIN = 'https://volley.nyamori.moe'
const DOMAIN = 'http://211.159.187.254:8081'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginTime: '2019-06-16',
    expireTime: '2019-07-01'
  },


  bindBeginTimeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginTime: e.detail.value
    })
  },

  tempLogin: function() {
    wx.request({
      url: DOMAIN + '/users/login',
      method: 'POST',
      data: {
        username: 'test',
        password: '1234'
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        // console.log(JSON.stringify(res))

        // console.log(typeof(res.cookies[0]))
        // console.log(typeof(res.cookies))
        console.log(util.handleCookieFromSetCookie(res.cookies))
        wx.setStorageSync("sessionId", util.handleCookieFromSetCookie(res.cookies))
      }
    })
  },

  bindExpireTimeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // wx.showToast({
    //   title: 'hi',
    // })
    this.setData({
      expireTime: e.detail.value
    })
  },

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // console.log(util.convertDateFormatToMDY(this.data.beginTime),
    //   util.convertDateFormatToMDY(this.data.expireTime))

    var submitObj = JSON.parse(JSON.stringify(e.detail.value))
    submitObj.beginTime = util.convertDateFormatToMDY(this.data.beginTime)
    submitObj.expireTime = util.convertDateFormatToMDY(this.data.expireTime)
    submitObj.type = "Questionaire"

    console.log("提交的对象为", JSON.stringify(submitObj))

    wx.request({
      url: DOMAIN + '/task/create',
      method: 'POST',
      data: {
        ...submitObj
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {

        console.log(JSON.stringify(res))

        if (res.statusCode === 201) {
          wx.showToast({
            title: '成功创建任务',
            duration: 2000,
            icon: 'success'
          })
          console.log(res.data)
          // 导航回主页
          setTimeout(wx.navigateBack, 1500, {
            delta: 1
          })

        } else {
          console.log('提交任务失败, 错误代码' + res.statusCode)
          wx.showToast({
            title: '失败:' + res.data.message,
            duration: 2000,
            icon: 'none'
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: 'fail',
          icon: 'none'
        })
      },
      complete: function() {
        console.log("完成HTTP请求")
      }
    })
  },


  formReset: function() {
    console.log('form发生了reset事件')
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