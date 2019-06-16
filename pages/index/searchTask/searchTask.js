// pages/index/searchTask/searchTask.js

const DOMAIN = 'https://www.volley99.com'
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    resultTasks: [],
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
      url: DOMAIN + '/task/all',
      method: 'GET',
      // url: DOMAIN + '/task/query',
      // method: 'POST',
      data: {
        title: me.data.keyword,
        // type: "Questionaire"
      },
      success: function(res) {

        // console.log(JSON.stringify(res))

        var arrToRender = JSON.parse(JSON.stringify(res.data))

        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
        })

        // arrToRender = arrToRender.filter((item) => {
        //   return item.title.indexOf(me.data.keyword) >= 0
        // })


        me.setData({
          resultTasks: arrToRender,
        })
      }
    })
  },

  goToDetail: function(e) {
    console.log(JSON.stringify(e))
    wx.navigateTo({
      url: '../../searchTaskDetail/searchTaskDetail?tid=' + e.mark.tid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this
    wx.request({
      url: DOMAIN + '/task/all',
      method: 'GET',
      success: function(res) {

        // console.log(JSON.stringify(res))

        var arrToRender = JSON.parse(JSON.stringify(res.data))

        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
        })

        arrToRender = arrToRender.filter((item) => {
          return item.status.indexOf("start") >= 0
        })


        me.setData({
          resultTasks: arrToRender,
        })
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