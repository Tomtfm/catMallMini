// pages/home/childCpns/t-recommed/t-recommed.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLaod: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad() {
      // 判断 至发射一次 监听事件
      if(!this.data.isLaod) {
        this.triggerEvent('imageLoad')
        this.data.isLaod = true
      }
    }
  }
})
