// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },

  bindGetUserInfo:function(e){
    console.log(e)
    let userInfo = e.detail.userInfo;
    this.setData({
      user: userInfo
    })
    wx.setStorageSync('user-info', userInfo)
  },

  onMyOrderClick:function(){
    wx.switchTab({
      url: "/pages/order/order",
    })
  },
  onMyCouponClick:function(){
    wx.showToast({
      title: '我的优惠券',
      icon: 'none'
    })
  },
  onMyPointsClick:function(){
    wx.showToast({
      title: '我的积分',
      icon: 'none'
    })
  },
  onMyPetClick:function(){
    wx.showToast({
      title: '我的宠物',
      icon: 'none'
    })
  },
  onMyInfoClick:function(){
    wx.showToast({
      title: '个人信息',
      icon: 'none'
    })
  },
  onAccountSetClick:function(){
    wx.showToast({
      title: '账号设置',
      icon: 'none'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('user-info')
    if(userInfo){
      this.setData({
        user: userInfo
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