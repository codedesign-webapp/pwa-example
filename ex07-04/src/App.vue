<template>
  <v-app>
    <!-- 툴바테마를 primary(파랑색)로 설정합니다. -->
    <v-app-bar app color="primary" dark>
      <!-- 좌측에 메뉴 아이콘 넣음 -->
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>멀티 페이지</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- 내용영역에 라우터 페이지 렌더링 -->
    <v-main>
      <!-- 페이지 장면전환 효과 넣기 -->
      <v-slide-x-transition mode="out-in">
        <router-view></router-view>
      </v-slide-x-transition>
    </v-main>
    <!-- 툴바테마를 secondary로 설정합니다. -->
    <v-footer color="secondary" fixed dark>
      <div class="mx-auto">CODE-DESIGN.web.app</div>
    </v-footer>
  </v-app>
</template>