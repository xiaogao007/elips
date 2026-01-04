<template>
  <el-sub-menu :index="menuItem.key">
    <template #title>{{ menuItem.name }}</template>
    <div v-for="item in menuItem.subMenu" :key="item.key">
      <SunMenu v-if="item.subMenu && item.subMenu.length > 0" :menuItem="item">
      </SunMenu>
      <el-menu-item v-else :index="item.key">{{ item.name }}</el-menu-item>
    </div>
  </el-sub-menu>
</template>

<script setup>
const { menuItem } = defineProps(["menuItem"]);
</script>

<style lang="less" scoped>
</style>