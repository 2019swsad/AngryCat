// pages/partipeople/partipeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personlist:[{
      avatar: "../../image/avatar.jpg",
      name:"xiaohong",
      credit:55,
      status:"进行中"
    },{
      avatar: "../../image/avatar.jpg",
      name:"ZhangMaLiang",
      credit:53,
      status:"已完成"
    }
    ],
    candidateList: [
      {
        avatar: "../../image/avatar.jpg",
        name: "Carlsu1",
        credit: 55,
      },
      {
        avatar: "../../image/avatar.jpg",
        name: "Carlsu2",
        credit: 55,
      }
    ],
    hidden:true,
    taskIsBegining: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var show=options.show;
    console.log(show)
    if(show==1){
      this.setData({
        hidden:true
      })
    }
   
  },
  goToCritic:function(e){
    wx.navigateTo({
      url: '../critic/critic',
    })
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