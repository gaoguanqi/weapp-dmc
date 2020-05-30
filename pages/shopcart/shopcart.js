// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    total: 0,
    select: true
  },


  getOrderData:function(){
    let self = this;
    wx.showLoading({
      title: '加载中',
    });
      wx.request({
        url: 'http://imaple.vip:3000/dj/today/perfered',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success (res) {
          console.log(res.data)
          let result = res.data;
          if(result && result.code == 200){
            let mtotal = 0;
            result.data.push(result.data[1]);
            result.data.forEach(function(item, index){
              console.log(item.programCount)
              mtotal += item.programCount;
            })
            
              self.setData({
                orderList: result.data,
                total: mtotal
              })
          }
        }, fail: function (err) {},
        complete: function () {
          wx.hideLoading();
        }
      })
  },

  checkboxChange:function(e){
    let self = this;
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderData();
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