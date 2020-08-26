
// pages/user/user.js

var _app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '个人资料', url: '#',class:"iconfont icon-yonghu"},
      { text: '安全设置', url: '#',class:"iconfont icon-anquan" },
      { text: '清除缓存', url: '#',class:"iconfont icon-qingchu"},
      { text: '邀请好友', url: '#',class:"iconfont icon-fenxiang"},
      { text: '帮助说明', url: '#',class:"iconfont icon-bangzhu"}
    ],
    user:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const user = wx.getStorageSync('LoginUser');
    console.log(user);
    if(!user){
      /**带实现,不存在*/
    }else{
      this.setData({
        user:user
      })
    }
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
