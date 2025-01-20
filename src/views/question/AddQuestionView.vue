<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  answer: "暴力",
  content: "暴力",
  judgeCase: [
    {
      input: "1 2",
      output: "3 4",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: ["栈", "简单"],
  title: "A + B",
});
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
const doSubmit = async () => {
  console.log(form);
  const res = await QuestionControllerService.addQuestionUsingPost(form);
  if (res.code === 0) {
    message.success("添加成功");
  } else {
    message.error("添加失败：" + res.message);
  }
};
const onContentChange = (v: string) => {
  form.content = v;
};
const onAnswerChange = (v: string) => {
  form.answer = v;
};
</script>

<template>
  <div id="addQuestionView">创建题目</div>
  <a-form :model="form">
    <a-form-item field="title" label="标题">
      <a-input
        v-model="form.title"
        style="width: 480px"
        placeholder="请输入标题"
      />
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag
        v-model="form.tags"
        :style="{ width: '480px' }"
        placeholder="请选择标签"
        allow-clear
      />
    </a-form-item>
    <a-form-item field="content" label="题目内容">
      <MdEditor
        style="min-width: 90%"
        :value="form.content"
        :handle-change="onContentChange"
      ></MdEditor>
    </a-form-item>
    <a-form-item field="answer" label="答案">
      <MdEditor
        style="min-width: 90%"
        :value="form.answer"
        :handle-change="onAnswerChange"
      ></MdEditor>
    </a-form-item>
  </a-form>
  <a-form-item
    :content-flex="false"
    :merge-props="false"
    extra="Created By ShiYi"
  >
    <a-row :gutter="8">
      <a-col :span="12" align="center">
        <a-form-item
          label="判题配置"
          :content-flex="false"
          :merge-props="false"
        >
          <a-space direction="vertical">
            <a-form-item
              field="JudgeConfig.memoryLimit"
              label="时间限制"
              style="min-width: 480px"
            >
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                placeholder="设置最大内存"
                mode="button"
                size="large"
                class="input-demo"
                min="0"
              />
            </a-form-item>
            <a-form-item
              field="JudgeConfig.stackLimit"
              label="堆栈限制"
              style="min-width: 480px"
            >
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                placeholder="设置堆栈限制"
                mode="button"
                size="large"
                class="input-demo"
                min="0"
              />
            </a-form-item>
            <a-form-item
              field="JudgeConfig.memoryLimit"
              label="内存限制"
              style="min-width: 480px"
            >
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                placeholder="设置时间设置"
                mode="button"
                size="large"
                class="input-demo"
                min="0"
              />
            </a-form-item>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
    <div>测试用例</div>
    <a-form-item
      v-for="(judgeCaseItem, index) of form.judgeCase"
      :label="`测试用例-${index}`"
      :key="index"
      style="margin-left: 150px"
    >
      <div class="layout-vertical">
        <a-form-item
          :field="`judgeCaseItem[${index}].input`"
          :label="`输入用例-${index}`"
          :key="index"
        >
          <a-input
            v-model="judgeCaseItem.input"
            placeholder="please enter your input..."
          />
        </a-form-item>
        <a-form-item
          :field="`judgeCaseItem[${index}].output`"
          :label="`输出用例-${index}`"
          :key="index"
        >
          <a-input
            v-model="judgeCaseItem.output"
            placeholder="please enter your output..."
          />
        </a-form-item>
      </div>

      <a-button
        status="danger"
        @click="handleDelete(index)"
        :style="{ marginLeft: '10px', marginBottom: '20px' }"
        >Delete</a-button
      >
    </a-form-item>
    <div style="margin-left: 120px">
      <a-button @click="handleAdd" type="outline" status="success"
        >新增测试用例</a-button
      >
    </div>
    <a-space direction="vertical"></a-space>
    <div class="layout-center">
      <a-form-item>
        <a-button type="primary" @click="doSubmit">Submit</a-button>
      </a-form-item>
    </div>
  </a-form-item>
</template>

<style scoped>
.border {
  border-image-source: radial-gradient(
    60% 60%,
    transparent 0px,
    transparent 100%,
    cyan 100%
  );
  border-image-slice: 1;
  border-width: 1px;
  border-style: solid;
  border-image-outset: 1cm;
}
.layout-vertical {
  display: flex;
  flex-direction: column;
  min-width: 800px;
}
.layout-center {
  justify-content: center;
  margin-left: 400px;
}
</style>
