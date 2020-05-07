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
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      const categories = res.data.data.category.list; 
      
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      
      this.setData({
        categories,
        categoryData
      })

      this._getSubcategory(0)

      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    const maitkey = this.data.categories[currentIndex].maitKey
 
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    const miniWallkey = this.data.categories[currentIndex].miniWallkey;

    this._getRealCategoryDetail(currentIndex, miniWallkey, 'pop')
  },
  _getRealCategoryDetail(index, miniWallkey, type) {
    getCategoryDetail(miniWallkey, type).then(res => {
      const tempcategoryData2 = this.data.categoryData;
     
      tempcategoryData2[index].categoryDetail = res.data;
      this.setData({
        categoryData: tempcategoryData2
      })
    })
  },
  menuClick(e) {
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex);
    this._getCategoryDetail(currentIndex);
  }
})
