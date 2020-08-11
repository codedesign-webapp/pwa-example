<template>
  <v-container>
    <!-- 첫 번째 행에는 사진 표시 -->
    <v-row mt-4>
      <v-col offset="1" cols="10">
        <v-card>
          <v-img height="200px" :src="this.sPicUrl">
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <!-- 두 번째 행에는 기본 제목을 표시하고 수정할 수 있도록 함 -->
    <v-row mt-5>
      <v-col offset="2" cols="8">
        <!-- autofocus 어트리뷰트를 사용해서 기본 포커스 지정 -->
        <v-text-field name="title" label="사진 제목" v-model="sTitle" autofocus></v-text-field>
      </v-col>
    </v-row>
    <!-- 세 번째 행에는 기본 내용을 표시하고 수정할 수 있도록 함 -->
    <v-row>
      <v-col offset="2" cols="8">
        <!-- 3줄로 편집 제한 -->
        <v-text-field name="info" label="사진 설명" v-model="sInfo" multi-line rows="3"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="orange" dark large @click="fnSubmitPost( )">업로드</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // JSON 파일로 부터 이미지 정보 가져옴
  import oPictureData from '@/datasources/picture-data'
  // 파이어베이스에서 DB 객체 가져옴
  import {
    oPicturesinDB
  } from '@/datasources/firebase'
  export default {
    // 파이어베이스와 연결된 뷰파이어 oPictures 객체 준비
    firebase: {
      oPictures: oPicturesinDB
    },
    data() {
      return {
        oPictures: [], // 사진 데이터 저장 변수
        // 초기값으로 JSON 파일의 이미지 배열 저장
        aPictures: oPictureData.aPictures,
        sTitle: '',
        sInfo: '',
        sPicUrl: ''
      }
    },
    mounted() {
      // JSON 파일에서 사진 정보를 랜덤으로 읽어와서 사진과 포스트글 준비
      let nIndex = Math.floor(Math.random() * 12)
      const itemPic = this.aPictures[nIndex]
      this.sTitle = itemPic.title
      this.sInfo = itemPic.info
      this.sPicUrl = itemPic.url
    },
    methods: {
      fnSubmitPost() {
        // DB에 저장하고 홈화면으로 이동
        oPicturesinDB.push({
          'url': this.sPicUrl,
          'title': this.sTitle,
          'info': this.sInfo
        }).then(this.$router.push('/'))
      }
    }
  }
</script>