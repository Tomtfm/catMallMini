// pages/cart/cart.js
const app = getApp()

Page({
  data: {
    cartList: [],
    isSelectAll: false,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad: function (options) {
    this.setData({
      cartList: app.globalData.cartList
    })
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    app.changeGoodsState = (index, goods) => {
      this.setData({
        [`cartList[${index}]`]: goods
      })
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  onSelectAll() {
    // 1.判断是否 是全部选中
    if(this.data.isSelectAll) { 
      this.data.cartList.forEach(item =>  item.checked = false)
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else { 
      this.data.cartList.forEach(item => item.checked = true)
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    } 
    this.changeData()
  },
  // 计算商品价格
  changeData() {
    let totalPrice = 0;
    let counter = 0;

    for(let item of this.data.cartList) {
      if(item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})
