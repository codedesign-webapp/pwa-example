<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="py-3 px-3">
          <!-- contain 속성을 사용해서 세부 사진을 컨테이너 크기에 맞도록 자동으로 조절하여 표시함 -->
          <v-img height="450px" contain :src="this.itemPic.url">
          </v-img>
          <!-- 제목이 있는 경우만 하단에 제목과 내용 표시 -->
          <v-card-text v-if="this.itemPic.title">
            <h1 class="headline mt-1 text-center">{{ this.itemPic.title }}</h1>
            <p class="body-1 mt-1 text-center">{{ this.itemPic.info }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-3 text-center">
        <!-- 현재 사진을 삭제하는 버튼 처리 -->
        <v-btn color="grey" fab dark @click="fnDeleteItem( )">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // 파이어베이스에서 DB와 스토리지 객체 가져옴
  import {
    oStorage,
    oPicturesinDB
  } from '@/datasources/firebase'
  export default {
    name: 'App',
    // 파이어베이스와 연결된 뷰파이어 oPictures 객체 준비
    firebase: {
      oPictures: oPicturesinDB
    },
    data() {
      return {
        oPictures: [], // 사진 데이터 저장 변수
        itemPic: null, // 검색 결과 항목을 저장할 객체변수
      }
    },
    created() {
      // 라우터의 매개변수로 전달된 항목 ID 값 읽기
      const itemID = this.$route.params.p_id
      // find 검색기능으로 파이어베이스에서 해당 ID 항목 검색 및 저장
      this.itemPic = this.oPictures.find(item => item['.key'] === itemID)
    },
    methods: {
      fnDeleteItem() {        
        // 파이어베이스 DB의 사진 항목 삭제
        oPicturesinDB.child(this.itemPic['.key']).remove()
        // 스토리지에 이미지가 존재할 경우(카메라 사용)만 삭제
        if (this.itemPic['filename']) oStorage.ref('images').child(this.itemPic['filename']).delete()
        // 홈화면으로 이동
        this.$router.push('/');        
      }
    }
  }
</script>