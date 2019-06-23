// pages/account/Info/Info.js

const app = getApp()
const fileSystemManager = wx.getFileSystemManager()
const DOMAIN = 'https://www.volley99.com'

Page({

  /**
   * Page initial data
   */
  data: {
    nickname: "",
    phone: "",
    email:"",
    avatarUrl: "",
    addtell: {
      addtellHidden: true, //弹出框显示/隐藏
      title: "",
      placeholder: "",
      bindconfirm: "",
      bindcancel: "modalCancel",
      bindblur: "",
      inputValue: "",
      inputType: "text"
    },
    newNickname: "",
    newPhone: "",
    newEmail: "",
    password: "",
  },


  // =====================修改头像=====================
  /**
   * 更换头像函数
   */
  changeAvatar: function (e) {
    let me = this
    console.log("changeAvatar", JSON.stringify(e))
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${DOMAIN}/file`,
          header: {
            'cookie': wx.getStorageSync("sessionId"),
          },
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'uid': app.globalData.uid,
          },
          success(res) {
            console.log("UID", app.globalData.uid)
            console.log("uploadFileRes", JSON.stringify(res))
            me.setData({
              avatarUrl: DOMAIN + '/file/' + app.globalData.uid + '?' + Math.random() / 9999,
            })
          }
        })

      }
    })
  },

  /**
   * 加载默认头像
   */
  avatarError(err) {
    console.log(JSON.stringify(err))
    this.setData({
      avatarUrl: "../../../image/avatar.jpg"
    })
  },


  // =====================修改姓名=====================
  /**
   * 设置模板
   */
  changeNameMode: function() {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: false,
        title: "请输入新昵称",
        placeholder: "昵称",
        bindconfirm: "changeName",
        bindcancel: "modalCancel",
        bindblur: "saveName",
        inputValue: ""
      }
    })
  },

  /**
   * 修改昵称
   */
  changeName: function () {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: true,
      }
    })

    wx.request({
      url: "https://www.volley99.com/users/update",
      method: 'POST',
      data: {
        uid: app.globalData.uid,
        nickname: that.data.newNickname
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {
        if(res.statusCode == 200 || res.statusCode == 201) {
          that.setData({
            nickname: that.data.newNickname
          })
          wx.showToast({
            title: '修改成功',
            duration: 2000,
            icon: 'success'
          })
        }
        else {
          wx.showToast({
            title: '輸入格式錯誤',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    });
  },

  /**
   * 保存昵称输入
   */
  saveName: function (e) {
    this.setData({
      newNickname: e.detail.value
    })
  },

  // =====================修改手机号=====================
  /**
   * 设置模板
   */
  changePhoneMode: function () {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: false,
        title: "请输入新手机号",
        placeholder: "手机号",
        bindconfirm: "changePhone",
        bindcancel: "modalCancel",
        bindblur: "savePhone",
        inputValue: ""
      }
    })
  },

  /**
   * 修改手机号
   */
  changePhone: function () {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: true,
      }
    })

    wx.request({
      url: "https://www.volley99.com/users/update",
      method: 'POST',
      data: {
        uid: app.globalData.uid,
        phone: that.data.newPhone
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {
        if (res.statusCode == 200 || res.statusCode == 201) {
          that.setData({
            phone: that.data.newPhone
          })
          wx.showToast({
            title: '修改成功',
            duration: 2000,
            icon: 'success'
          })
        }
        else {
          wx.showToast({
            title: '輸入格式錯誤',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    });
  },

  /**
   * 保存手机号输入
   */
  savePhone: function (e) {
    this.setData({
      newPhone: e.detail.value
    })
  },

  // =====================修改邮箱=====================
  /**
   * 设置模板
   */
  changeEmailMode: function () {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: false,
        title: "请输入新邮箱",
        placeholder: "邮箱",
        bindconfirm: "changeEmail",
        bindcancel: "modalCancel",
        bindblur: "saveEmail",
        inputValue: ""
      }
    })
  },

  /**
   * 修改邮箱
   */
  changeEmail: function () {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: true,
      }
    })

    wx.request({
      url: "https://www.volley99.com/users/update",
      method: 'POST',
      data: {
        uid: app.globalData.uid,
        email: that.data.newEmail
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {
        if (res.statusCode == 200 || res.statusCode == 201) {
          that.setData({
            email: that.data.newEmail
          })
          wx.showToast({
            title: '修改成功',
            duration: 2000,
            icon: 'success'
          })
        }
        else {
          wx.showToast({
            title: '輸入格式錯誤',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    });
  },

  /**
   * 保存邮箱输入
   */
  saveEmail: function (e) {
    this.setData({
      newEmail: e.detail.value
    })
  },

  // =====================修改密码=====================
  /**
   * 设置模板
   */
  changePasswordMode: function () {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: false,
        title: "请输入新密码",
        placeholder: "新密码",
        bindconfirm: "changePassword",
        bindcancel: "modalCancel",
        bindblur: "savePassword",
        inputValue: "",
        inputType: "password"
      }
    })
  },

  /**
   * 修改密码
   */
  changePassword: function () {
    var that = this

    that.setData({
      addtell: {
        addtellHidden: true,
      }
    })

    wx.request({
      url: "https://www.volley99.com/users/update",
      method: 'POST',
      data: {
        uid: app.globalData.uid,
        password: that.data.password
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log("更换密码:" + res.data)
      }
    });
  },

  /**
   * 保存密码输入
   */
  savePassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 隐藏输入框
   */
  modalCancel: function () {
    this.setData({
      addtell: {
        addtellHidden: true,
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   * 获取账户信息
   */
  onShow: function () {
    this.setData({
      avatarUrl: DOMAIN + '/file/' + app.globalData.uid,
      nickname: getApp().globalData.nickname,
      phone: getApp().globalData.phone,
      email: getApp().globalData.email,
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})