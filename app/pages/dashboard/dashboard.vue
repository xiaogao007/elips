<template>
  <el-config-provider :locale="zhCn">
    <header-view :proj-name="projName" @menu-select="onMnenuSelect">
      <template #main-content>
        <router-view></router-view>
      </template>
    </header-view>
  </el-config-provider>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import HeaderView from "./complex-view/header-view/header-view.vue";
import $curl from "$common/curl";

import { useMenuStore } from "$store/menu";
import { useProjectStore } from "$store/project";

const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const projectStore = useProjectStore();

onMounted(() => {
  getProjectList();
  getMenuList();
});
const projName = ref("");
const getProjectList = async () => {
  const res = await $curl({
    method: "get",
    url: "/api/project/list",
    query: {
      proj_key: route.query.proj_key,
    },
  });
  if (!res || !res.success || !res.data) {
    return;
  }
  projectStore.setProjectList(res.data);
};
const getMenuList = async () => {
  const res = await $curl({
    method: "get",
    url: "/api/project",
    query: {
      proj_key: route.query.proj_key,
    },
  });
  if (!res || !res.success || !res.data) {
    return;
  }
  const { name, menu } = res.data;
  projName.value = name;
  menuStore.setMenuList(menu);
};

const onMnenuSelect = (menuItem) => {
  const { moduleType, key, customConfig } = menuItem;
  if (key === route.query.key) {
    return;
  }
  const pathMap = {
    sider: "/sider",
    iframe: "/iframe",
    schema: "/schema",
    custom: customConfig?.path,
  };
  router.push({
    path: `/view/dashboard${pathMap[moduleType]}`,
    query: {
      key,
      proj_key: route.query.proj_key,
    },
  });
};
</script>

<style lang="less" scoped>
  :deep(.el-main){
    padding:0;
  }
</style>