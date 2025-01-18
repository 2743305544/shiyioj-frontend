<script setup lang="ts">
import { ref } from "vue";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { defineProps, withDefaults } from "vue";
import { Editor } from "@bytemd/vue-next";
interface Props {
  value: string;
  handleChange: (v: string) => void;
}
// 定义插件
const plugins = [
  gfm(),
  highlight(),
  // 可以在这里添加更多插件
];
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
// 定义响应式变量
// const value = ref("");

// 定义事件处理函数
// const handleChange = (v: string) => {
//   value.value = v;
// };
</script>

<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
