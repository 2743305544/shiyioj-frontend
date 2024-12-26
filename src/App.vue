<template>
  <div id="app">
    <BasicLayout></BasicLayout>
  </div>
</template>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
const router = useRouter();
const store = useStore();

const doInit = () => {
  console.log("doInit");
};
onMounted(() => {
  doInit();
});
router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    // console.log(store.state.user.loginUser.role);
    if (store.state.user.loginUser.role !== "admin") {
      next("/404");
      return;
    }
  }
  next();
});
</script>
<style>
#app {
}
</style>
