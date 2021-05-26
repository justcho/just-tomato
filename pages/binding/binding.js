const http = require('../../lib/http.js');

Page({
  data: {
    account: "",
    password_digest: "",
  },
  watchAccount(event){
    this.setData({ account: event.detail.value })
  },
  watchPassword(event){
    this.setData({ password_digest: event.detail.value })
  },
  submit(){
    http.post('/bindings',{
      account: this.data.account, 
      password_digest: this.data.password_digest
    })
    .then(res => {
      wx.setStorageSync('me', res.data.resource)
      wx.reLaunch({ url: "/pages/home/home" })
    })
  },
})