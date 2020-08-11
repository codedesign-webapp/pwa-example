import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

// 코르도바 객체 가져옴
import VueCordova from 'vue-cordova'
Vue.use(VueCordova)
// 코르도바 앱이 head 부분 디자인을 위해 가져옴
import VueHead from 'vue-head' 
Vue.use(VueHead)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  // 코르도바앱의 뷰포트 설정을 위한 head 태그 디자인 선언
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
}).$mount('#app')