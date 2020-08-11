import Vue from 'vue'
import Router from 'vue-router'
// main_page와 sub_page 두개의 컴포넌트 모듈을 가져옴
import main_page from '@/components/main_page'
import sub_page from '@/components/sub_page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // 첫 루트 페이지는 main_page로 설정해 둠
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