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
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.回调设置
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    
    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 3.1.修改某一项选中的状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      
      // 3.2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  onSelectAll() {
    // 1.判断是否 是全部选中
    if(this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item =>  item.checked = false)
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else { //某些没选中
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
    // 1.获取所有选中的数据
    let totalPrice = 0;
    let counter = 0;

    for(let item of this.data.cartList) {
      if(item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }
    // console.log(counter, totalPrice);

    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})