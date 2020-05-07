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
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      goods.checked = !goods.checked

      const index = e.currentTarget.dataset.index

      app.changeGoodsState(index, goods)
    }
  }
})
