// pages/index/searchTask/searchTask.js

const DOMAIN = 'https://www.volley99.com'
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    resultTasks: [{
      "_id": "5d03a7ed31965a3365b6ab26",
      "title": "sampleTask",
      "description": "sampleDiscription",
      "participantNum": 3,
      "salary": 12,
      "tags": "sample",
      "beginTime": "2019/06/15",
      "expireTime": "2019/06/30",
      "type": "Questionaire",
      "uid": "d06146e7-aaff-47a8-831b-99bcf73e1f55",
      "tid": "6cb1238a-f264-4209-82c1-e2fec1ec463c",
      "status": "start",
      "totalCost": 36,
      "createTime": "2019-06-14 21:58:05",
      "currentParticipator": 0
    }, ],
  },

  updateKeyword: function(e) {
    console.log(e.detail)
    this.setData({
      keyword: e.detail.value
    })
  },

  execSearch: function() {
    let me = this
    wx.request({
      // /task/query 仍不可用
      url: DOMAIN + '/task/all',
      method: 'GET',
      data: {
        title: me.data.keyword
      },
      success: function(res) {

        var arrToRender = JSON.parse(JSON.stringify(res.data))

        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
        })

        arrToRender = arrToRender.filter((item) => {
          return item.title.indexOf(me.data.keyword) >= 0
        })

        me.setData({
          resultTasks: arrToRender,
        })
        // console.log(JSON.stringify(res))
        // console.log(typeof(res.data))
      }
    })
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