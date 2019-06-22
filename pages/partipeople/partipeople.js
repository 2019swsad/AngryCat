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
      status:"进行中"
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
    finishStatus: "已完成",
    taskIsBegining: false,
    tid:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.tid)
    this.data.tid = options.tid

    // var show=options.show;
    // console.log(show)
    // if(show==1){
    //   this.setData({
    //     hidden:true
    //   })
    // }
    wx.request({
      url: "https://www.volley99.com/task/participator/" + self.data.tid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {


      }

    })


  

   
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