<script setup lang="ts">
import { ref } from "vue";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { defineProps, withDefaults } from "vue";
import { Viewer } from "@bytemd/vue-next";
interface Props {
  value: string;
}
// 定义插件
const plugins = [
  gfm(),
  highlight(),
  // 可以在这里添加更多插件
];
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<template>
  <Viewer :value="value" :plugins="plugins" style="min-height: 600px" />
</template>

<style></style>
