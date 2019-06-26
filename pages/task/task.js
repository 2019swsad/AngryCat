// pages/task/task.js
const DOMAIN = 'https://www.volley99.com'
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: "",
    currentTab: 0,
    selfAllTasks: '',
    tasks: [],
    createdTasks: [],
    joinedTasks: [],
    taskInfo: [],
    nickname: ""

  },

  goToDetail: function(e) {

    console.log(e.currentTarget.dataset.tid)

    wx.navigateTo({
      url: '../taskdetail/taskdetail?tid=' + e.currentTarget.dataset.tid,
    })
  },
  goToOrderDetail: function(e) {

    wx.navigateTo({
      url: '../orderdetail/orderdetail?tid=' + e.currentTarget.dataset.tid + '&oid=' + e.currentTarget.dataset.oid + '&status=' + e.currentTarget.dataset.orderstatus,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const res = wx.getSystemInfoSync()
    this.setData({
      listHeight: res.windowHeight - 45 + "px"
    })

    this.data.nickname = getApp().globalData.nickname

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let me = this

    // 请求自己发布的任务列表
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
          item.nickname = me.data.nickname
          item.randNum = Math.random()
        })

        me.setData({
          createdTasks: arrToRender,
        })
      },
      fail: function() {
        console.log("HTTP请求失败")
      },
    })

    // 请求自己加入的任务列表
    wx.request({
      url: DOMAIN + '/order/all',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      method: 'GET',
      success: function(res) {
        me.setData({
          taskInfo: []
        })
        // console.log(res.data)
        var jsonData = JSON.parse(JSON.stringify(res.data))
        var arrToRender = jsonData.reverse()
        
        // 对于每一个接下的任务, 取得任务本身的信息
        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))

          let task = me.data.taskInfo
          let singletask = {}
          wx.request({
            url: DOMAIN + '/task/get/' + item.tid,
            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            method: 'GET',
            success: function(res) {
              res.data.beginTime = util.formatTimeWithoutHMS(new Date(res.data.beginTime))
              res.data.expireTime = util.formatTimeWithoutHMS(new Date(res.data.expireTime))

              singletask = res.data
              singletask.oid = item.oid

              singletask.orderstatus = item.status
              singletask.createrUid = res.data.uid

            },
            
            // 取任务发布者昵称
            complete: function() {
              // console.log("HTTP请求完成")
              wx.request({
                url: DOMAIN + '/users/info/' + singletask.createrUid,
                header: {
                  'cookie': wx.getStorageSync("sessionId")
                },
                method: 'GET',
                success: function(res) {
                  singletask.organizer = res.data[0].nickname || ""
                  task.push(singletask)
                  // console.log("now push and render", JSON.stringify(item))
                  me.setData({
                    taskInfo: task
                  })
                }
              })
            },

            fail: function() {
              console.log("HTTP请求失败")
            },
          })
          /*
          if (this.data.currentTab == 0) {
          this.setData({
          listHeight: this.data.listHeight2
          })
          } else {
          this.setData({
          listHeight: this.data.listHeight1
          });
          }
           */
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

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