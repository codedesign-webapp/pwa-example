// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'
// 파이어베이스 패키지 모듈 가져오기
import 'firebase/compat/database';

// 파이어베이스 DB를 초기화
const oFirebase = firebase.initializeApp({
    databaseURL: "https://pwa-notification-push.firebaseio.com",
});
// 파이어베이스 DB객체 연결 
const oDB = oFirebase.database();

// 파이어베이스 DB객체 중에서 subscriptions항목을 다른 곳에서 사용하도록 공개 
export const oSubscriptionsinDB = oDB.ref('subscriptions')