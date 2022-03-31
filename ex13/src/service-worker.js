importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');  // <-- workbox 최신번전 CDN 추가

// Workbox를 디버그모드로 설정 
workbox.setConfig({
  debug: false,
});

// Vue-Cli에서 기본으로 제공하는 프리캐시 설정을 Workbox에 적용 
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);  // <-- self.__WB_MANIFEST로 변경

// 푸시 메세지 받는 경우 처리
self.addEventListener('push', function (event) {
  // 푸시 메시지를 JSON형태로 변경
  if (event.data) {
    data = JSON.parse(event.data.text())
  } else {
    console.log("데이터가 비어있습니다!")
  }

  // 알림 메시지 옵션 준비
  const options = {
    body: data.pMsg,
    icon: '/img/push-noti-icon.png',
    badge: '/img/push-badge-icon.png',
    image: '/img/push-news.jpg',
    actions: [{
      action: 'info',
      title: '이 링크는 상세정보 페이지로 이동합니다.',
      icon: '/img/push-info.png'
    }],
    vibrate: [500, 100, 500]
  }
  event.waitUntil(
    // 알림 메시지 전송하여 표시
    self.registration.showNotification(data.pTitle, options)
  )
})
// 푸시 알림 메시지에서 사용자가 링크 클릭 시 처리
self.addEventListener('notificationclick', function (event) {
  // 알림 메시지의 링크 클릭 시 경우별 사이트로 이동
  if (event.action == 'like') {
    clients.openWindow("https://www.starbucks.com/");
  } else if (event.action == 'info') {
    clients.openWindow("https://code-design.web.app/");
  }
  // 푸시알림 이벤트 종료
  event.notification.close();
}, false);