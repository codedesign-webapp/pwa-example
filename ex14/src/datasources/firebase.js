// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'
// 파이어베이스 패키지 모듈 가져오기
import 'firebase/compat/firestore'

// 파이어스토어 DB를 초기화
firebase.initializeApp({
  projectId: "pwa-offline-sync",
});
// 파이어스토어 스토어 오프라인 캐시 사용
export const oPicturesinDB = firebase.firestore()
oPicturesinDB.enablePersistence({
  synchronizeTabs: true // 브라우저 열린 탭과 동기화
}).catch(err => console.log(err))