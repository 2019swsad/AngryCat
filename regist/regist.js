// regist/regist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    email:'',
    phone:''

 
  },
  userNameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  regist: function(e){
    wx.request({
      url: 'https://www.volley99.com/users/reg',
      data: {
        "username": this.data.username,
        "password": this.data.password,
         "phone":this.data.phone,
        "email": this.data.email
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        wx.navigateTo({
          url: '../pages/index/index'　　// 页面 B
        })

        if (res.statusCode == 200) {
        
         


        } else if (res.statusCode == 400) {
          console.log(res.data);
          wx.showToast({
            title: res.data.details[0].message,
            duration: 2000,
            icon: "none"
          })
        }
        else {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})