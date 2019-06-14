// pages/index/createTask/createTask.js

var util = require('../../../utils/util.js')

const DOMAIN = 'https://volley.nyamori.moe'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginTime: '2019-06-16',
    expireTime: '2019-07-01'
  },


  bindBeginTimeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // wx.showToast({
    //   title: 'hi',
    // })
    this.setData({
      beginTime: e.detail.value
    })
  },


  bindExpireTimeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // wx.showToast({
    //   title: 'hi',
    // })
    this.setData({
      expireTime: e.detail.value
    })
  },

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // console.log(util.convertDateFormatToMDY(this.data.beginTime),
    //   util.convertDateFormatToMDY(this.data.expireTime))

    var submitObj = JSON.parse(JSON.stringify(e.detail.value))
    submitObj.beginTime = util.convertDateFormatToMDY(this.data.beginTime)
    submitObj.expireTime = util.convertDateFormatToMDY(this.data.expireTime)
    console.log("提交的对象为", submitObj)

    wx.request({
      url: DOMAIN + '/users/login',
      method: 'POST',
      data: {
        "username": "gyak",
        "password": "test"
      },
      header: {
        'Content-Type': 'application/json'
      },
      sucess: function(res){
        
        wx.showToast({
          title: JSON.stringify(res.data),
        })
        console.log(res.data)


        if(res.data.resultcode==200){
          console.log(JSON.stringfy(res))
          wx.showToast({
            title: '登录成功',
          })
        }else{
          console.log(JSON.stringfy(res))
        }
      },
      fail: function(){

      },
      complete: function(){
        wx.showToast({
          title: '完成HTTP请求',
        })
      }

    })
  },


  formReset: function() {
    console.log('form发生了reset事件')
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