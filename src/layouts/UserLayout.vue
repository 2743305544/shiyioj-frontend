<script setup lang="ts"></script>

<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh" :wrap="false">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="@/assets/oj-logo.jpg" />
          <div style="margin-top: 16px; font-size: 16px">ShiYi OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/2743305544/shiyioj-frontend" target="_blank"
          >ShiYiOJ by shiyi</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
}
#userLayout .header {
  margin-bottom: 16px;
}
#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(190, 190, 190),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}
#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.logo {
  margin-left: 5px;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
