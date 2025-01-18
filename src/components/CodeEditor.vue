<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw } from "vue";
import { withDefaults, defineProps } from "vue";
const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("Hello, world!");
interface Props {
  value: string;
  handleChange: (v: string) => void;
}
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
onMounted(() => {
  if (!codeEditorRef.value) return;
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    minimap: {
      enabled: true,
    },
    language: "java",
    automaticLayout: true,
    theme: "vs-dark",
    lineNumbers: "on",
    readOnly: false,
    colorDecorators: true,
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>

<style scoped></style>
