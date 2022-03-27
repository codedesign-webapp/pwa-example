// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/compat/app'
// 파이어베이스 패키지 모듈 가져오기
import 'firebase/compat/auth'
import router from '@/router'

export default {
  state: {
    oUser: null // 사용자 정보를 담을 객체
  },
  mutations: {
    // 사용자 객체를 저장
    fnSetUser(state, payload) {
      state.oUser = payload
    }
  },
  getters: {
    // 사용자 객체를 반환
    fnGetUser(state) {
      return state.oUser
    },
    // 사용자 객체의 값의 유무로 로그인 여부 반환
    fnGetAuthStatus(state) {
      return (state.oUser != null)
    }
  },
  actions: {
    // 이메일 회원 가입 처리
    fnRegisterUser({
      commit
    }, payload) {
      commit('fnSetLoading', true) // 스토어에 시간걸림으로 상태 변경
      // 파이어베이스에 이메일 회원 생성 및 저장
      firebase.auth().createUserWithEmailAndPassword(payload.pEmail,
          payload.pPassword)
        .then(pUserInfo => {
          // 신규 회원 이메일 정보를 스토어에 저장
          commit('fnSetUser', {
            email: pUserInfo.user.email  // <-- 파이어베이스 v9 마이그레이션 : user 추가
          })
          commit('fnSetLoading', false) // 스토어에 시간완료 상태 변경
          commit('fnSetErrorMessage', '') // 스토어 에러메시지 초기화
          router.push('/main') // 로그인 후 첫 화면으로 이동
        })
        .catch(err => {
          commit('fnSetErrorMessage', err.message)
          commit('fnSetLoading', false)
        })
    },
    // 이메일 회원 로그인
    fnDoLogin({
      commit
    }, payload) {
      commit('fnSetLoading', true) // 스토어에 시간걸림으로 상태 변경
      // 파이어베이스에 이메일 회원 로그인 인증 처리 요청
      firebase.auth().signInWithEmailAndPassword(payload.pEmail,
          payload.pPassword)
        .then(pUserInfo => {
          // 로그인이 성공하면 스토어에 계정정보 저장
          commit('fnSetUser', {
            id: pUserInfo.user.uid,           // <-- 파이어베이스 v9 마이그레이션 : user 추가
            name: pUserInfo.user.displayName, // <-- 파이어베이스 v9 마이그레이션 : user 추가
            email: pUserInfo.user.email,      // <-- 파이어베이스 v9 마이그레이션 : user 추가
            photoURL: pUserInfo.user.photoURL // <-- 파이어베이스 v9 마이그레이션 : user 추가
          })
          commit('fnSetLoading', false) // 시간걸림 상태 해제
          commit('fnSetErrorMessage', '') // 에러메세지 초기화
          router.push('/main') // 로그인 후 화면으로 이동
        })
        .catch(err => {
          commit('fnSetErrorMessage', err.message)
          commit('fnSetLoading', false)
        })
    },
    // 구글 계정 회원 로그인(팝업)
    fnDoGoogleLogin_Popup({
      commit
    }) {
      commit('fnSetLoading', true) // 스토어에 시간걸림으로 상태 변경
      // 파이어베이스에 구글 회원 로그인 인증 처리 요청
      // 로그인제공자객체를 생성
      var oProvider = new firebase.auth.GoogleAuthProvider();
      // 오픈 계정의 범위를 설정합니다. 
      // https://developers.google.com/identity/protocols/googlescopes
      oProvider.addScope('profile');
      oProvider.addScope('email');
      firebase.auth().signInWithPopup(oProvider)
        .then(pUserInfo => {
          // 로그인이 성공하면 스토어에 계정정보 저장
          commit('fnSetUser', {
            id: pUserInfo.user.uid,            // <-- 파이어베이스 v9 마이그레이션 : user 추가
            name: pUserInfo.user.displayName,  // <-- 파이어베이스 v9 마이그레이션 : user 추가
            email: pUserInfo.user.email,       // <-- 파이어베이스 v9 마이그레이션 : user 추가
            photoURL: pUserInfo.user.photoURL  // <-- 파이어베이스 v9 마이그레이션 : user 추가
          })
          commit('fnSetLoading', false) // 시간걸림 상태 해제
          commit('fnSetErrorMessage', '') // 에러메세지 초기화
          router.push('/main') // 로그인 후 화면으로 이동
        })
        .catch(err => {
          commit('fnSetErrorMessage', err.message)
          commit('fnSetLoading', false)
        })
    },
    // 자동 로그인 처리
    fnDoLoginAuto({
      commit
    }, pUserInfo) {
      // 자동 로그인 시 스토어에 계정정보 저장
      commit('fnSetUser', {
        id: pUserInfo.uid,
        name: pUserInfo.displayName,
        email: pUserInfo.email,
        photoURL: pUserInfo.photoURL
      })
      commit('fnSetLoading', false) // 시간걸림 상태 해제
      commit('fnSetErrorMessage', '') // 에러메세지 초기화  
    },
    // 로그아웃 처리
    fnDoLogout({
      commit
    }) {
      // 파이어베이스에 로그아웃 요청
      firebase.auth().signOut()
      commit('fnSetUser', null) // 스토어에 계정정보 초기화
      router.push('/') // 첫 화면으로 이동
    }
  }
}