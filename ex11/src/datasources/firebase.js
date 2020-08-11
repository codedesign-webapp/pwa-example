// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/app'
// 파이어베이스 패키지 모듈 가져오기
import 'firebase/firebase-database';
import 'firebase/storage';

// 파이어베이스 DB를 초기화
const oFirebase = firebase.initializeApp({
  // 파이어베이스 콘솔에서 복사하여 붙여넣기
  databaseURL: "https://pwa-camera.firebaseio.com",
  storageBucket: "pwa-camera.appspot.com",
});
// 파이어베이스 DB객체 연결 
const oDB = oFirebase.database();

// 파이어베이스 DB객체 중에서 pictures 항목을 다른 곳에서 사용하도록 공개
export const oPicturesinDB = oDB.ref('pictures');
// 파이어베이스 스토리지 객체 공개
export const oStorage = oFirebase.storage();