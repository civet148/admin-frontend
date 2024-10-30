import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Layout from './components/Layout.vue'
import CheckoutList from './views/CheckoutList.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    component: Layout,
    redirect: '/main/checkout-list',
    children: [
      {
        path: 'checkout-list',
        name: 'CheckoutList',
        component: CheckoutList,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 修改路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 如果是访问登录页
  if (to.path === '/login') {
    if (token) {
      // 已登录则跳转到主页
      next('/main/checkout-list')
    } else {
      // 未登录则允许访问登录页
      next()
    }
  } else {
    // 访问其他页面
    if (!token) {
      // 未登录则跳转到登录页
      next('/login')
    } else {
      // 已登录则允许访问
      next()
    }
  }
})

export default router
