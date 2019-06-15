// pages/taskdetail/taskdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskinfo: {
      "_id": "5cfe0688d7f67f119cbd4967",
      "title": "Cark",
      "type": "Questionaire",
      "salary": 20,
      "description": "Hello World",
      "beginTime": "2019-08-19T16:00:00.000Z",
      "expireTime": "2019-08-21T16:00:00.000Z",
      "participantNum": 1,
      "tags": "Testing",
      "uid": "d06146e7-aaff-47a8-831b-99bcf73e1f55",
      "tid": "17eeefdb-96db-4da4-9d52-2be8c04131b4",
      "status": "start",
      "totalCost": 20,
      "createTime": "2019-06-10 15:28:08",
      "currentParticipator": 0,
      "isOrganizer": true,
      "finishNumber":""
    },
    button1: '查看',
    button2: '完成任务',
    tid:'6cb82ea1-9479-4b7d-872d-bb2ce6daf49a'

  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;


     this.data.tid=options.tid;



    this.requestTaskInfo();

    
  },

  requestTaskInfo:function(){
    var self = this;
    wx.request({
      url: "https://www.volley99.com/task/get/" + self.data.tid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {

        console.log(wx.getStorageSync("sessionId"));



        if (res.statusCode === 200 || res.statusCode === 201) {

          console.log(res.data);
          self.setData({
            taskinfo: res.data
          })

          if (self.data.taskinfo.isOrganizer == false) {
            if (self.data.taskinfo.status == 'start') {
              self.setData({
                button1: "退出任务",
                button2: "完成任务"
              })
            }
          } else {
            if (self.data.taskinfo.status == 'start') {
              self.setData({
                button1: "查看完成状态",
                button2: "结束任务"
              })
            }
          }



        } else {
          console.log('提交任务失败, 错误代码' + res.statusCode)
          wx.showToast({
            title: '失败:' + res.data.message,
            duration: 2000,
            icon: 'none'
          })
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

  onPress1: function(e) {

    
    if(this.data.button1=="退出任务"){
    
  
    }
  },
  onPress2:function(e){
    var self = this;
    if (this.data.button2 == "完成任务") {

      wx.showModal({
        title: '提示',
        content: '请输入完成妈',
        success: function (res) {
          console.log(res)
          if (res.confirm) {
           self.requestTaskInfo();

          } else {
        
          }
        }
      })

    }


    else if (this.data.button2 =="结束任务"){
      wx.showModal({
        title: '提示',
        content: '确定提前结束任务吗？',
        success: function (res) {
          console.log(res)
          if (res.confirm) {
              

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