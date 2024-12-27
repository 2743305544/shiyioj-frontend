<template>
  <div id="app">
    <BasicLayout></BasicLayout>
  </div>
</template>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";

import { onMounted } from "vue";

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
