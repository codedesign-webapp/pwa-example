import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Vuex의 store 중앙에 state, mutations(setters), getters을 정의함
export default new Vuex.Store({
  // sTitle 값을 상태값으로 정의
  state: {
    sTitle: ''
  }, 
  // mutations는 getters의 대칭되는 setters의 역할을 설정
  mutations: {
    // 매개변수로 전달받은 값을 store에 저장
    fnSetData: function (state, payload) {
      return state.sTitle = payload
    }
  }, 
  getters: {
    // store의 상태값을 반환함
    fnGetData(state) {
      return state.sTitle;
    },
  } 
}) 