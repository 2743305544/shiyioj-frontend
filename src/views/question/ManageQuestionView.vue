<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import type { QuestionQueryRequest } from "../../../generated";
import type { QuestionAllVo } from "../../../generated";
import { useRouter } from "vue-router";

const show = ref(true);

const dataList = ref<Array<QuestionAllVo>>([]);

const total = ref(0);

const searchParams = ref<QuestionQueryRequest>({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  let res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    console.log("1111111111111111111111111111" + dataList.value);
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};
onMounted(() => {
  loadData();
});

/**请求
 * {
 *   "answer": "",
 *   "content": "",
 *   "current": 0,
 *   "id": null,
 *   "pageSize": 2,
 *   "sortField": "",
 *   "sortOrder": "",
 *   "tags": [],
 *   "title": "",
 *   "userId": null
 * }
 */
/**响应
 * {
 *  "code": 0,
 *  "data": {
 *    "countId": "",
 *    "current": 0,
 *    "maxLimit": 0,
 *    "optimizeCountSql": true,
 *    "orders": [
 *      {
 *        "asc": true,
 *        "column": ""
 *      }
 *    ],
 *    "pages": 0,
 *    "records": [
 *      {
 *        "acceptNum": 0,
 *        "answer": "",
 *        "content": "",
 *        "createTime": "",
 *        "favourNum": 0,
 *        "id": 0,
 *        "judgeCase": [
 *          {
 *            "input": "",
 *            "output": ""
 *          }
 *        ],
 *        "judgeConfig": {
 *          "memoryLimit": 0,
 *          "stackLimit": 0,
 *          "timeLimit": 0
 *        },
 *        "submitNum": 0,
 *        "tags": [],
 *        "thumbNum": 0,
 *        "title": "",
 *        "updateTime": "",
 *        "userId": 0
 *      }
 *    ],
 *    "searchCount": true,
 *    "size": 0,
 *    "total": 0
 *  },
 *  "message": ""
 * }
 */
const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptNum",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const router = useRouter();
const doUpdate = (record: QuestionAllVo) => {
  router.push({
    path: "/update/question",
    query: {
      id: record.id,
    },
  });
};
const doDelete = async (record: QuestionAllVo) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败：" + res.message);
  }
};
const onPageChange = (page: number) => {
  searchParams.value.current = page;
  loadData();
};
const onSearch = async (value: string, ev: MouseEvent) => {
  if (value === "") {
    searchParams.value.id = undefined;
    loadData();
    return;
  }
  const parseInt = Number(value);
  if (!Number.isInteger(parseInt)) {
    message.error("请输入数字");
    return;
  }
  searchParams.value.id = parseInt;
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};
</script>

<template>
  <div id="manageQuestionView">
    <a-space direction="vertical" fill size="large">
      <a-input-search
        :style="{ width: '320px' }"
        placeholder="Please enter id"
        @search="onSearch"
      />
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
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="doUpdate(record)">修改</a-button>
            <a-space></a-space>
            <a-button status="danger" @click="doDelete(record)"
              >删除</a-button
            ></a-space
          >
        </template>
      </a-table>
    </a-space>
  </div>
</template>

<style scoped></style>
