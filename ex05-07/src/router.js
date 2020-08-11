import Vue from 'vue'
import Router from 'vue-router'

// 라우터로 연결할 main_page, sub_page 컴포넌트 모듈 가져옴
import main_page from './main_page.vue';
import sub_page from './sub_page.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/main', component: main_page},
    { path: '/sub', component: sub_page}
  ]
})