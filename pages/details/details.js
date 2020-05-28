// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dmvid: "",
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    current: 0,
    detailsData: {},
    banners:[]
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
  
  swiperChange: function(e){
    let mCurrent = e.detail.current;
    this.setData({
      current: mCurrent
    })
  },

  onBannerItemClick: function(e){
    let self = this
    console.log(e)
    let mindex = e.currentTarget.dataset.index;
    console.log(mindex)
    wx.previewImage({
      urls: self.data.banners,
      current: self.data.banners[mindex]
    })
  },

  getDetailsData: function(){
    let self = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://imaple.vip:3000/mv/detail',
      data: {
        mvid: self.data.dmvid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success (res) {
        console.log(res.data)
        let result = res.data;
        if(result && result.code == 200){
          let cover = result.data.cover;
          let newList = [];
          // for (let i = 0; i < 3; ++i) {
          //   newList.push(cover);
          // }
          newList.push(cover);
          newList.push("http://p1.music.126.net/Cj1swJCpySxwplpoJClz9w==/109951165005263865.jpg");
          newList.push("http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg");
          console.log(newList.length + "--" + cover)
          self.setData({
            banners: newList,
            detailsData: result.data
          })
        }
      },
      fail: function () {},
      complete: function () {
        wx.hideLoading();
      }
    })

  },


onHomeClick:function(){
  wx.switchTab({
    url: '/pages/index/index',
  })
},

onWeixinClick:function(){
  wx.makePhoneCall({
    phoneNumber: '10086',
  })
},

onCartClick:function(){
  wx.switchTab({
    url: '/pages/shopcart/shopcart',
  })
},

onAddCartClick:function(){
  wx.showToast({
    title: '加入购物车',
    icon: 'none'
  })
},

onBuyClick:function(){
  wx.showToast({
    title: '立即购买',
    icon: 'none'
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mvid = options.mvid;
    console.log("mvid::" + mvid)
    this.data.dmvid = mvid;
    this.getDetailsData();
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