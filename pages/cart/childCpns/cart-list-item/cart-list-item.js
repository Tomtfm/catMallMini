// pages/cart/childCpns/cart-list-item/catr-list-item.js
const app = getApp()

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },
  data: {

  },
  methods: {
    onCheckClick(e) {
      // 1.查找到对应的商品
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      goods.checked = !goods.checked

      // 2.获取当前商品的inex
      const index = e.currentTarget.dataset.index

      // 3.回调
      // console.log(index);
      app.changeGoodsState(index, goods)
    }
  }
})
