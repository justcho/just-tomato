const { http } = require('../../lib/http.js');

Page({
  data: {
    tab: "tomato",
    tomatoes: {},
    todos: {},
    me: {}
  },
  onShow: function () {
    this.fetchTomatoes()
    this.fetchTodos()
    this.setData({me: wx.getStorageSync('me')})
  },
  fetchTomatoes(){
    http.get('/tomatoes', {is_group: "yes"})
    .then(res => {
      console.log(res.data.resources)
      this.setData({ tomatoes: res.data.resources})
    })
  },
  fetchTodos(){
    http.get('/todos', { is_group: "yes" ,completed: true})
    .then(res => {
      console.log(res.data.resources)
      this.setData({ todos: res.data.resources })
    })
  },
  changeTab(e){
    let name = e.currentTarget.dataset.name
    this.setData({ tab: name })
  }
})
