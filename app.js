//app.js
var util = require('/utils/util.js')
App({
  globalData :{
    nickname:"",
    userInfo:"",
    uid:"",
    DOMAIN: "https://www.volley99.com"
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })


    wx.request({
      url: 'https://www.volley99.com/users/login',
      data: { "username": "alias", "password": "123" },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res) {

        if (res.statusCode == 200) {
          wx.setStorageSync("sessionId", util.handleCookieFromSetCookie(res.header['Set-Cookie'].split(',')));
          console.log(util.handleCookieFromSetCookie(res.header['Set-Cookie'].split(',')));


          console.log(res.data);
        } else {
          console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
        }
      },
      fail: function() {
        console.log("index.js wx.request CheckCallUser fail");
      },
      complete: function() {
        // complete
      }
    })

    var self=this;

    //获取用户详情

    wx.request({
      url: 'https://www.volley99.com/users/self',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      }, // 设置请求的 header
      success: function (res) {

        if (res.statusCode == 200) {

          //设置全局变量

          self.globalData.nickname=res.data.nickname;
          self.globalData.phone = res.data.phone;
          self.globalData.email = res.data.email;
          self.globalData.uid = res.data.uid;


          console.log(res.data);
        } else {
          console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
        }
      },
      fail: function () {
        console.log("index.js wx.request CheckCallUser fail");
      },
      complete: function () {
        // complete
      }
    })



    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
