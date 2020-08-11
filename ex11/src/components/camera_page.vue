<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <!-- 카메라 영상 부분을 표시 -->
        <video ref="rVideo" class="style_video"></video>
      </v-col>
      <v-col cols="12" class="mt-5 text-center">
        <!-- 만약에 업로드된 이미지가 없으면 안내 문구 표시-->
        <p>현재 iOS는 지원하지 않습니다.</p>
      </v-col>
    </v-row>
    <div class="text-center my-3">
      <!-- 카메라 캡처 버튼을 영상 하단 중앙에 위치 -->
      <v-btn v-if="!this.bIsWait" color="red" fab dark bottom @click="fnCameraCapture( )">
        <v-icon>camera</v-icon>
      </v-btn>
      <v-progress-circular v-if="this.bIsWait" :size="50" indeterminate color="grey"></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
  // 파이어베이스에서 DB와 스토리지 객체 가져옴
  import {
    oStorage,
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
        oVideoStream: null, // 카메라 영상 스트림을 저장할 객체변수
        bIsWait: false
      }
    },
    mounted() {
      // Web API를 통해서 사용자 카메라의 접근(영상 only)을 요청함
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(pVideoStream => {
        // 카메라 영상 스트림 정보를 oVideoStream에 저장함
        this.oVideoStream = pVideoStream
        // 카메라 영상 스트림 정보를 video 엘리먼트에 표시함
        this.$refs.rVideo.srcObject = pVideoStream
        this.$refs.rVideo.play()
      }).catch(function (err) {
        console.log(err)
      })
    },
    destroyed() {
      // 현재 화면을 종료할 경우 현재 재생되는 영상 트랙을 찾아 종료시킴
      const oTrack = this.oVideoStream.getTracks()
      oTrack.map(pTrack => pTrack.stop())
    },
    methods: {
      fnCameraCapture() {
        this.bIsWait = true
        // 현재 재생되는 트랙을 찾아 스틸이미지로 캡처함
        const oVideoTrack = this.oVideoStream.getVideoTracks()[0]
        let oCapturedImage = new window.ImageCapture(oVideoTrack)
        const options = {
          imageHeight: 359,
          imageWidth: 640,
          fillLightMode: 'off'
        };
        const self = this
        // 캡처된 이미지를 파이어베이스 DB와 스토리지에 저장함
        return oCapturedImage.takePhoto(options).then(pImageData => {
          // 영상 정지
          const oTrack = self.oVideoStream.getTracks()
          oTrack.map(pTrack => pTrack.stop())
          console.log('캡처: ' + pImageData.type + ', ' + pImageData.size + '바이트');
          // 저장할 이미지 파일이름으로 사용할 ID 준비
          const nID = new Date().toISOString()
          // 파이어베이스 스토리지에 이미지 파일 저장
          let uploadTask = oStorage.ref('images').child('pic' + nID).put(pImageData)
          uploadTask.on('state_changed', function (snapshot) {
            // state_changed 이벤트를 통해서 얼만큼의 바이트가 업로드 중인지 콘솔에 표시
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('업로드: ' + progress + '% 완료', snapshot.state);
          }, function (error) {
            console.log(error)
            // 오류 발생 시 콘솔에 표시
          }, function () {
            // 성공적으로 업로드 완료 후 파이어베이스 DB에 정보 저장
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('업로드URL:', downloadURL);
              oPicturesinDB.push({
                  'url': downloadURL,
                  'title': '',
                  'info': '',
                  'filename': 'pic' + nID
                })
                .then(self.$router.push('/')) // 저장 후 홈 화면으로 이동
            });
          });
        })
      }
    }
  }
</script>

<style>
  /* 카메라 영상의 너비값을 브라우저 너비에 맞춤 */
  .style_video {
    width: 100%
  }
</style>