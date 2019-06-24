//index.js
//获取应用实例
const app = getApp()
const DOMAIN = 'https://www.volley99.com'
const util = require('../../utils/util.js')


Page({
  data: {
    imgUrls: [
      '../../image/ad1.jpg',
      '../../image/ad2.jpg',
      '../../image/ad3.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1500,
    iconArray: [{
        "id": '1',
        "iconUrl": '../../image/icon-qiandao.png',
        "iconText": '签到'
      },
      {
        "id": '2',
        "iconUrl": '../../image/icon-fujin.png',
        "iconText": '附近',
      },
      {
        "id": '3',
        "iconUrl": '../../image/icon-muma.png',
        "iconText": '搜索任务',
        "navigateUrl": './searchTask/searchTask'
      },
      {
        "id": '4',
        "iconUrl": '../../image/icon-qinzi.png',
        "iconText": '任务发布',
        "navigateUrl": './createTask/createTask'
      },
      {
        "id": '5',
        "iconUrl": '../../image/icon-zhanhui.png',
        "iconText": '游展'
      },
      {
        "id": '6',
        "iconUrl": '../../image/icon-fuli.png',
        "iconText": '福利'
      },
      {
        "id": '7',
        "iconUrl": '../../image/icon-xingxing.png',
        "iconText": '注册',
        "navigateUrl": '../../regist/regist'
      },
      {
        "id": '8',
        "iconUrl": '../../image/icon-tiyu.png',
        "iconText": '登录',
        "navigateUrl": '../../login/login'
      }
    ],
    recommendTasks: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  tapfuntion: function (e) {
    if (e.currentTarget.id == 2) {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
          });
        }
      })
    }
  },

  onLoad: function() {

    let me = this

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.request({
      url: DOMAIN + '/task/all',
      method: 'GET',
      success: function(res) {
        var arrToRender = JSON.parse(JSON.stringify(res.data))
        arrToRender.forEach((item, index, input) => {
          item.beginTime = util.formatTimeWithoutHMS(new Date(item.beginTime))
          item.expireTime = util.formatTimeWithoutHMS(new Date(item.expireTime))
        })

        arrToRender = arrToRender.filter((item) => {
          return item.status.indexOf("未开始") >= 0 &&
            item.uid != app.globalData.uid
        })

        arrToRender = arrToRender.splice(Math.floor(Math.random() * arrToRender.length), 3)

        me.setData({
          recommendTasks: arrToRender,
        })
      }
    })

  },

  goToDetail: function(e) {
    console.log(e.currentTarget.dataset.tid)
    wx.navigateTo({
      url: '../searchTaskDetail/searchTaskDetail?tid=' + e.currentTarget.dataset.tid,
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
