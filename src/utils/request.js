import axios from 'axios'

// 创建 axios 实例，不设置 baseURL，让请求通过代理
const request = axios.create({
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    console.log('Request URL:', config.url)
    console.log('Request Method:', config.method)
    console.log('Request Headers:', config.headers)
    
    if (!config.url.includes('/platform/login')) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['LoginAuthUser'] = token
      }
    }
    return config
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    console.log('Response Status:', response.status)
    console.log('Response Data:', response.data)
    return response
  },
  error => {
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('Response Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No Response Error:', error.request)
    } else {
      // 请求配置出错
      console.error('Request Config Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default request 