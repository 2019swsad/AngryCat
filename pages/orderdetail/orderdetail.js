// pages/orderdetail/orderdetail.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskinfo: {

    },
    button1: "",
    button2: "",
    tid: '',
    oid: '',
    beginTime: '',
    endTime: '',
    isShow1: true,
    isShow2: true,
    addtell: {
      addtellHidden: true, //弹出框显示/隐藏
      title: "请输入完成码",
      placeholder: "完成码",
      bindconfirm: "modalConfirm",
      bindcancel: "modalCancel",
      bindblur: "saveUsertell",
      inputValue: "",
      inputType:"text"
    },
    questionair: "问卷调查",
    finishNumber: "",
    status:"",
    randNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.data.tid = options.tid;
    this.data.oid = options.oid;
    this.data.status = options.status;

    console.log(this.data.status)

    this.changeButton();


    this.requestTaskInfo();

  },
  requestTaskInfo: function() {
    var self = this;
    wx.request({
      url: "https://www.volley99.com/task/get/" + self.data.tid,
      method: 'GET',

      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {


        if (res.statusCode === 200 || res.statusCode === 201) {

          console.log(res.data);
          self.setData({
            taskinfo: res.data
          })
          var start = util.formatTimeWithoutHMS(new Date(res.data.beginTime));
          var end = util.formatTimeWithoutHMS(new Date(res.data.expireTime));
          self.setData({
            beginTime: start
          })

          self.setData({
            endTime: end
          })


          console.log(self.data.taskinfo.status)



          // if (self.data.taskinfo.status == '未开始') {
          //   self.setData({
          //     button1: "退出任务",
          //     button2: "完成任务"
          //   })

          // } else if (self.data.taskinfo.status == '进行中') {
          //   self.setData({
          //     button1: "退出任务",
          //     button2: "完成任务"
          //   })
          // } else if (self.data.taskinfo.status == '已结束') {
          //   self.setData({
          //     button1: "评价",
          //     isShow2: false
          //   })


          // }


        }
      },
      fail: function() {
        wx.showToast({
          title: 'fail',
          icon: 'none'
        })
      },
      complete: function() {
        console.log("完成HTTP请求")
      }
    })

  },
  onPress1: function(e) {
    var self = this;

    if (this.data.button1 == "评价") {
      wx.navigateTo({
        url: '../critic/critic?uid=' + this.data.taskinfo.uid + '&isPart=1'+'&oid='+this.data.oid,
      })


    } else if (this.data.button1 == "退出任务") {
      wx.showModal({
        title: '退出任务',
        content: '确定要退出任务？',
        success: function(res) {
          if (res.confirm) {

            wx.request({
              url: "https://www.volley99.com/order/close/" + self.data.oid,
              method: 'GET',

              header: {
                'Content-Type': 'application/json',
                'cookie': wx.getStorageSync("sessionId")
              },
              success: function(res) {

                wx.showToast({
                  title: '退出成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      //要延时执行的代码
                      wx.switchTab({
                        url: '../task/task'
                      });
                    }, 1000) //延迟时间
                  },
                });


              }


            });


          }
        }
      })

    } else if (this.data.button1 == "退出候补"){

      wx.showModal({
        title: '退出候补',
        content: '确定要退出候补？',
        success: function (res) {
          if (res.confirm) {

            wx.request({
              url: "https://www.volley99.com/order/close/" + self.data.oid,
              method: 'GET',

              header: {
                'Content-Type': 'application/json',
                'cookie': wx.getStorageSync("sessionId")
              },
              success: function (res) {

                wx.showToast({
                  title: '退出成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      //要延时执行的代码
                      wx.switchTab({
                        url: '../task/task'
                      });
                    }, 1000) //延迟时间
                  },
                });

              }


            });


          } else {

          }
        }
      })

    }

  },
  onPress2: function(e) {

    if (this.data.button2 == "完成任务") {
      this.setData({
        addtell: {
          addtellHidden: false,

        }
      })


    } else {

    }






  },
  modalConfirm: function() {

    console.log(this.data.finishNumber)
    console.log(this.data.tid)
    console.log(this.data.oid)
    //弹出框确认操作
    this.setData({
      addtell: {
        addtellHidden: true,
      }
    })

    wx.request({
      url: "https://www.volley99.com/order/accomplish",
      method: 'POST',
      data: {
        oid: this.data.oid,
        finishNumber: this.data.finishNumber
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function(res) {

        if(res.statusCode==400){

          wx.showToast({
            title: '完成码错误',
          })
        } else if (res.statusCode == 200){
          wx.showToast({
            title: '成功完成任务！',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.switchTab({
                  url: '../task/task'
                });
              }, 1000) //延迟时间
            },
          });

        }


      }


    });



  },
  modalCancel: function() {
    //弹出框取消操作
    this.setData({
      addtell: {
        addtellHidden: true,
      }
    })
    console.log(this.data.finishNumber)
  },
  saveUsertell: function(e) {
    this.setData({
      finishNumber: e.detail.value
    })
  },

  changeButton(){
     if(this.data.status=="进行中"){
       this.setData({
         button1: "退出任务",
         button2: "完成任务"
       })

     } else if (this.data.status == "已完成"){
       this.setData({
         button1: "评价",
         isShow2: false
       })

     } else if (this.data.status == "候补中"){
       this.setData({
         button1: "退出候补",
         isShow2: false
       })

     }else{
       this.setData({
         isShow1: false,
         isShow2: false
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
    this.setData({
      randNum : Math.random() / 9999
    })
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
