const app = getApp()
const { host, t_app_id, t_app_secret } = app.globalData

const _http = (method,url,data)=>{
  let header = {
    "t-app-id": t_app_id,
    "t-app-secret": t_app_secret
  }
  if (wx.getStorageSync('X-token')){
    header["Authorization"] = `Bearer ${wx.getStorageSync('X-token')}`
  }
  return new Promise((resolve, reject)=>{
    wx.request({
      url: `${host}${url}`,
      data,
      header,
      method,
      dataType: 'json',
      success: (res) => {
        let statusCode = res.statusCode
        if (statusCode >= 400){
          if (statusCode === 401){
            wx.redirectTo({ url: "/pages/login/login" })
          }
          reject({ statusCode, res })
        } else {
          resolve(res)
        }
      },
      fail: (err) => {
        wx.showToast({ title: '请求失败', icon: 'none' })
        reject(err)
      }
    })
  })
}

const http = {
  get: (url,params)=> _http('GET', url, params),
  post: (url,data)=>_http('POST', url, data),
  put: (url,data)=>_http('PUT', url, data),
  delete: (url,data)=>_http('DELETE', url, data),
}

module.exports = {
  http
}