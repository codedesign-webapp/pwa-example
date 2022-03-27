import Vue from 'vue'
import Router from 'vue-router'
// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/', name: 'start_page', 
      component: () => import('./components/start_page.vue')
    },
    {
      path: '/main', name: 'main_page',
      component: () => import('./components/main_page.vue'),
      // 메인페이지는 인증과 연동
      meta: { bAuth: true }
    },
    {
      path: '/login', name: 'login_page',
      component: () => import('./components/login_page.vue')
    },
    {
      path: '/register', name: 'register_page',
      component: () => import('./components/register_page.vue')
    },
    {
      // 사용자가 라우터에 등록된 것 외에 다른 주소 입력 시 에러 페이지 연결
      path: '/*', name: 'error_page',
      component: () => import('./components/error_page.vue')
    }
  ]
})
// 라우터 이동에 개입하여 인증이 필요한 경우 login 페이지로 전환
router.beforeEach((to, from, next) => {
  const bNeedAuth = to.matched.some(record => record.meta.bAuth)
  const bCheckAuth = firebase.auth().currentUser
  if (bNeedAuth && !bCheckAuth) {
    next('/login')
  } else {
    next()
  }
}) 
export default router