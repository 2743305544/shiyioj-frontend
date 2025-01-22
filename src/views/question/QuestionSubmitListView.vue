<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitControllerService,
  QuestionSubmitQueryRequest,
  type QuestionSubmitVo,
  QuestionVo,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import type { QuestionQueryRequest } from "../../../generated";
import { useRouter } from "vue-router";
import CodeViewer from "@/components/CodeViewer.vue";

// const show = ref(true);

const dataList = ref<Array<QuestionSubmitVo>>([]);

const total = ref(0);

const searchParams = ref<QuestionSubmitQueryRequest>({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  let res =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    dataList.value = res.data.records;
    // console.log("1111111111111111111111111111" + dataList.value);
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};
onMounted(() => {
  loadData();
});
/** 响应
 * code?: string;
 *   createTime?: string;
 *   id?: number;
 *   judgeInfo?: JudgeInfo;
 *   language?: string;
 *   questionId?: number;
 *   status?: number;
 *   updateTime?: string;
 *   user?: UserVO;
 *   userId?: number;
 */
const columns = [
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "问题id",
    dataIndex: "questionId",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];
const router = useRouter();
const onPageChange = (page: number) => {
  searchParams.value.current = page;
  loadData();
};
const onSearch = async (value: string, ev: MouseEvent) => {
  if (value === "") {
    searchParams.value.userId = undefined;
    loadData();
    return;
  }
  const parseInt = Number(value);
  if (!Number.isInteger(parseInt)) {
    message.error("请输入数字");
    return;
  }
  searchParams.value.userId = parseInt;
  searchParams.value.current = 1;
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};
const visible = ref(false);

const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
const currentCode = ref({
  code: "",
  language: "",
});
const handleClick = (record: QuestionSubmitVo) => {
  visible.value = true;
  currentCode.value.code = record.code as string;
  currentCode.value.language = record.language as string;
};
</script>

<template>
  <div id="manageQuestionView">
    <a-space direction="vertical" fill size="large">
      <a-space style="display: flex; justify-content: space-between">
        <a-input-search
          :style="{ width: '320px' }"
          placeholder="Please enter id"
          @search="onSearch"
        />
      </a-space>
      <a-table
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total: total,
        }"
        @page-change="onPageChange"
      >
        <template #createTime="{ record }"
          ><a-tag>{{ record.createTime }}</a-tag>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button @click="handleClick(record)">显示</a-button>
            <a-modal
              v-model:visible="visible"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1200px"
              draggable
            >
              <template #title> 代码 </template>
              <div v-if="currentCode.code">
                <CodeViewer
                  :value="currentCode.code"
                  :language="currentCode.language"
                ></CodeViewer>
              </div>
              <div v-else>权限不足</div>
            </a-modal>
          </a-space>
        </template>
      </a-table>
    </a-space>
  </div>
</template>

<style scoped>
#manageQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
