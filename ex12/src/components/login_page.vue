<template>
  <v-container flow>
    <v-row>
      <v-col cols="12" class="text-center my-5">
        <h1 class="display-1">로그인 페이지</h1>
      </v-col>
    </v-row>
    <v-row>
      <!-- 반응형에 따라 다르게 너비 조절 -->
      <v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
        <!-- 양식의 입력이 제출 되면 페이지를 다시 로드 하지 않도록 prevent 
					사용 -->
        <form @submit.prevent="fnDoLogin">
          <!-- 필수 입력사항이 되도록 required 어트리뷰트 적용 -->
          <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required>
          </v-text-field>
          <v-text-field name="Password" label="비밀번호" type="password" v-model="sPassword" required>
          </v-text-field>
          <!-- 시간지연상태인 경우 버튼은 사라지게 함 -->
          <v-btn type="submit" v-if="!fnGetLoading" color="orange" dark>
            로그인
          </v-btn>
          <!-- 시간지연의 경우 회전 프로그레스 원 표시 -->
          <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="grey lighten-1">
          </v-progress-circular>
          <!-- 오류 메시지가 있을 경우 표시 -->
          <v-alert class="mt-3" type="error" dismissible v-model="bAlert">
            {{ fnGetErrMsg }}
          </v-alert>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        bAlert: false, // 오류 메시지 표시 여부
        sEmail: '', // 이메일 입력값 임시 저장
        sPassword: '' // 비밀번호 입력값 임시 저장
      }
    },
    computed: {
      // 오류메시지 스토어에서 읽어서 반환
      fnGetErrMsg() {
        return this.$store.getters.fnGetErrorMessage;
      },
      // 시간지연상태 스토어에서 읽어서 반환
      fnGetLoading() {
        return this.$store.getters.fnGetLoading;
      }
    },
    methods: {
      // 스토어에 이메일 로그인 처리 요청
      fnDoLogin() {
        this.$store.dispatch('fnDoLogin', {
          pEmail: this.sEmail,
          pPassword: this.sPassword
        })
      }
    },
    watch: {
      // fnGetErrMsg 함수가 오류메시지를 반환하면 오류 메시지 표시
      fnGetErrMsg(pMsg) {
        if (pMsg) this.bAlert = true;
      },
      // bAlert 값이 false로 바뀌면 오류메시지 초기화
      bAlert(pValue) {
        if (pValue == false) this.$store.commit('fnSetErrorMessage', '');
      }
    }
  }
</script>