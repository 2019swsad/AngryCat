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
    todayTime: '',
    expireTime: '',
    pickBegin: '',
    taskType: "问卷调查",
    optionalType: ["问卷调查", "跑腿", "技术", "其他"],
  },

  bindExpireTimeChange: function(e) {
    this.setData({
      expireTime: e.detail.value
    })
  },


  bindBeginTimeChange: function(e) {
    this.setData({
      beginTime: e.detail.value,
      pickBegin: e.detail.value,
    })
    if (this.data.beginTime > this.data.expireTime) {
      this.setData({
        expireTime: this.data.beginTime
      })
    }
  },

  bindTaskTypeChange: function(e) {
    console.log(JSON.stringify(e))
    this.setData({
      taskType: this.data.optionalType[parseInt(e.detail.value)]
    })
  },

  // 提交创建任务信息
  formSubmit: function(e) {
    var submitObj = JSON.parse(JSON.stringify(e.detail.value))
    submitObj.beginTime = util.convertDateFormatToMDY(this.data.beginTime)
    submitObj.expireTime = util.convertDateFormatToMDY(this.data.expireTime)
    submitObj.type = this.data.taskType

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

        } else {
          if (res.data.status == "No enough money") {
            wx.showToast({
              title: "钱包余额不足",
              duration: 2000,
              icon: 'none'
            })
          } else {
            // 处理返回的错误信息
            var regForErr = /"(.*?)"/
            var errStr = regForErr.exec(res.data.details[0].message)[0].slice(1, -1)
            var renhua = ""
            switch (errStr) {
              case "title":
                renhua = "标题不能少于四个字符"
                break
              case "position":
                renhua = "地点不能为空"
                break
              case "beginTime":
                renhua = "开始时间无效!\n需大于当前日期"
                break
              case "description":
                renhua = "描述不能为空"
                break
              case "salary":
                renhua = "薪酬不能小于1"
                break
              case "participantNum":
                renhua = "参与人数不能小于1"
                break
              default:

            }
            console.log('提交任务失败, 错误代码' + res.statusCode)
            console.log('提交任务失败, 错误信息', errStr)
            wx.showToast({
              title: '失败:' + renhua,
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
    var month = date.getMonth() + 1
    var day = date.getDate()

    if (month < 10) {
      month = "0" + month
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