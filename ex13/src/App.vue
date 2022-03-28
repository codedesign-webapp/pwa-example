<template>
  <v-app>
    <!-- 데스크톱 크기에서 탐색 서랍이 하단에 툴바 표시되도록 함. app속성은 반드시 설정해야
			하며 v-app엘리먼트 안의 내용이 적절히 표시되도로 도움. -->
    <v-navigation-drawer clipped v-model="drawer" app>
      <v-list>
        <!-- items 배열을 읽어와서 차례로 메뉴로 바인딩 하여 표시함 -->
        <v-list-item value="true" v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-action>
            <!-- html 엘리먼트의 값으로 바인딩할 때는 v-html 디렉티브 사용
							-->
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 탑색서랍이 툴바 아래에 위치할 때 메뉴 아이콘이 적절히 좌측에
			배치되도록 app과 clipped-left 어트리뷰트 지정 -->
    <v-app-bar app clipped-left fixed color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer =
				!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>푸시알림 구독</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="mt-5"></div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data() {
      // 탐색서랍과 툴바 메뉴명 항목 배열 반환
      return {
        drawer: false,
        items: [{
            icon: 'notifications',
            title: '푸시알림 등록 및 해지',
            to: '/'
          },
          {
            icon: 'sms',
            title: '푸시알림 메시지 보내기',
            to: '/pushnotify'
          }
        ]
      }
    },
    name: 'App'
  }
</script>