import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index.vue')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('../views/product.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('../views/category.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/order.vue')
      },
      {
        path:'/detail/:id',
        name:'detail',
        component: () => import('../views/detail.vue')
      },
      {
        path:'/save',
        name:'save',
        component: () => import('../views/save.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
