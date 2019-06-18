// pages/orderdetail/orderdetail.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskinfo:{

    },
    button1:"",
    button2:"",
    tid: '',
    beginTime: '',
    endTime: '',
    isShow: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.tid = options.tid;
    console.log(this.data.tid )
    this.requestTaskInfo();

  },
  requestTaskInfo: function () {
    var self = this;
    wx.request({
      url: "https://www.volley99.com/task/get/" + self.data.tid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {


        if (res.statusCode === 200 || res.statusCode === 201) {

          console.log(res.data);
          self.setData({
            taskinfo: res.data
          })
          var start = util.formatTimeWithoutHMS(new Date(res.data.beginTime));
          var end = util.formatTimeWithoutHMS(new Date(res.data.expireTime));
          self.setData({
            beginTime: start
          })

          self.setData({
            endTime: end
          })


          console.log(self.data.taskinfo.status)


          if (self.data.taskinfo.status == '未开始') {
            self.setData({
              button1: "报名详情",
              button2: "停止报名"
            })

          } else if (self.data.taskinfo.status == '进行中') {
            self.setData({
              button1: "完成情况",
              button2: "结束任务"
            })
          } else if (self.data.taskinfo.status == '已结束') {
            self.setData({
              button1: "评价",
              isShow: false
            })
          }








        }
      },
      fail: function () {
        wx.showToast({
          title: 'fail',
          icon: 'none'
        })
      },
      complete: function () {
        console.log("完成HTTP请求")
      }
    })

  },
  onPress1: function (e) {


    if (this.data.button1 == "评价") {
      wx.navigateTo({
        url: '../critic/critic',
      })


    } else  {
      wx.navigateTo({
        url: '../critic/critic',
      })
    } 

  },
  onPress2: function (e) {

    wx.showModal({
      title: '提示',
      content: '请输入完成码',
      success: function (res) {
        console.log(res)
        if (res.confirm) {

          wx.request({
            url: "",
            method: 'GET',

            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            success: function (res) {

              console.log(res.data)
              self.requestTaskInfo();


            },
            fail: function () {
              wx.showToast({
                title: 'fail',
                icon: 'none'
              })
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})