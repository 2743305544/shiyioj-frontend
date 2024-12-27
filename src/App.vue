<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayout></BasicLayout>
    </template>
  </div>
</template>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const doInit = () => {
  console.log("doInit");
};
onMounted(() => {
  doInit();
});
</script>
<style>
#app {
}
</style>
