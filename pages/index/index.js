//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    type: 1,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    tabList:[
      {area: "全部"},
      {area: "内地"},
      {area: "港台"},
      {area: "欧美"},
      {area: "日本"},
      {area: "韩国"}
    ],
    tabIndex: 0,
    listData: [],
    area: "全部",
    offset: 0,
    limit: 10,
    hasMore: false
  },


  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

getBannerData:function(){
  let self = this;
    wx.request({
      url: 'http://imaple.vip:3000/banner',
      data: {
        type: self.data.type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        let result = res.data;
        if(result && result.code == 200){
          self.setData({
            banners: result.banners
          })
        }
      }, fail: function (err) {},
      complete: function () {}
    })
},

  getListData:function(){
    let self = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://imaple.vip:3000/mv/all', //仅为示例，并非真实的接口地址
      data: {
        area: self.data.area,
        offset: self.data.offset,
        limit: self.data.limit
      },
      header: {
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success (res) {
        console.log(res.data)
        let result = res.data;
        if(result && result.code == 200){
          self.setData({
            listData: result.data
          })
        }
      },
      fail: function (err) {},
      complete: function () {
        wx.hideLoading();
      }
    })
  },

  getReListData:function(){
    let self = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.showNavigationBarLoading();
    // 下拉刷新延迟1秒
    setTimeout(function () {
      wx.request({
        url: 'http://imaple.vip:3000/mv/all', //仅为示例，并非真实的接口地址
        data: {
          area: self.data.area,
          offset: self.data.offset,
          limit: self.data.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success (res) {
          console.log(res.data)
          let result = res.data;
          if(result && result.code == 200){
            self.setData({
              listData: result.data
            })
          }
        },
        fail: function (err) {},
        complete: function () {
          // 停止下拉刷新
          wx.stopPullDownRefresh();
          //关闭NavBar loading
          wx.hideNavigationBarLoading();
          //关闭 loading 
          wx.hideLoading();
        }
      })
    }, 1000);
  },

  getMoreListData:function(){
    let self = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://imaple.vip:3000/mv/all', //仅为示例，并非真实的接口地址
      data: {
        area: self.data.area,
        offset: self.data.offset,
        limit: self.data.limit
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success (res) {
        console.log(res.data)
        let result = res.data;
        if(result && result.code == 200 && result.hasMore &&result.data.length >0){
          let newList = self.data.listData.concat(result.data);
            self.setData({
              hasMore: false,
              listData: newList
            })
        }else{
          self.setData({
            hasMore: true
          })
        }
      }, 
      fail: function (err) {},
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  
  onBannerItemClick: function(e){
    wx.showToast({
      title:  String(e.currentTarget.dataset.index),
      icon: 'none'
    })
  },

  onTabItemClick: function(e){
    let tabIndex = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: tabIndex
    })
    this.data.area = this.data.tabList[tabIndex].area;
    console.log("传递的数据::"+ this.data.area);
    this.data.offset = 0;
    this.data.listData = [];
    this.getReListData();
  },
  onListItemClick:function(e){
      let mvid = String(e.currentTarget.dataset.gid);
      wx.navigateTo({
        url: "/pages/details/details?mvid="+mvid
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerData();
    this.getListData();
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
    this.data.offset = 0;
    this.data.listData = [];
    this.getReListData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.offset++;
    this.getMoreListData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})