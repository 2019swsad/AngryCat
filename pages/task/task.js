// pages/task/task.js
const DOMAIN = 'https://www.volley99.com'
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: "1000px",
    currentTab: 0,
    selfAllTasks: '',
    tasks: [{
        "_id": "5d04f6dfbd79c825a928c106",
        "title": "testByGyakkun",
        "description": "testByGyakkun",
        "position": "testByGyakkun",
        "participantNum": 1,
        "salary": 233,
        "tags": "testByGyakkun",
        "beginTime": "2019-06-15T16:00:00.000Z",
        "expireTime": "2019-06-30T16:00:00.000Z",
        "type": "其他",
        "uid": "e57722bf-1ba1-415d-9b1e-255ddd30737b",
        "tid": "b050dde1-5563-4f89-a62c-48ccafbb88e4",
        "status": "start",
        "totalCost": 233,
        "createTime": "2019-06-15 21:47:11",
        "currentParticipator": 0,
        "finishNumber": "BwkFBA=="
      },
      {
        "_id": "5d0517ab67377b2bca473ea3",
        "title": "test1",
        "description": "test1",
        "position": "test1",
        "participantNum": 1,
        "salary": 23,
        "tags": "test1",
        "beginTime": "2019-06-19T16:00:00.000Z",
        "expireTime": "2019-06-30T16:00:00.000Z",
        "type": "问卷调查",
        "uid": "e57722bf-1ba1-415d-9b1e-255ddd30737b",
        "tid": "129a0135-d131-4c72-9770-37a93e807bfe",
        "status": "start",
        "totalCost": 23,
        "createTime": "2019-06-16 00:07:07",
        "currentParticipator": 0,
        "finishNumber": "BAgBBg=="
      }
    ],
    createdTasks: [],
    joinedTasks: [],

  },

  goToDetail: function(e) {
    console.log(JSON.stringify(e.mark.tid))
    wx.navigateTo({
      url: '../taskdetail/taskdetail?tid=' + e.mark.tid,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

    let me = this

    wx.request({
      url: DOMAIN + '/task/getCreate',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        var arrToRender = JSON.parse(JSON.stringify(res.data))
        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
        })

        me.setData({
          createdTasks: arrToRender,
          listHeight :Object.keys(arrToRender).length * 90 + 100 + "px"
        })
      },
      fail: function () {
        console.log("HTTP请求失败")
      },
    })


    wx.request({
      url: DOMAIN + '/order/all',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        var arrToRender = JSON.parse(JSON.stringify(res.data))
        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
        })

        me.setData({
          joinedTasks: arrToRender,
        })
      },
      fail: function() {
        console.log("HTTP请求失败")
      },
      complete: function() {
        console.log("HTTP请求完成")

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

  },

  //滑动切换
  swiperTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  //点击切换
  clickTab: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})