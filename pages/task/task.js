// pages/task/task.js
const DOMAIN = 'https://www.volley99.com'
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: "2000px",
    listHeight1: "1000px",
    listHeight2: "1000px",

    currentTab: 0,
    selfAllTasks: '',
    tasks: [],
    createdTasks: [],
    joinedTasks: [],
    taskInfo: []

  },

  goToDetail: function(e) {

    console.log(e.currentTarget.dataset.tid)
    wx.navigateTo({
      url: '../taskdetail/taskdetail?tid=' + e.currentTarget.dataset.tid,
    })
  },
  goToOrderDetail: function(e) {

    console.log(e.currentTarget.dataset.tid)


    wx.navigateTo({
      url: '../orderdetail/orderdetail?tid=' + e.currentTarget.dataset.tid,
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

    let me = this

    wx.request({
      url: DOMAIN + '/task/query',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      method: 'POST',
      data: {
        uid: getApp().globalData.uid
      },
      success: function(res) {
        // console.log(res.data)
        var jsonData = JSON.parse(JSON.stringify(res.data))
        var arrToRender = jsonData.reverse()
        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
        })

        me.setData({
          createdTasks: arrToRender,
          listHeight1: Object.keys(arrToRender).length * 110 + 110 + "px"
        })
      },
      fail: function() {
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
        // console.log(res.data)
        var jsonData = JSON.parse(JSON.stringify(res.data))
        var arrToRender = jsonData.reverse()
        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))

          wx.request({
            url: DOMAIN + '/task/get/'+item.tid,
            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            method: 'GET',
            success: function(res) {
              

              res.data.beginTime = util.formatTimeWithoutHMS(new Date(res.data.beginTime))
              res.data.expireTime = util.formatTimeWithoutHMS(new Date(res.data.expireTime))
              let task=me.data.taskInfo;

              task.push(res.data)
              me.setData({
                taskInfo: task
              })

              
             
            }
          
          })



        })

        me.setData({
          joinedTasks: arrToRender,
          listHeight2: Object.keys(arrToRender).length * 110 + 110 + "px",
        })
      },
      fail: function() {
        console.log("HTTP请求失败")
      },
      complete: function() {
        console.log("HTTP请求完成")


      }
    })

    if (this.data.currentTab == 0) {
      this.setData({
        listHeight: this.data.listHeight2
      })
    } else {
      this.setData({
        listHeight: this.data.listHeight1
      });
    }

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

    if (this.data.currentTab == 0) {
      this.setData({
        listHeight: this.data.listHeight2
      })
    } else {
      this.setData({
        listHeight: this.data.listHeight1
      });
    }
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
