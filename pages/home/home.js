// pages/home/home.js
import {getMultiData, getGoodsData} from '../../service/home.js'

// 定义滚动距离的常量
const top_disTance = 1000;

const types = ['pop', 'new', 'sell']

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {page: 0, list: []},
      new: {page: 0, list: []},
      sell: {page: 0, list: []}
    },
    // 用于记录当前类型的（默认为 ‘pop’）
    currentType: 'pop',
    // 设置 置顶小图片的隐藏
    showBackTop: false,
    isTobFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    // 1.请求轮播图以及推荐数据
    this._getMultidata()

    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  // onShow：页面显示出来的时候回调的函数，且不包含 所有的图片都加载完成；
  onShow() {
   
  },
  // ====================== 事件监听函数 =======================
  handleTabClick(event) {
    // 1.取出index
    const index = event.detail.index;

    // 2.设置currentType
    this.setData({
      currentType: types[index]
    })
  },
  handleImgLoad() {
    wx.createSelectorQuery().select('#top-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },
  // ================== 网络请求函数 ==========================
  _getMultidata() {
    getMultiData().then(res => {
      // a、取出轮播图和推荐的数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      })
      const recommends = res.data.data.recommend.list;
      
      // b、将banner和recommend 放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1;
    
    // 2.发送网络请求
    getGoodsData(type, page).then(res => {
      // 2.1.取出数据
      const list = res.data.data.list;

      // 2.2.将数据设置到对应的type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      // 2.3.将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      }) 
    })
  },
  // onReachBottom：页面滚动到底部的回调函数
  onReachBottom() {
    // 上拉加载更多
    this._getGoodsData(this.data.currentType) 
  },
  //onPageScroll: 监听页面滚动的函数 
  onPageScroll(options) {
    // 1.取出 scrollTop
    const scrollTop = options.scrollTop;
    
    // 2.修改 showBackTop属性
    // 小细节：官方建议，不要在滚动的函数回调中频繁的调用this.setData，有可能页面也会频繁的刷新；
    // 解决方案：给showBackTop进行一下判断,只有当它不一样的时候才进行一个调用
    const flag = scrollTop >= top_disTance
    if(flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
    // 3.修改 isTabFixed属性
    const flagFixed = scrollTop >= this.data.tabScrollTop
    if(flagFixed != this.data.isTobFixed) {
      this.setData({
        isTobFixed: flagFixed
      })
    }
  }
})