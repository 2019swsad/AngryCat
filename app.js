//app.js
var util = require('/utils/util.js')
App({
  globalData: {
    nickname: "",
    userInfo: "",
    uid: "",
    DOMAIN: "https://www.volley99.com"
  },
  onLaunch: function() {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!!wx.getStorageSync("sessionId")) {
      wx.request({
        url: 'https://www.volley99.com/users/self',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionId")
        }, // 设置请求的 header
        success: function(res) {
          if (res.statusCode == 200) {

            //设置全局变量
            getApp().globalData.nickname = res.data.nickname;
            getApp().globalData.phone = res.data.phone;
            getApp().globalData.email = res.data.email;
            getApp().globalData.uid = res.data.uid;


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
    }
  },
  globalData: {
    userInfo: null
  }
})