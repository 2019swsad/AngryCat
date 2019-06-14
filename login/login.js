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
    //console.log(this.data.username);
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
          
          wx.setStorageSync("sessionId", util.handleCookieFromSetCookie(res.header['Set-Cookie'].split(',')));

         
           if(res.data.status=='success'){
             console.log(res.data);

           }


        } else if (res.statusCode == 400){
          wx.showToast({
            title: '用户密码错误',
            duration: 2000,
            icon: 'fail'
          })
        }
        else {
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