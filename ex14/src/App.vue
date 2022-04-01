<template>
 <v-app>
  <v-app-bar app color="primary" dark>
   <v-toolbar-title>오프라인 동기화</v-toolbar-title>
	 <!-- 온라인 상태일 때 와이파이 아이콘 표시 -->
   <v-btn v-if="bIsOnline" icon>
    <v-icon>wifi</v-icon>
   </v-btn>
   <!-- 오프라인 상태일 때 와이파이 오프 아이콘 표시-->
   <v-btn v-if="!bIsOnline" icon>
    <v-icon>signal_wifi_off</v-icon>
   </v-btn>
  </v-app-bar>
  <v-main>
   <!-- 동기화 페이지 컴포넌트 엘리먼트 사용 -->
   <c-syncpage/>
  </v-main>
 </v-app>
</template>

<script>
 // 동기화페이지 컴포넌트 가져옴
 import sync_page from '@/components/sync_page'
 export default {
  name: 'App',
  // 동기화페이지 컴포넌트를 엘리먼트 이름으로 변경
  components: {
   'c-syncpage': sync_page
  },
  data() {
   // 온라인 또는 오프라인 상태를 나타내는 부울 변수
   return {
    bIsOnline: ''
   }
  },
  created() {
   // 앱이 처음 실행될 때 온라인 또는 오프라인 상태변경될 때 실행되는 콜백 함수로 fnIsOnline() 연결
   window.addEventListener('online', this.fnIsOnline)
   window.addEventListener('offline', this.fnIsOnline)
   // 앱의 처음 상태 결정
   this.fnIsOnline()
  },
  methods: {
   // 온라인 또는 오프라인 상태를 인지하여 부울 변수값 변경
   fnIsOnline() {
    if (navigator.onLine) {
     this.bIsOnline = true
    } else {
     this.bIsOnline = false
    }
   }
  }
 }
</script>