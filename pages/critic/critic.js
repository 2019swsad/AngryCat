// pages/critic/critic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 评价图片
    starCheckedImgUrl: "../../image/star.png",
    starUnCheckedImgUrl: "../../image/notstar.png",

    // 建议内容
    opinion: "",

    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],

    evaluations: [
      {
        id: 0,
        name: "完成效率",
        image: "../../image/tie.png",
        star: 0,
        note: ""
      },
      {
        id: 1,
        name: "完成效果",
        image: "../../image/smile.png",
        star: 0,
        note: ""
      }
    ],
    uid: "608fa7ba-3197-4a30-b968-6fc9157a86c3"



  },

  /**
   * 评分
   */
  chooseStar: function(e) {
    const index = e.currentTarget.dataset.index;
    const star = e.target.dataset.star;
    let evaluations = this.data.evaluations;
    let evaluation = evaluations[index];
    // console.log(evaluation)
    evaluation.star = star;
    evaluation.note = this.data.starMap[star - 1];
    this.setData({
      evaluations: evaluations
    })
  },
  submit: function(e) {
    var rate = (this.data.evaluations[0].star + this.data.evaluations[1].star ) / 2 * 20
    var irate = Math.round(rate)

    console.log(rate)

    wx.request({
      url: "https://www.volley99.com/users/rating",
      method: 'POST',
      data: {
        uid: this.data.uid,
        rate: irate
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {



        wx.showToast({
          title: '评价成功',
          duration: 2000,
          icon: 'success'
        })

      }

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.uid)
     var isPart=options.isPart
     if(isPart==1){
       console.log(options.isPart)
       
       this.setData({
         "evaluations[0].name":"任务内容准确性",
         "evaluations[1].name": "发布者态度",

       })
     }
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