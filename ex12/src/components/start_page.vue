<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center mt-5">
        <h1 class="display-1 my-1">시작화면 페이지</h1>
        <p class="body-1">로그인 없이 방문자 누구나 접속 가능한 페이지입니
          다.</p>
        <!-- 시간지연의 경우 회전 프로그레스 원 표시 -->
        <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="grey lighten-1">
        </v-progress-circular>
      </v-col>
      <v-col offset="3" cols="6" class="text-center mt-5">
        <!-- 구글 계정 로그인 버튼 표시 및 처리 -->
        <v-btn @click="fnDoGoogleLogin_Popup" block outlined color="red" large dark>
          <!-- 머티리얼디자인아이콘 사용 시 아이콘 이름에 'mdi-' 붙임 -->
          <v-icon left color="red">mdi-google</v-icon>
          구글 로그인
        </v-btn>
      </v-col>
      <v-col offset="3" cols="6" class="text-center mt-5">
        <!-- 이메일 계정 로그인 버튼 표시 및 처리 -->
        <v-btn to="/login" block color="red" large dark>
          <v-icon left>mdi-email</v-icon>
          이메일 로그인
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    methods: {
      fnDoGoogleLogin_Popup() { // 스토어에 구글계정 로그인 처리 요청
        this.$store.dispatch("fnDoGoogleLogin_Popup")
      }
    },
    computed: {
      // 시간지연상태 스토어에서 읽어서 반환
      fnGetLoading() {
        return this.$store.getters.fnGetLoading
      }
    },
  }
</script>