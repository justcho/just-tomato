const { http }  = require('../../lib/http.js')
const { app_id, app_secret } = getApp().globalData

Page({
  //点击按钮 => 调用小程序原生的 wx.login => 参数 => http.post => 返回 user
  // => 保存user => 返回首页
  login(e){
    let encrypted_data = e.detail.encryptedData
    let iv = e.detail.iv
    this.wxLogin(encrypted_data, iv)
  },
  wxLogin(encrypted_data, iv){
    wx.login({
      success: (res)=> this.loginMe(res.code , iv, encrypted_data)
    })
  },
  loginMe(code, iv, encrypted_data){
    http.post('/sign_in/mini_program_user', {
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret,
    })
    .then(res => {
      this.saveMessage(res)
      wx.reLaunch({ url: "/pages/home/home" })
    })
  },
  saveMessage(res){
    wx.setStorageSync('me', res.data.resource)
    wx.setStorageSync('X-token', res.header["X-token"])
  }
})