// pages/index/searchTask/searchTask.js

const DOMAIN = 'https://www.volley99.com'
const util = require('../../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: "",
    keyword: "",
    resultTasks: [],
    displayTasks: [],
    optionalTaskType: ["所有类型", "问卷调查", "跑腿", "技术", "其他"],
    optionalSortType: ["薪酬从高到低", "薪酬从低到高", "最近发布", "最少人报名", "发布者信誉最高"],
    taskType: 0,
    sortType: 0,
  },

  // 绑定关键词更新事件
  updateKeyword: function(e) {
    console.log(e.detail)
    this.setData({
      keyword: e.detail.value
    })
  },

  // 绑定执行搜索
  execSearch: function() {
    let me = this
    wx.request({
      url: DOMAIN + '/task/all',
      method: 'GET',
      // url: DOMAIN + '/task/query',
      // method: 'POST',
      data: {
        title: me.data.keyword,
      },
      success: function(res) {

        var arrToRender = JSON.parse(JSON.stringify(res.data))
        var arrToRenderInsider = []

        // 过滤任务
        arrToRender = arrToRender.filter((item) => {
          return item.title.indexOf(me.data.keyword) >= 0 &&
            item.status.indexOf("未开始") >= 0 &&
            item.uid != getApp().globalData.uid

        })

        console.log("after filter", JSON.stringify(arrToRender))

        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
          // 取得发布者的用户昵称
          wx.request({
            url: DOMAIN + '/users/info/' + item.uid,
            header: {
              'cookie': wx.getStorageSync("sessionId")
            },
            method: 'GET',
            success: function(res) {
              item.organizer = res.data[0].username
              arrToRenderInsider.push(item)
              // console.log("now push and render", arrToRenderInsider)
              me.setData({
                displayTasks: arrToRenderInsider,
                resultTasks: arrToRenderInsider
              })
            }
          })
        })

      }
    })
  },

  // 转到详情页
  goToDetail: function(e) {
    console.log(e.currentTarget.dataset.tid)
    wx.navigateTo({
      url: '../../searchTaskDetail/searchTaskDetail?tid=' + e.currentTarget.dataset.tid,
    })
  },


  /**
   * 根据Key进行排序的辅助函数
   * 
   * @param {String} 指定的Key
   */
  dynamicSort: function(prop) {
    var result = 0
    var sortOrder = 1
    // 反向排序则在key前加负号
    if (prop[0] === "-") {
      sortOrder = -1
      prop = prop.substr(1)
    }
    return function(obj1, obj2) {
      var val1 = obj1[prop]
      var val2 = obj2[prop]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      if (val1 < val2) {
        result = -1
      } else if (val1 > val2) {
        result = 1
      } else {
        result = 0
      }
      return result * sortOrder
    }
  },


  bindSortTypeChange: function(e) {
    this.setData({
      sortType: e.detail.value
    })

    var sortBy = null

    switch (e.detail.value) {
      case "0":
        sortBy = this.dynamicSort("-salary")
        break
      case "1":
        sortBy = this.dynamicSort("salary")
        break
      case "2":
        sortBy = this.dynamicSort("beginTime")
        break
      case "3":
        sortBy = this.dynamicSort("currentParticipator")
        break
      default:
        sortBy = this.dynamicSort("title")
    }
    var arrToRender = this.data.displayTasks.sort(sortBy)
    this.setData({
      displayTasks: arrToRender
    })
  },

  // 绑定所选任务类型更新
  bindTaskTypeChange: function(e) {
    this.setData({
      taskType: e.detail.value
    })
    var arrToRender = this.data.resultTasks
    var taskFilter = null
    switch (e.detail.value) {
      case "0": //所有
        taskFilter = (item) => {
          return true
        }
        break
      default:
        taskFilter = (item) => {
          return item.type == this.data.optionalTaskType[this.data.taskType]
        }
    }
    this.setData({
      displayTasks: arrToRender.filter(taskFilter)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this

    // 获得所有有效任务
    wx.request({
      url: DOMAIN + '/task/all',
      method: 'GET',
      success: function(res) {

        var arrToRender = JSON.parse(JSON.stringify(res.data))
        var arrToRenderInsider = []

        arrToRender = arrToRender.filter((item) => {
          return item.status.indexOf("未开始") >= 0 &&
            item.uid != getApp().globalData.uid
        })
        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))

          wx.request({
            url: DOMAIN + '/users/info/' + item.uid,
            method: 'GET',
            header: {
              cookie: wx.getStorageSync("sessionId")
            },
            success: function(res) {
              item.organizer = res.data[0].nickname
              arrToRenderInsider.push(item)
              // console.log("now push and render", arrToRenderInsider)
              me.setData({
                displayTasks: arrToRenderInsider
              })
            }
          })
        })
      }
    })

    // 动态修改窗口高度
    const res = wx.getSystemInfoSync()
    this.setData({
      listHeight: res.windowHeight - 102 + "px"
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