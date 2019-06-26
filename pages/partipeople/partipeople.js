// pages/partipeople/partipeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personlist: [],
    candidateList: [],
    finishStatus: "已完成",
    criticStatus: "已评价",
    taskIsBegining: false,
    tid: "",
    waitingnumber: 0,
    partinumber: 0,
    participanNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // console.log(options.count)
    this.data.tid = options.tid
    this.setData({
      participanNum: options.count
    })

    // var show=options.show;
    // console.log(show)
    // if(show==1){
    //   this.setData({
    //     hidden:true
    //   })
    // }
    var self = this;

    // 获得参与者列表
    wx.request({
      url: "https://www.volley99.com/task/participator/" + this.data.tid,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {
        // console.log(res.data)
        var jsonData = JSON.parse(JSON.stringify(res.data))
        var arrToRender = jsonData.reverse()

        arrToRender.forEach((item, index, input) => {
          self.setData({
            partinumber: self.data.partinumber + 1
          })

          wx.request({
            url: 'https://www.volley99.com/users/info/' + item.uid,
            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            method: 'GET',
            success: function(res) {
              // console.log(res.data)
              let list = self.data.personlist;
              var j = {};
              var com = item.comment
              j.status = item.status
              if (com == "已评价") {
                j.status = "已评价";
              }
              j.name = res.data[0].nickname;
              j.credit = res.data[0].credit;
              j.uid = res.data[0].uid;
              j.oid = item.oid;

              list.push(j);

              self.setData({
                personlist: list
              })
            }
          })
        })
      }
    })


    // 获得候选者列表
    wx.request({
      url: "https://www.volley99.com/order/waitinglist/" + this.data.tid,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {
        var jsonData = JSON.parse(JSON.stringify(res.data))
        var arrToRender = jsonData.reverse()
        arrToRender.forEach((item, index, input) => {
          self.setData({
            waitingnumber: self.data.waitingnumber+1
          })
          // waitingnumber++;

          wx.request({
            url: 'https://www.volley99.com/users/info/' + item.uid,
            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            method: 'GET',
            success: function(res) {

console.log(item.oid)


              let list = self.data.candidateList;
              var j = {};

              j.status = item.status
              j.name = res.data[0].nickname;
              j.credit = res.data[0].credit;
              j.uid = res.data[0].uid
              j.oid=item.oid

              list.push(j);

              self.setData({
                candidateList: list
              })
            }
          })
        })
      }
    })
  },
  
  // 转到评价页
  goToCritic: function(e) {
    console.log(e.currentTarget.dataset.oid)
    wx.navigateTo({
      url: '../critic/critic?uid=' + e.currentTarget.dataset.uid + '&oid=' + e.currentTarget.dataset.oid,
    })
  },

  // 将候选者升级为参与者
  qualify: function(e) {
    console.log(e.currentTarget.dataset.uid)


    wx.showModal({
      title: '提示',
      content: '确定将该报名者转正吗？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: "https://www.volley99.com/order/turnbegin/" + e.currentTarget.dataset.uid,
            method: 'GET',

            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            success: function (res) {

              console.log(res.data)


            }
          })
        }
        
      }
    })

  


 
  },
  
  // 将参与者降级为候选者
  disqualify: function(e) {
    console.log(e.currentTarget.dataset.oid)

    wx.showModal({
      title: '提示',
      content: '确定取消该报名者资格吗？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: "https://www.volley99.com/order/turnpending/" + e.currentTarget.dataset.oid,
            method: 'GET',

            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            success: function (res) {

              console.log(res.data)




            }
          })
        }
      }
    })


  

   

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