// pages/taskdetail/taskdetail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskinfo: {
      // "_id": "5cfe0688d7f67f119cbd4967",
      // "title": "Cark",
      // "type": "Questionaire",
      // "salary": 20,
      // "description": "Hello World",
      // "beginTime": "2019-08-19T16:00:00.000Z",
      // "expireTime": "2019-08-21T16:00:00.000Z",
      // "participantNum": 1,
      // "tags": "Testing",
      // "uid": "d06146e7-aaff-47a8-831b-99bcf73e1f55",
      // "tid": "17eeefdb-96db-4da4-9d52-2be8c04131b4",
      // "status": "start",
      // "totalCost": 20,
      // "createTime": "2019-06-10 15:28:08",
      // "currentParticipator": 0,
      // "isOrganizer": true,
      // "finishNumber": ""
    },
    button1: '查看',
    button2: '完成任务',
    tid: '',
    beginTime: '',
    endTime: '',
    isShow: true



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;



    console.log(options.tid);
    //  this.data.tid=option.query;

    this.data.tid = options.tid;




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

          console.log(self.data)



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

    this.updateButton();

  },
  updateButton: function() {

  },

  onPress1: function(e) {


    if (this.data.button1 == "报名详情") {
      wx.navigateTo({
        url: '../partipeople/partipeople',
      })


    } else if (this.data.button1 == "报名详情") {
      wx.navigateTo({
        url: '../critic/critic',
      })
    } else if (this.data.button1 == "评价") {
      wx.navigateTo({
        url: '../critic/critic',
      })
    }

  },
  onPress2: function(e) {
    var self = this;
    if (this.data.button2 == "停止报名") {
      wx.showModal({
        title: '提示',
        content: '确定停止报名吗？',
        success: function(res) {
          console.log(res)
          if (res.confirm) {


            wx.request({
              url: "https://www.volley99.com/task/ongoing/" + self.data.tid,
              method: 'GET',

              header: {
                'Content-Type': 'application/json',
                'cookie': wx.getStorageSync("sessionId")
              },
              success: function(res) {

                console.log(res.data)
                self.requestTaskInfo();


              },
              fail: function() {
                wx.showToast({
                  title: 'fail',
                  icon: 'none'
                })
              },


            })






            self.requestTaskInfo();


          } else {

          }
        }
      })


    } else if (this.data.button2 == "结束任务") {
      wx.showModal({
        title: '提示',
        content: '确定提前结束任务吗？',
        success: function(res) {
          console.log(res)
          if (res.confirm) {

            wx.request({
              url: "https://www.volley99.com/task/finish/" + self.data.tid,
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
    }
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