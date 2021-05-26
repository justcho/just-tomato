const {http} = require('../../lib/http.js');

Page({
  updateId: '',
  updatIndex: '',
  data: {
    lists: [],
    visibleCreateConfirm: false,
    visibleUpdateConfirm: false,
    updateContent: "",
    hidden: false
  },
  onShow(){
    http.get('/todos?completed=false').then(res=>{
      this.setData({ lists: res.data.resources })
    })
  },
  confirmCreate(e){
    let content = e.detail
    if (content) {
      http.post('/todos',{
          completed: false, description: content
      })
      .then(res => {
        let todo = [res.data.resource]
        this.data.lists = todo.concat(this.data.lists)
        this.setData({ lists: this.data.lists })
        this.hideCreateConfirm()
      })
    }
  },
  changeText(e){
    let {content,id,index} = e.currentTarget.dataset
    this.updateId = id
    this.updatIndex = index
    this.setData({ visibleUpdateConfirm: true, updateContent: content})
  },
  confirmUpdate(e){
    let content = e.detail
    http.put(`/todos/${this.updateId}`, {
      description: content
    })
    .then(res => {
      let todo = res.data.resource
      this.data.lists[this.updatIndex] = todo
      this.setData({ lists: this.data.lists })
      this.hideUpdateConfirm()
    })
  },
  destroyTodo(e){
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    http.put(`/todos/${id}`,{
      completed: true
    })
    .then(res => {
      //销毁list
      let todo = res.data.resource
      this.data.lists[index] = todo
      this.setData({ lists: this.data.lists })
      wx.showToast({
        title: '完成待办',
        icon: 'success',
        duration: 2000
      })

    })
  },
  vibrate(){
    wx.vibrateLong()
  },
  hideCreateConfirm(){
    this.setData({ visibleCreateConfirm: false })
  },
  showCreateConfirm(){
    this.setData({ visibleCreateConfirm: true })
  },
  hideUpdateConfirm(){
    this.setData({ visibleUpdateConfirm: false })
  }
})
