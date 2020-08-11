<!-- 서브 페이지의 뷰화면을 디자인함 -->
<template>
  <v-container>
        <p class="display-1 my-4">서브 페이지입니다.</p>
        <v-divider></v-divider>
        <p class="display-4 my-4">서브 페이지입니다.</p>
        <div class="text-center">
          <!-- 버튼에서 fab large 어트리뷰트를 사용해서 큰 원으로 설정-->
          <v-btn fab large class="mt-5" color="teal" dark to="/main">
            <v-icon>mdi-replay</v-icon>
          </v-btn>
        </div>
  </v-container>
</template>