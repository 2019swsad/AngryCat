// pages/searchTaskDetail/searchTaskDetail.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskinfo: {

    },
    button1: '查看',
    button2: '完成任务',
    tid: '',
    beginTime: '',
    endTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;

    // console.log(options.tid);
    //  this.data.tid=option.query;

    this.data.tid = options.tid;
    console.log(options.tid)

    this.requestTaskInfo();

  },

  requestTaskInfo: function() {
    var self = this;
    wx.request({
      url: "https://www.volley99.com/task/get/" + self.data.tid,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {
      if (res.statusCode === 200 || res.statusCode === 201) {
          // console.log(res.data);
          self.setData({
            taskinfo: res.data
          })
          var start = util.formatTimeWithoutHMS(new Date(res.data.beginTime));
          var end = util.formatTimeWithoutHMS(new Date(res.data.expireTime));
          self.setData({
            beginTime: start,
            endTime: end
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

  onPress1:function(e) {
    var self=this;
    wx.showModal({
      title: '提示',
      content: '确定要报名吗？',
      success: function (res) {
        console.log(res)
        if (res.confirm) {

          wx.request({
            url: 'https://www.volley99.com/order/create',
            data: {
              "tid": self.data.tid
            },
            method: 'POST', 
            header: {
              'content-type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            success: function (res) {
              console.log(res.data)
              if(res.data.status=="进行中"){
                wx.showToast({
                  title: '成功报名',
                  duration: 2000,
                  icon: 'success'
                })
                console.log(res.data)
                // 导航回主页
                setTimeout(wx.navigateBack, 1500, {
                  delta: 1
                })
              }
              else if (res.data.status == "候补中") {
                wx.showToast({
                  title: '成为候补',
                  duration: 2000,
                  icon: 'success'
                })
                console.log(res.data)
                // 导航回主页
                setTimeout(wx.navigateBack, 1500, {
                  delta: 1
                })
              }
              else if (res.data.status == "creator can not create order") {
                wx.showToast({
                  title: '不能报名参与自己发布的任务',
                  duration: 2000,
                  icon: 'none'
                })
              }
              else if (res.data.status == "failure:already exist order of same user") {
                wx.showToast({
                  title: '您已报名',
                  duration: 2000,
                  icon: 'none'
                })
              }
              else if (res.data.status == "failure: task status error") {
                wx.showToast({
                  title: '任务已停止报名',
                  duration: 2000,
                  icon: 'none'
                })
              }
              else {
                wx.showToast({
                  title: '报名失败!',
                  duration: 2000,
                  icon: 'none'
                })
              }
            },
            fail: function () {
              console.log("index.js wx.request CheckCallUser fail");
            },
          })

        } else {

        }
      }
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