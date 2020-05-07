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
    currentType: 'pop',
    showBackTop: false,
    isTobFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    this._getMultidata()

    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  onShow() {
   
  },
  handleTabClick(event) {
    const index = event.detail.index;

    this.setData({
      currentType: types[index]
    })
  },
  handleImgLoad() {
    wx.createSelectorQuery().select('#top-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },
  _getMultidata() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      })
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1;
    
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list;
      const oldList = this.data.goods[type].list;
      oldList.push(...list);
      
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      }) 
    })
  },
  onReachBottom() {
    this._getGoodsData(this.data.currentType) 
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    
    const flag = scrollTop >= top_disTance
    if(flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
    const flagFixed = scrollTop >= this.data.tabScrollTop
    if(flagFixed != this.data.isTobFixed) {
      this.setData({
        isTobFixed: flagFixed
      })
    }
  }
})
