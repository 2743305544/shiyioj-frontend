<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";
import { withDefaults, defineProps } from "vue";
const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("Hello, world!");
interface Props {
  value: string;
  language: string;
  handleChange?: (v: string) => void;
}
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});
watch(
  () => props.language,
  (newVal) => {
    monaco.editor.setModelLanguage(toRaw(codeEditor.value.getModel()), newVal);
  }
);
watch(
  () => props.value,
  (newVal) => {
    toRaw(codeEditor.value.getModel()).setValue(newVal);
  }
);
onMounted(() => {
  if (!codeEditorRef.value) return;
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    minimap: {
      enabled: true,
    },
    language: props.language,
    automaticLayout: true,
    theme: "vs-dark",
    lineNumbers: "on",
    readOnly: true,
    colorDecorators: true,
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 800px"></div>
</template>

<style scoped></style>
