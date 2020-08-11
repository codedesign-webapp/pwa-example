import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'subscribe_page',
      component: () => import('./components/subscribe_page.vue')
    },
    {
      path: '/pushnotify',
      name: 'pushnotify_page',
      component: () => import('./components/pushnotify_page.vue')
    }
  ]
})