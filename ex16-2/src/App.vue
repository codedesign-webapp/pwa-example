<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>모바일 디바이스 상태첵크</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-row>
        <v-col cols="10" offset="1" class="my-3">
          <v-card color="blue-grey" class="white--text">
            <v-card-title class="body-1">
              &squf; 메뉴 버튼을 누르면 Pause와 Resume 이벤트가
              실행됩니다.</v-card-title>
            <v-card-title class="body-1">
              &squf; USB 단자를 연결 해제하면 상태값이 변합니다.</v-card-title>
            <v-card-title class="body-1">
              &squf; 뒤로 가기 버튼을 누르면 앱이 종료됩니다.
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="10" offset="1" class="my-3">
          <v-list>
            <!-- 상태값을 리스트에 아이콘과 제목으로 함께 표시 -->
            <v-list-item v-for="item in items" :key="item.id">
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        cordova: Vue.cordova, // 아파치코르도바 객체변수
        items: [] // 리스트에 표시할 내용
      }
    },
    // 'deviceready' 이벤트 발생시 onDeviceReady() 함수와 연결
    created() {
      var self = this
      this.cordova.on('deviceready', () => {
        self.onDeviceReady()
      })
    },
    methods: {
      // 'deviceready' 이벤트는 앱이 정상적으로 실행되어 준비가 완료되면 발생됨
      onDeviceReady: function () {
        // 리스트에 아이콘과 메시지 표시하기 위해 배열의 push() 함수 사용
        this.items.push({
          icon: 'devices',
          title: 'Device Ready 이벤트발생!'
        })
        //pause, resume, backbutton 이벤트는 반드시 document.addEventListener()로 연결
        document.addEventListener('pause', this.onPause, false)
        document.addEventListener('resume', this.onResume, false)
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false)
        }
        // batterystatus 이벤트는 반드시 window.addEventListener()로 연결
        window.addEventListener('batterystatus', this.onBatteryStatus, false)
      },
      // 'pause' 이벤트는 앱이 백그라운드모드가 될 때 발생
      onPause() {
        this.items.push({
          icon: 'pause',
          title: 'Pause 이벤트발생!'
        })
      },
      // 'resume' 이벤트는 앱이 백그라운드에서 다시 활성화될 때 실행
      onResume() {
        this.items.push({
          icon: 'play_arrow',
          title: 'Resume 이벤트발생!'
        })
      },
      // 'backbutton' 이벤트는 안드로이드의 경우만 실행
      onBackKeyDown() {
        this.items.push({
          icon: 'arrow_back',
          title: 'Back Button 이벤트발생!'
        })
        // 앱을 종료
        navigator.app.exitApp()
      },
      // 'batterystatus' 이벤트는 'cordova-plugins-battery-status' 플러그인을 설치해야 동작함
      onBatteryStatus(pStatus) {
        this.items.push({
          icon: 'battery_std',
          title: "배터리 용량: " + pStatus.level + "%"
        })
        this.items.push({
          icon: 'usb',
          title: "USB 연결: " + pStatus.isPlugged
        })
      }
    }
  }
</script>