// pages/index/createTask/createTask.js

const util = require('../../../utils/util.js')

// const DOMAIN = 'https://volley.nyamori.moe'
const DOMAIN = 'https://www.volley99.com'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginTime: '',
    todayTime:'',
    expireTime: '',
    pickBegin: '',
    taskType: "问卷调查",
    optionalType: ["问卷调查","跑腿","技术","其他"],
  },

  bindExpireTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // wx.showToast({
    //   title: 'hi',
    // })
    this.setData({
      expireTime: e.detail.value
    })
  },


  bindBeginTimeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginTime: e.detail.value,
      pickBegin: e.detail.value,
    })
    if (this.data.beginTime > this.data.expireTime){
      this.setData({
        expireTime: this.data.beginTime
      })
    }
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
        // console.log(util.handleCookieFromSetCookie(res.cookies))
        wx.setStorageSync("sessionId", util.handleCookieFromSetCookie(res.header['Set-Cookie'].split(',')));
      }
    })
  },

  bindTaskTypeChange:function(e){
    console.log(JSON.stringify(e))
    this.setData({
      taskType: this.data.optionalType[parseInt(e.detail.value)]
    })
  },

  // 提交注册信息
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // console.log(util.convertDateFormatToMDY(this.data.beginTime),
    //   util.convertDateFormatToMDY(this.data.expireTime))

    var submitObj = JSON.parse(JSON.stringify(e.detail.value))
    submitObj.beginTime = util.convertDateFormatToMDY(this.data.beginTime)
    submitObj.expireTime = util.convertDateFormatToMDY(this.data.expireTime)
    submitObj.type = this.data.taskType

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

        if (res.statusCode === 200 || res.statusCode === 201) {
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

        }
        else {
          if(res.data.status == "No enough money") {
            wx.showToast({
              title: "钱包余额不足",
              duration: 2000,
              icon: 'none'
            })
          }
          else {
            console.log('提交任务失败, 错误代码' + res.statusCode)
            wx.showToast({
              title: '失败:' + res.data.message,
              duration: 2000,
              icon: 'none'
            })
          }
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
    const date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()

    if (month<10) {
      month="0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    this.setData({
      todayTime: year + "-" + month + "-" + day,
      beginTime: year + "-" + month + "-" + day,
      expireTime: year + "-" + month + "-" + day,
      pickBegin: year + "-" + month + "-" + day
    })

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