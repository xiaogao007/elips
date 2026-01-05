<template>
  <el-container class="sider-container">
    <el-aside width="200px" class="aside">
      <slot name="menu-content"></slot>
    </el-aside>
    <el-main class="main">
      <slot name="main-content"></slot> 
    </el-main>
  </el-container>
</template>
<script setup></script>
<style lang="less" scoped>
    .sider-container {
      height: 100%;
      .aside{
        background-color: var(--el-bg-color-light);
        border-right: 1px solid var(--el-border-color-light);
      }
      .main{
        padding: 16px;
        background-color: var(--el-bg-color-base);
        overflow: auto;
      }
    }
    :deep(.el-menu){
        border-right: none;
    }
</style>