<template>
  <v-card class="mx-auto" max-width="500">
    <!-- 상단에 카드 이미지 표시, 파일경로는 assets 기준 -->
    <v-img src="../assets/img/push-image.jpg" height="200px">
    </v-img>
    <v-row align="center">
      <v-col offset="1" cols="2">
        <!-- 좌측에 푸시알림 아이콘 이미지 표시, 파일경로는 public 기준 -->
        <v-img contain color="blue darken-2" src="../assets/img/push-noti.png" max-width="70px"></v-img>
      </v-col>
      <!-- 우측에 안내글 표시 -->
      <v-col cols="8">
        <v-card-title primary-title>
          <h1 class="headline">졸업작품 전시회 푸시알림</h1>
          <div class="body-1"> 졸업작품 전시회의 초청 푸시 알림을 보내려고 합니다.
            [알림허용] 단추를 클릭하시면 알림 정보를 받으실 수
            있습니다. </div>
        </v-card-title>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col offset="1" cols="5">
        <!-- 하단에 푸시알림 가입 버튼 표시 -->
        <v-btn block large @click="fnPushSubscribe" color="orange" dark>
          <v-icon dark left>add_alert</v-icon>
          알림 허용
        </v-btn>
      </v-col>
      <v-col cols="5">
        <!-- 하단에 푸시알림 해제 버튼 표시 -->
        <v-btn block large @click="fnUnSubscription" color="orange" dark>
          <v-icon dark left>notifications_off</v-icon>
          알림 해제
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="bMsg">
      푸시알림이 해제되었습니다.
      <v-btn color="orange" text @click="bMsg = false">닫기</v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
  // 파이어베이스에서 oSubscriptionsinDB 객체 변수 가져옴
  import {
    oSubscriptionsinDB
  } from '@/datasources/firebase'

  export default {
    data() {
      return {
        bMsg: false, // 버튼이 눌렸을 때 안내 메시지 표시여부
      }
    },
    methods: {
      fnPushSubscribe() {
        // this의 값 임시 저장
        let temp_this = this
        // 사용자에게 푸시 사용할지 허가 요청
        Notification.requestPermission(function (result) {
          if (result !== 'granted') {
            console.log('푸시알림 기능이 허용되지 않았습니다!')
          } else {
            // 사용자가 허가하면 푸시알림 서비스 설정 실행
            temp_this.fnConfigurePushSub()
          }
        })
      },
      // 푸시알림을 위해 서비스워커 점검 및 푸시서버 설정
      fnConfigurePushSub() {
        // this의 값 임시 저장
        let temp_this = this
        // 서비스 워커 없으면 시작하지 않음
        if (!('serviceWorker' in navigator)) {
          console.log("서비스 워커가 없습니다!")
          return
        }
        // 서비스 워커 준비 확인
        navigator.serviceWorker.ready
          .then(function (swreg) {
            // 푸시 서버에서 구독정보 가져옴
            return swreg.pushManager.getSubscription()
          })
          .then(function (sub) {
            if (sub === null) {
              // 처음 구독일 때 처리
              temp_this.fnNewSubscription()
              temp_this.fnDisplayNotification()
            } else {
              // 이미 구독된 경우 처리
              console.log('이미 구독되어 있습니다!')
            }
          })
      },
      // 새로운 구독자 등록 처리
      fnNewSubscription() {
        let temp_this = this
        navigator.serviceWorker.ready
          .then(function (swreg) {
            // 새로운 구독자 등록용 공개키(public key)) 준비
            const vapidPublicKey =
              'BMCrjoJDTdJBQYp7DPbT5dtCO-DlxmtCa5SxP3vu8TMmrQn3UKzx82o3LMlDrsqiR8Bu2zScioV4b3g4CeiByg0'
            const convertedVapidPublicKey =
              temp_this.urlBase64ToUint8Array(vapidPublicKey)
            // 푸시 서버에 퍼블릭키로 구독정보 등록함
            return swreg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidPublicKey
            }).then(function (newSub) {
              // 신규 구독자 정보 변환 : 로우 데이터 배열 => 필터링된 JSON => 정돈된 배열
              const filteredSub = JSON.parse(JSON.stringify(newSub))
              var pushConfig = {
                endpoint: filteredSub.endpoint,
                keys: {
                  p256dh: filteredSub.keys.p256dh,
                  auth: filteredSub.keys.auth
                }
              }
              // 파이어베이스 DB에 구독자 저장
              return oSubscriptionsinDB.push(pushConfig)
            })
          })
      },
      // 구독자 등록 해제
      fnUnSubscription() {
        let temp_this = this
        navigator.serviceWorker.ready
          .then(function (swreg) {
            return swreg.pushManager.getSubscription();
          }).then(function (oldSub) {
            temp_this.bMsg = true;
            oldSub.unsubscribe();
          }).catch(err => console.log(err))
      },
      // 푸시 알림 메시지 준비 및 발송
      fnDisplayNotification() {
        const title = '졸업작품 전시회'
        const options = {
          body: '새로운 소식 알림 서비스에 가입하신 것을 환영합니다!',
          icon: '/img/push-noti.png',
          badge: '/img/push-badge-icon.png',
          image: '/img/push-image.jpg',
          actions: [{
            action: 'like',
            title: '커피를 좋아하시면 링크를 클릭하세요.',
            icon: '/img/push-coffee.png'
          }],
          vibrate: [500, 100, 500]
        }
        navigator.serviceWorker.ready
          .then(function (swreg) {
            // 가입환영 알림 발송
            swreg.showNotification(title, options)
          })
      },
      // 코드 등록 때 필요할 숫자 컨버터용 유틸리티 함수
      urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4)
        const base64 = (base64String + padding)
          /* eslint-disable */
          .replace(/\-/g, '+')
          /* eslint-enable */
          .replace(/_/g, '/')
        const rawData = window.atob(base64)
        return Uint8Array.from([...rawData].map((char) =>
          char.charCodeAt(0)))
      }
    }
  }
</script>