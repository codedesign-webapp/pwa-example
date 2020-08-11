<template>
   <v-container>
      <v-row>
         <v-col offset="2" cols="8" class="text-center mt-2">
            <!-- 업로드할 이미지와 제목을 12개의 이미지 중에서 랜덤으로 준비함 -->
            <form @submit.prevent="fnSubmitPost()">
               <v-card>
                  <v-img height="200px" :src="sPicUrl">
                  </v-img>
               </v-card>
               <!-- 입력받은 제목을 DB에 저장함 -->
               <v-text-field v-model="sTitle" autofocus label="사진 제목"></v-text-field>
               <v-btn color="primary" dark type="submit">
                  <v-icon left>file_upload</v-icon>
                  업로드
               </v-btn>
            </form>
         </v-col>
         <!-- 반응형 웹으로 표시하도록 열의 개수 구간 설정 -->
         <v-col class="mt-5" cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in this.oPictures" :key=item.key>
            <v-card class="py-2 px-2">
               <!-- 사진의 이미지와 제목을 바인딩하여 표시 -->
               <v-img :src="item.url" height="200px">
                  <v-container>
                     <v-row>
                        <v-col cols="12" class="text-center">
                           <span class="title grey white--text">{{item.title}}</span>
                        </v-col>
                     </v-row>
                  </v-container>
               </v-img>
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- 삭제 아이콘을 클릭하면 DB에서 제거함 -->
                  <v-btn icon @click="fnDelPost(item.id)">
                     <v-icon>delete</v-icon>
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-col>
         <v-col cols="12" class="mt-5 text-center">
            <!-- 만약에 업로드된 이미지가 없으면 안내 문구 표시-->
            <p v-if="!oPictures.length">사진이 없습니다. 추가해 주세요!</p>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
   // JSON 파일로 부터 이미지 정보 가져옴
   import oPictureData from '@/datasources/picture-data'
   import {
      oPicturesinDB
   } from '@/datasources/firebase'
   export default {
      name: 'sync_page',
      data() {
         return {
            // JSON 파일의 이미지 객체 사용할 배열 변수
            aPicsData: oPictureData.aPictures,
            oPictures: [], // DB 저장에 사용할 객체 변수
            sTitle: '', // 제목 입력에 사용할 변수
            sPicUrl: '' // 이미지 URL 저장에 사용할 변수
         }
      },
      firestore() {
         return {
            // 파이어스토어DB의 이미지 정보를 날짜 순으로 정렬하여 준비
            oPictures: oPicturesinDB.collection('pictures').orderBy('newdate')
         }
      },
      created() {
         // 처음 컴포넌트가 생성되면 업로드할 제목과 사진 준비
         this.fnPreparePost()
      },
      methods: {
         fnPreparePost() {
            // JSON 파일에서 사진 정보를 랜덤으로 읽어와서 사진과 포스트글 준비
            let nIndex = Math.floor(Math.random() * 12)
            const itemPic = this.aPicsData[nIndex]
            this.sTitle = itemPic.title
            this.sPicUrl = itemPic.url
         },
         // 입력받은 정보를 DB에 저장함
         fnSubmitPost() {
            const dtDate = new Date() // 오늘 날짜 저장
            // DB에 날짜, 제목, 이미지 주소 업로드
            oPicturesinDB.collection('pictures').add({
               'newdate': dtDate,
               'title': this.sTitle,
               'url': this.sPicUrl
            })
            // 새로운 이미지와 제목 준비함
            this.fnPreparePost()
         },
         fnDelPost(pID) {
            // 매개변수로 받은 ID의 항목을 DB에서 제거
            oPicturesinDB.collection('pictures').doc(pID).delete()
         }
      }
   }
</script>