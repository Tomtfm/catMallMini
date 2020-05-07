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
    // 1.获取转入的iid
    this.setData({
      iid: options.iid
    })

    // 2.请求商品详情数据
    this._getDetailData()

    // 3.请求商品推荐的数据
    this._getRecommends()
  },
  // ============== 网络请求区 ===================
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result;
      // console.log(data);
      
      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages;
      
      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建shopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo

      // 5.创建 ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
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
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    
    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '成功加入购物车'
    })
  }
})