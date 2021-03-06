// login/login.js
var util = require('../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''

  },
  userNameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passWdInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  
  login: function(param) {
    console.log(this.data.username)
    var self = this;
    //console.log(this.data.username);
    //发出登录请求
    wx.request({
      url: 'https://www.volley99.com/users/login',
      data: {
        "username": this.data.username,
        "password": this.data.password
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res) {

        if (res.statusCode == 200) {

          if (res.data.status == 'success') {
            wx.setStorageSync("sessionId", util.handleCookieFromSetCookie(res.header['Set-Cookie'].split(',')));

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

            wx.showToast({
              title: '成功登录',
              duration: 2000,
              icon: 'success'
            })
            // 导航回主页
            setTimeout(wx.switchTab, 1500, {
              url: '../pages/index/index',
              delta: 1
            })

          }

        } else if (res.statusCode == 400) {
          wx.showToast({
            title: '用户或密码错误',
            duration: 2000,
            icon: 'none'
          })
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