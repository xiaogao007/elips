<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <el-container class="header-container">
    <el-header class="header">
      <el-row type="flex" align="middle" class="header-row">
        <!-- 左上角 title -->
        <el-row type="flex" align="middle" class="title-panel">
          <img src="./assets/logo.svg" class="logo" />
          <el-row class="text">{{ title }}</el-row>
        </el-row>
        <!-- 插槽 菜单区域 -->
        <slot name="menu-content"></slot>
        <!-- 右上角 -->
        <el-row type="flex" align="middle" justify="end" class="setting-panel">
          <!-- 插槽 设置区域 -->
          <slot name="setting-content"></slot>
          <img src="./assets/avatar.jpg" class="avatar" />
          <el-dropdown @command="handleUserCommond">
            <span class="user-name">
              {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </template>
          </el-dropdown>
        </el-row>
      </el-row>
    </el-header>
    <el-main class="main-container">
      <!-- 核心内容填充区域 -->
      <slot name="main-content"></slot>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  title: {
    type: String,
    default: "",
  },
});
const userName = ref("小高");
const handleUserCommond = () => {};
</script>

<style lang="less" scoped>
.header-container {
  height: 100%;
  min-width: 1000px;
  overflow: hidden;
  .header {
    max-height: 120px;
    border-bottom: 1px solid #e8e8e8;
    .header-row {
      height: 60px;
      padding: 0 16px;
      .title-panel {
        width: 180px;
        min-width: 180px;
        .logo {
          margin-right: 10px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
        .text {
          font-size: 15px;
          font-weight: 500;
        }
      }
      .setting-panel{
        margin-left: auto;
        min-width: 180px;
        .avatar{
            margin-right: 12px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
        }
        .user-name{
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            height: 60px;
            line-height: 60px;
            outline: none;
        }
      }
    }
  }
  .main-container {
  }
}
:deep(.el-header) {
  padding: 0;
}
</style>