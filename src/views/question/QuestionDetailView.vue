<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVo,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
interface Props {
  id: number;
}
//从当前路由取到id
const props = withDefaults(defineProps<Props>(), { id: 1 });

const question = ref<QuestionVo>();
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("404");
  }
};
onMounted(() => {
  loadData();
});
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
  questionId: props.id,
});
const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
    form.value
  );
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败:" + res.message);
  }
};
const onChangeCode = (v: string) => {
  form.value.code = v;
};
</script>

<template>
  <div id="QuestionDetailView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card
              hoverable
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
              size="small"
            >
              <h2>{{ question?.title ?? "" }}</h2>
              <a-space wrap>
                <a-tag
                  v-for="(tag, index) of question?.tags"
                  :key="index"
                  color="green"
                >
                  {{ tag }}
                </a-tag>
              </a-space>
            </a-card>
            <a-card>
              <a-descriptions title="判题限制" :column="{ xs: 1, md: 2 }">
                <a-descriptions-item :label="'TimeLimit(ms)'">
                  <a-tag>{{ question?.judgeConfig?.timeLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item :label="'MemoryLimit(kb)'">
                  <a-tag>{{ question?.judgeConfig?.memoryLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item :label="'StackLimit(kb)'">
                  <a-tag>{{ question?.judgeConfig?.stackLimit }}</a-tag>
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
            <a-card hoverable>
              <MdViewer :value="question?.content ?? ''" />
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled></a-tab-pane>
          <a-tab-pane key="answer" title="题解" disabled> </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-select
          :style="{ width: '160px' }"
          placeholder="Select Language"
          v-model="form.language"
          :trigger-props="{ autoFitPopupMinWidth: true }"
        >
          <a-option>java</a-option>
          <a-option>go</a-option>
          <a-option>cpp</a-option>
        </a-select>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="onChangeCode"
        ></CodeEditor>
        <a-button
          @click="doSubmit"
          type="primary"
          style="min-width: 120px; display: flex; margin: 20px auto 0"
          >提交</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<style scoped></style>
