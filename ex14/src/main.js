import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

// 클라우드 파이어스토어 모듈 가져옴
import { firestorePlugin } from 'vuefire'
// 클라우드 파이어스토어 모듈 사용 준비
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
