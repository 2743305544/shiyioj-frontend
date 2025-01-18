<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <MdEditor :value="value" :handle-change="onChange"></MdEditor>
    <CodeEditor :value="value2" :handle-change="onChange2"></CodeEditor>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue"; // @ is an alias to /src
const value = ref();
const value2 = ref();
const onChange = (v: string) => {
  value.value = v;
};
const onChange2 = (v: string) => {
  value2.value = v;
  console.log(v);
};
</script>
<style scoped></style>
