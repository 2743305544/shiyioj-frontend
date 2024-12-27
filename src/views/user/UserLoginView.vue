<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form: UserLoginRequest = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    alert("登录成功" + JSON.stringify(res.data));
    await store.dispatch("/user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败：" + res.message);
  }
};
</script>

<template>
  <div id="userLoginView">
    <a-tag color="blue" size="large" style="margin-bottom: 20px"
      >用户登录</a-tag
    >
    <a-form
      label-align="left"
      :model="form"
      :style="{ width: '400px' }"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.userPassword" placeholder="输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 90px"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#userLoginView {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}
</style>
