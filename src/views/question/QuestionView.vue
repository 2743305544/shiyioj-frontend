<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionControllerService, QuestionVo } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import type { QuestionQueryRequest } from "../../../generated";
import type { QuestionAllVo } from "../../../generated";
import { useRouter } from "vue-router";

// const show = ref(true);

const dataList = ref<Array<QuestionVo>>([]);

const total = ref(0);

const searchParams = ref<QuestionQueryRequest>({
  id: undefined,
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  let res = await QuestionControllerService.listQuestionVoByPageUsingPost(
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
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
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
/**
 * 跳转到问题详情页
 * @param record
 */
const toQuestionPage = (record: QuestionVo) => {
  router.push({
    path: "/question/" + record.id,
  });
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
  searchParams.value.current = 1;
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};
const onSearch1 = async () => {
  searchParams.value.current = 1;
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
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
      <a-space style="display: flex; justify-content: space-between">
        <a-input-search
          :style="{ width: '320px' }"
          placeholder="Please enter id"
          @search="onSearch"
        />
        <a-form :model="searchParams" :layout="'inline'">
          <a-form-item field="title" label="标题">
            <a-input
              v-model="searchParams.title"
              placeholder="please enter your title..."
            />
          </a-form-item>
          <a-form-item field="tags" label="标签">
            <a-input-tag
              style="max-width: 700px"
              v-model="searchParams.tags"
              placeholder="please enter your tags..."
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              style="border-radius: 10px"
              @click="onSearch1"
              >查询</a-button
            >
          </a-form-item>
        </a-form>
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
        <template #tags="{ record }">
          <a-space wrap>
            <a-tag
              v-for="(tag, index) of record.tags"
              :key="index"
              :color="'green'"
              >{{ tag }}</a-tag
            >
          </a-space>
        </template>
        <template #acceptedRate="{ record }">
          {{
            `${record.submitNum ? record.acceptNum / record.submitNum : "0"}(${
              record.acceptNum
            } / ${record.submitNum}
            )`
          }}
        </template>
        <template #createTime="{ record }"
          ><a-tag>{{ record.createTime }}</a-tag>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              type="primary"
              @click="toQuestionPage(record)"
              style="border-radius: 10px"
              >进入</a-button
            >
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
