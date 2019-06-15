// pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    selfAllTasks:'',
    tasks: [
      {
        "_id": "5cfb769b2a1fa23a478025ba",
        "title": "test task",
        "type": "Questionaire",
        "salary": 20,
        "description": "task for test",
        "beginTime": "2019-08-19T16:00:00.000Z",
        "expireTime": "2019-08-21T16:00:00.000Z",
        "participantNum": 1,
        "tags": "Testing",
        "uid": "796885d0-c912-4559-ad8b-2acddcc066e3",
        "tid": "f4cecc81-ccff-41c9-bedc-3acd3da2dce1",
        "status": "start",
        "totalCost": 20,
        "createTime": "2019-06-08 16:49:31",
        "currentParticipator": 0
      },
      {
        "_id": "5cfbd4cf2a1fa23a478025bc",
        "title": "买避孕套",
        "type": "问卷",
        "salary": 20,
        "description": "这是一个任务描述",
        "beginTime": "2019-08-19T16:00:00.000Z",
        "expireTime": "2019-08-21T16:00:00.000Z",
        "participantNum": 1,
        "tags": "Testing",
        "uid": "796885d0-c912-4559-ad8b-2acddcc066e3",
        "tid": "565a870a-3b6a-4d7e-80ce-a3fa4caaa531",
        "status": "start",
        "totalCost": 20,
        "createTime": "2019-06-08 23:31:27",
        "currentParticipator": 0
      },
      {
        "_id": "5cfdfa23d406a67d78568d2a",
        "title": "for test 2",
        "type": "normal",
        "salary": 1,
        "description": "hihihi",
        "beginTime": "2019-06-13T14:14:41.000Z",
        "expireTime": "2020-05-31T05:55:47.000Z",
        "participantNum": 5,
        "tags": "new test",
        "uid": "d06146e7-aaff-47a8-831b-99bcf73e1f55",
        "tid": "4e6c5138-9bed-4c77-9746-47d482be9d98",
        "status": "start",
        "totalCost": 5,
        "createTime": "2019-06-10 14:35:15",
        "currentParticipator": 0
      }]

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

  },

  //滑动切换
  swiperTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  //点击切换
  clickTab: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})