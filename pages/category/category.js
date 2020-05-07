// pages/category/category.js
import {
  getCategory, 
  getSubcategory, 
  getCategoryDetail
} from '../../service/category.js'

Page({
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },
  onLoad: function (options) {
    this._getData()
  },
  _getData() {
    // 1.请求分类数据
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      // 1.获取categories 数据
      const categories = res.data.data.category.list; 
      // console.log(categories);

      // 2.初始化每个类别的数据
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      // console.log(categoryData);
      
      // 3.修改data中的数据
      this.setData({
        categories,
        categoryData
      })

      // 4.请求第一个类别数据
      this._getSubcategory(0)

      // 5.请求第一各类别的详情数据
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的maitKey
    const maitkey = this.data.categories[currentIndex].maitKey
    
    // 2.请求数据
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的 miniWallkey
    const miniWallkey = this.data.categories[currentIndex].miniWallkey;

    // 2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallkey, 'pop')
  },
  _getRealCategoryDetail(index, miniWallkey, type) {
    getCategoryDetail(miniWallkey, type).then(res => {
      // 1.获取categoryData
      const tempcategoryData2 = this.data.categoryData;
      
      // 2.修改数据
      tempcategoryData2[index].categoryDetail = res.data;

      // 3.修改data中的数据
      this.setData({
        categoryData: tempcategoryData2
      })
    })
  },
  menuClick(e) {
    // 1.改变当前的 currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    // 2.请求对应的currentIndex数据
    this._getSubcategory(currentIndex);
    
    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex);
  }
})