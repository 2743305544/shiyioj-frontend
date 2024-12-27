<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, reactive, Ref, ref, watch } from "vue";
import { useStore } from "vuex";
import { checkAccess } from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
const router = useRouter();

const selectedKeys: Ref<string[]> = ref<string[]>(["/"]);
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const store = useStore();
// console.log(store.state.user.loginUser);
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "失意",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const visibleRouters = computed(() => {
  return routes.filter((item: any) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return checkAccess(store.state.user.loginUser, item?.meta?.access);
  });
});

setTimeout(() => {
  console.log(visibleRouters.value);
}, 4000);
</script>

<template>
  <div>
    <a-row id="globalHeader" align="center">
      <!--      <a-col flex="100px"> </a-col>-->
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="@/assets/oj-logo.jpg" alt="logo" />
              <div class="title">ShiYi OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRouters" :key="item.path">{{
            item.name
          }}</a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  margin-left: 10px;
  color: #444;
}
.logo {
  height: 48px;
  width: 48px;
  border-radius: 50%;
}
</style>
