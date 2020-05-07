// 如果都是使用相同的 url的话就直接在这里导入，就不用转入前缀了
import { baseURL, timeout } from './config.js'

// 网络请求的封装
export default function (options) {
  // wx.showLoading({
  //   title: '数据加载中ing',
  // })

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      timeout: timeout,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}