<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, reactive, Ref, ref, watch } from "vue";
import { useStore } from "vuex";
import { checkAccess } from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
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

const onLogout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code == 0) {
    message.success("登出成功");
    window.location.reload();
  } else {
    message.error("登出失败：" + res.message);
  }
};
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
        <div v-if="store.state.user.loginUser.userName == '未登录'">
          <a-button
            status="normal"
            type="primary"
            @click="router.push('/user/login')"
            >登录</a-button
          >
        </div>
        <div v-else style="display: flex; flex-direction: column">
          <div style="justify-content: center; display: flex">
            {{ store.state.user.loginUser.userName }}
          </div>
          <a-button
            style="
              justify-content: center;
              margin-top: 10px;
              display: flex;
              margin-left: 20px;
              margin-right: 20px;
            "
            type="primary"
            status="danger"
            @click="onLogout"
            >登出</a-button
          >
        </div>
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
