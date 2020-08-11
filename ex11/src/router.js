import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home_page',
      component: () => import('./components/home_page.vue')
    },
    {
      path: '/camera',
      name: 'camera_page',
      component: () => import('./components/camera_page.vue')
    },
    {
      path: '/info',
      name: 'info_page',
      component: () => import('./components/info_page.vue')
    },
    {
      path: '/post',
      name: 'post_page',
      component: () => import('./components/post_page.vue')
    },
  ]
})
