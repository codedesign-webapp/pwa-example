import Vue from 'vue'
import Router from 'vue-router'
import main_page from '@/components/main_page'
import sub_page from '@/components/sub_page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', name: 'home', component: main_page
    },
    {
      path: '/main', name: 'main_page', component: main_page
    },
    {
      path: '/sub', name: 'sub_page', component: sub_page
    }
  ]
})