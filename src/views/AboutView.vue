<template>
  <a-layout class="about-container">
    <a-row justify="center">
      <a-col :span="20" :md="{ span: 16 }">
        <a-card class="about-card">
          <!-- 标题部分 -->
          <div class="header-section">
            <h1 class="title">关于本项目</h1>
            <a-divider class="divider" />
          </div>

          <!-- 项目简介 -->
          <section class="section">
            <h2 class="subtitle">项目简介</h2>
            <p class="content">
              本项目是一个基于JDK21的在线评测平台，主要面向编程竞赛和算法练习。
              系统提供代码提交、实时评测、结果反馈等功能，暂时仅支持Java编程语言。
            </p>
          </section>

          <!-- 技术栈展示 -->
          <section class="section">
            <h2 class="subtitle">技术栈</h2>
            <a-row :gutter="16">
              <a-col
                v-for="(tech, index) in technologies"
                :key="index"
                :span="12"
                :md="8"
              >
                <a-card class="tech-card" hoverable>
                  <template #actions>
                    <icon :type="tech.icon" :style="{ color: tech.color }" />
                    <span class="tech-name">{{ tech.name }}</span>
                  </template>
                </a-card>
              </a-col>
            </a-row>
          </section>

          <!-- 开发者信息 -->
          <section class="section">
            <h2 class="subtitle">开发者信息</h2>
            <a-list>
              <a-list-item>
                <a-list-item-meta
                  :avatar="developer.avatar"
                  :title="developer.name"
                  :description="developer.position"
                />
              </a-list-item>
              <a-divider class="inner-divider" />
              <a-list-item v-for="(contact, index) in contacts" :key="index">
                <template #actions>
                  <a-link :href="contact.link" target="_blank">
                    <icon :type="contact.icon" />
                    <span class="contact-text">{{ contact.text }}</span>
                  </a-link>
                </template>
              </a-list-item>
            </a-list>
          </section>

          <!-- 版本信息 -->
          <section>
            <a-alert type="info">
              <template #icon>
                <icon type="info-circle" />
              </template>
              <div class="version-info">
                <span>当前版本：{{ version }}</span>
                <span class="update-date">更新日期：{{ updateDate }}</span>
              </div>
            </a-alert>
          </section>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import Icon from "@arco-design/web-vue/es/icon";

export default {
  components: {
    Icon,
  },
  data: () => ({
    version: "1.0.0",
    updateDate: "2024-02-14",
    developer: {
      name: "失意",
      position: "全栈开发者",
      avatar: require("@/assets/oj-logo.jpg"),
    },
    technologies: [
      { name: "Vue 3", icon: "logo-vue", color: "#41b883" },
      { name: "Arco Design", icon: "code", color: "#165DFF" },
      { name: "Spring Boot", icon: "leaf", color: "#6DB33F" },
      { name: "JDK 21", icon: "code-square", color: "#5382A1" },
      { name: "MySQL", icon: "database", color: "#4479A1" },
      { name: "Docker", icon: "code-sandbox", color: "#2496ED" },
      { name: "Spring Cloud", icon: "leaf", color: "#6DB33F" },
      { name: "RabbitMQ", icon: "message", color: "#FF8040" },
    ],
    contacts: [
      {
        icon: "email",
        text: "3401187804@qq.com",
        link: "mailto:contact@example.com",
      },
      {
        icon: "github",
        text: "GitHub仓库",
        link: "https://github.com/2743305544/shiyioj-frontend",
      },
      {
        icon: "file",
        text: "项目文档",
        link: "/https://github.com/2743305544/shiyioj-frontend",
      },
    ],
  }),
};
</script>

<style scoped>
.about-container {
  padding: 40px 20px;
  background-color: var(--color-bg-2);
}

.about-card {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header-section {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  color: var(--color-text-1);
  margin-bottom: 16px;
}

.divider {
  margin: 20px 0;
}

.subtitle {
  font-size: 18px;
  color: var(--color-text-1);
  margin-bottom: 16px;
}

.content {
  color: var(--color-text-2);
  line-height: 1.8;
}

.tech-card {
  margin-bottom: 16px;
  transition: transform 0.2s;
}

.tech-card:hover {
  transform: translateY(-5px);
}

.tech-name {
  margin-left: 8px;
  font-weight: 500;
}

.version-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.update-date {
  color: var(--color-text-3);
}

.contact-text {
  margin-left: 8px;
}

.inner-divider {
  margin: 12px 0;
}
</style>
