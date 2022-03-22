<template>
  <v-container>
    <v-main>
        <div class="text-center display-1 my-4">서브 페이지입니다.</div>
        <v-divider></v-divider>
        <!-- store에 있는 sTitle 값을 가져와 표시함 -->
        <div class="text-center display-3 my-4">{{ sTitle }}</div>
        <div class="text-center">
          <v-btn fab large class="mt-5" color="teal" dark to="/main">
            <v-icon>mdi-replay</v-icon>
          </v-btn>
        </div>
    </v-main>
  </v-container>
</template>

<script>
  export default {
    // store에 있는 fnGetData 함수를 호출하여 sTitle 값을 가져옴
    data() {
      return {
        sTitle: this.$store.getters.fnGetData,
      }
    }
  }
</script>