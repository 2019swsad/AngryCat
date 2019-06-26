// pages/partipeople/partipeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personlist:[
    //   {
    //   avatar: "../../image/avatar.jpg",
    //   name:"xiaohong",
    //   credit:55,
    //   status:"进行中",
    //   uid:""
    // },{
    //   avatar: "../../image/avatar.jpg",
    //   name:"ZhangMaLiang",
    //   credit:53,
    //   status:"已完成",
    //   uid:""
    // }
    ],
    candidateList: [
      // {
      //   avatar: "../../image/avatar.jpg",
      //   name: "Carlsu1",
      //   credit: 55,
      //   uid:"1"
      // },
      // {
      //   avatar: "../../image/avatar.jpg",
      //   name: "Carlsu2",
      //   credit: 55,
      //   uid:"2"
      // }
    ],
    finishStatus: "已完成",
    taskIsBegining: false,
    tid:"",

    waitingnumber: 0,
    partinumber:0


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
    var self=this;
    //参与者列表
    
  
    wx.request({
      url: "https://www.volley99.com/task/participator/" + this.data.tid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },  
      success: function (res) {

        console.log(res.data)

        

        var jsonData = JSON.parse(JSON.stringify(res.data))
        var arrToRender = jsonData.reverse()
        arrToRender.forEach((item, index, input) =>{
          self.setData({
            partinumber: self.data.partinumber+1
          })
          

          wx.request({
            url:  'https://www.volley99.com/users/info/' + item.uid,
            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            method: 'GET',
            success: function (res) {

              console.log(res.data)

              let list = self.data.personlist;

              var j = {};

              console.log(item.status)

              j.status = item.status

              j.name = res.data[0].nickname;
              j.credit = res.data[0].credit;
              j.uid = res.data[0].uid;
              j.oid=item.oid;


              list.push(j);

              self.setData({
                personlist: list
              })


            }


          })


        
      


        })


      }

    })


//候选者列表


    wx.request({
      url: "https://www.volley99.com/order/waitinglist/" + this.data.tid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {




        var jsonData = JSON.parse(JSON.stringify(res.data))
        var arrToRender = jsonData.reverse()
        arrToRender.forEach((item, index, input) => {
          waitingnumber++;

          wx.request({
            url: 'https://www.volley99.com/users/info/' + item.uid,
            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionId")
            },
            method: 'GET',
            success: function (res) {

              console.log(res.data)

              let list = self.data.candidateList;

              var j = {};

              

              j.status=item.status

              j.name = res.data[0].nickname;
              j.credit = res.data[0].credit;
              j.uid = res.data[0].uid


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
  goToCritic:function(e){
    console.log(e.currentTarget.dataset.oid)
    wx.navigateTo({
      url: '../critic/critic?uid=' + e.currentTarget.dataset.uid+'&oid='+e.currentTarget.dataset.oid,
    })
  },

  qualify:function(e){

    console.log(e.currentTarget.dataset.uid)

    wx.request({
      url: "https://www.volley99.com/order/turnbegin/" + e.currentTarget.dataset.uid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {
        

      }
    })


     
  },
  disqualify:function(e){
    console.log(e.currentTarget.dataset.uid)

    wx.request({
      url: "https://www.volley99.com/order/turnpending/" + e.currentTarget.dataset.uid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {

        console.log(res.data)




      }
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