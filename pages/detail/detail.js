// pages/detail/detail.js
import {
  getDetail, 
  getRecommends, 
  GoodsBaseInfo, 
  ShopInfo,
  ParamInfo
} from '../../service/detail.js'

// 定义滚动距离的常量
// const top_disTance = 1000;

const app = getApp()

Page({
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {}
    // 设置 置顶小图片的隐藏
    // showBackTop: false,
    // isTobFixed: false,
    // tabScrollTop: 0
  },
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    
    this._getDetailData()

    this._getRecommends()
  },
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result;
      // console.log(data);
      
      const topImages = data.itemInfo.topImages;
      
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      const shopInfo = new ShopInfo(data.shopInfo)

      const detailInfo = data.detailInfo

      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      let commentInfo = {}
      if(data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      const recommends = res.data.data.list
      // console.log(recommends);
      this.setData({
        recommends
      })
    })
  },
  // 点击加入购物车事件
  onAddCart() {
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    
    app.addToCart(obj)

    wx.showToast({
      title: '成功加入购物车'
    })
  }
})
