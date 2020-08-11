// 파이어베이스 함수, 어드민, 접근권한 핸들러 준비
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const cors = require('cors')({
  origin: true
})
// 푸시서버 핸들러 준비
const webpush = require('web-push')
// 파이어베이스 콘솔에서 다운로드 받은 서비스계정 파일 연결
const serviceAccount = require("./pwa-notification-push-fb-key.json")
// 파이어베이스 서비스계정으로 인증 실시
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pwa-notification-push.firebaseio.com"
});
// 푸시알림 메시지 전송 함수
exports.storePushData = functions.https.onRequest((request, response) => {
  // cors를 통해 다른 도메인 접근 허용
  cors(request, response, () => {
    // 공개키와 비공개키를 짝으로 사용하여 푸시서버 암호사용 준비
    webpush.setVapidDetails('mailto:abc@abc.com','BMCrjoJDTdJBQYp7DPbT5dtCO-DlxmtCa5SxP3vu8TMmrQn3UKzx82o3LMlDrsqiR8Bu2zScioV4b3g4CeiByg0', 'C26PvG4MP4sMbQX3fPgyMLCxdobwn8-KyszBtq5zhDA');
    // 파이어베이스 DB에 등록된 구독자 정보 읽기
    admin.database().ref('subscriptions').once('value')
      .then(AllData => {
        // DB에서 구독자들 정보 하나씩 꺼내기
        AllData.forEach(sub => {
          // 하나의 구독자 정보에서 발송 목적지와 키 정보 추출 
          let pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth, p256dh: sub.val().keys.p256dh
            }
          }
          // 푸시서버로 해당 구독자에게 푸시알림 발송
          webpush.sendNotification(pushConfig, JSON.stringify({
              pTitle: request.body.pTitle, pMsg: request.body.pMsg
            }))
            // 푸시 알림을 받은 등록자가 취소 또는 만기될 때 처리 
            .catch(err => {
              console.log('등록 안된 사용자 제거!', err)
              sub.ref.remove()
            })
        })
        response.status(201).send('완료!'); // 완료코드 201 반환하고 종료
      }).catch(err => {
        console.log('구독자 정보를 읽지 못했습니다!', err)
        response.status(500).send({
          message:'구독자 정보를 읽지 못했습니다!', error: err.response
        });
      })
  })
})