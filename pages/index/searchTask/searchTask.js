// pages/index/searchTask/searchTask.js

const DOMAIN = 'https://www.volley99.com'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      resultTasks: [
        {
          "_id": "5d03a7ed31965a3365b6ab26",
          "title": "sampleTask",
          "description": "sampleDiscription",
          "participantNum": 3,
          "salary": 12,
          "tags": "sample",
          "beginTime": "2019-06-15T16:00:00.000Z",
          "expireTime": "2019-06-30T16:00:00.000Z",
          "type": "Questionaire",
          "uid": "d06146e7-aaff-47a8-831b-99bcf73e1f55",
          "tid": "6cb1238a-f264-4209-82c1-e2fec1ec463c",
          "status": "start",
          "totalCost": 36,
          "createTime": "2019-06-14 21:58:05",
          "currentParticipator": 0
        },
      ],
      stringifyRes: "not connect yet",
  },

  execSearch : function(keyword) {
    var me = this
    wx.request({
      url: DOMAIN + '/task/all',
      method: 'GET',
      success: function(res){
        me.setData({
          resultTasks: res.data,
          stringifyRes: JSON.stringify(res.data),
        })
        console.log(JSON.stringify(res))
        // console.log(typeof(res.data))
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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