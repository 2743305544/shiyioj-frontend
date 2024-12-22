<script setup lang="ts"></script>

<template>
  <div id="BasicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">导航栏</a-layout-header>
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
#BasicLayout {
}
#BasicLayout .header {
  background: red;
}
#BasicLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
}
#BasicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
