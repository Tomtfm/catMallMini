// pages/detail/childCpns/t-bottom-bar/t-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击加入购物车事件
    onAddCart() {
      this.triggerEvent('addCart', {}, {})
    }
  }
})
