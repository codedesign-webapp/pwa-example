<!-- 첫 화면에 표시될 내용 마크업 -->
<template>
  <div id="app">
    <h1>안녕하세요!</h1>
    <!-- 라우터 컴포넌트에 연결된 컴포넌트가 렌더링 됨-->
    <router-view></router-view>
    <hr>
    <p>라우터링크 사용:
      <router-link to="/main">메인 페이지</router-link>
      <router-link to="/sub">서브 페이지</router-link>
    </p>
  </div>
</template>