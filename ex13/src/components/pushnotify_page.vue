<template>
  <v-container>
    <v-row wrap>
      <!-- 상단에 제목 표시 -->
      <v-col cols="12" class="text-center">
        <h1 class="display-1">메시지 보내기</h1>
      </v-col>
      <v-col class="my-3" offset="1" cols="10">
        <!-- 카드 UI 안에 입력 컨트롤 배치 -->
        <v-card color="blue-grey lighten-1" dark>
          <!-- 중간 영역에 제목과 내용 입력 받음 -->
          <v-container class="my-3">
            <!-- 한 행에 하나의 항목 표시를 위해 column 어트리뷰트 사용 -->
            <v-row>
              <v-col cols="12">
                <v-text-field autofocus name="title" label="제목" type="text" v-model="sTitle" color="white">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- rows와 multi-line 어트리뷰트 사용으로 3줄 입력컨트롤로
										변경 -->
                <v-textarea rows="3" name="message" label="내용" type="text" v-model="sMsg" color="white"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <!-- block 어트리뷰트 사용으로 하단에 발송 블록레벨 버튼 표시 -->
            <v-btn block large color="orange" dark @click="fnSendPush">
              <v-icon left>message</v-icon>발 송
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        sTitle: '', // 제목을 저장할 임시 변수
        sMsg: '' // 내용을 저장할 임시 변수
      }
    },
    methods: {
      fnSendPush() {
        // 발송할 내용 JSON 형식으로 변경
        const PreparedData = JSON.stringify({
          pTitle: this.sTitle,
          pMsg: this.sMsg
        })
        // 파이어스토어 함수 실행
        fetch('https://us-central1-pwa-notification-push.cloudfunctions.net/storePushData', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: PreparedData
        }).catch(err => console.log('오류!' + err.message));
      }
    }
  }
</script>