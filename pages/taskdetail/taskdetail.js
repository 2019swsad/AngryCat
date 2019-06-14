// pages/taskdetail/taskdetail.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
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
    "isOrganizer": false,
    "userinfo": {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:"https://www.volley99.com/task/get/17eeefdb-96db-4da4-9d52-2be8c04131b4",
      method: 'GET',
      
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {

        

        if (res.statusCode === 200 || res.statusCode === 201) {
          
          console.log(res.data);
          
        

        
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