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
        name: "医院环境",
        image: "https://s1.ax1x.com/2018/08/05/PDMaCV.png",
        star: 0,
        note: ""
      },
      {
        id: 1,
        name: "医生专业技术",
        image: "https://s1.ax1x.com/2018/08/05/PDMd3T.png",
        star: 0,
        note: ""
      },
      {
        id: 2,
        name: "医生态度",
        image: "../../image/smile.png",
        star: 0,
        note: ""
      }
  ]


    
  },

  /**
   * 评分
   */
  chooseStar: function (e) {
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