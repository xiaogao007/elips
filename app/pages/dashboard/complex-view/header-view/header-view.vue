<template>
  <header-container :title="projName">
    <template #menu-content>
      <!-- 根据store.menlist渲染 -->
      <el-menu
        :default-active="activeKey"
        :ellipsis="false"
        mode="horizontal"
        @select="onMenuSelec"
      >
        <template v-for="item in menuStore.menuList">
          <sub-menu
            v-if="item.subMenu && item.subMenu.length > 0"
            :menu-item="item"
          ></sub-menu>
          <el-menu-item v-else :index="item.key">{{ item.name }}</el-menu-item>
        </template>
      </el-menu>
    </template>
    <template #setting-content>
      <!-- 根据store.proejctlist渲染 -->
      <el-dropdown @command="handleProjectCommand">
        <span class="project-list"
          >{{ projName }}
          <el-icon
            v-if="projectStore.projectList.length > 1"
            class="el-icon--right"
          >
            <ArrowDown />
          </el-icon>
        </span>
        <template v-if="projectStore.projectList.length > 1" #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in projectStore.projectList"
              :key="item.key"
              :command="item.key"
              :disabled="item.name === projName"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <template #main-content>
      <slot name="main-content"></slot>
    </template>
  </header-container>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import HeaderContainer from "$widgets/header-container/header-container.vue";
import SubMenu from "./complex-view/sub-menu/sub-menu.vue";
import { ArrowDown } from "@element-plus/icons-vue";

import { useMenuStore } from "$store/menu";
import { useProjectStore } from "$store/project";

const menuStore = useMenuStore();
const projectStore = useProjectStore();

defineProps({
  projName: String,
});

const emit = defineEmits(['menu-select']);
const route = useRoute();
const activeKey = ref("");
const setActiveKey = () => {
  const menuItem = menuStore.findMenuItem({
    key: "key",
    value: route.query.key,
  });
  activeKey.value = menuItem?.key;
};


watch(
  () => route.query.key,
  () => {
    setActiveKey();
  }
);
watch(
  () => menuStore.menuList,
  () => {
    setActiveKey();
  }
);
onMounted(() => {
  setActiveKey();
});

const onMenuSelec = (mneuKey) => {
  const menuItem = menuStore.findMenuItem({
    key: "key",
    value: mneuKey,
  });
  emit("menu-select", menuItem);
};
const handleProjectCommand = (event) => {
  const projectItem = projectStore.projectList.find(
    (item) => item.key === event
  );
  if (!projectItem || !projectItem.homePage) {
    return;
  }
  const { origin, pathname } = window.location;
  window.location.replace(`${origin}${pathname}#${projectItem.homePage}`);
  window.location.reload();
};
</script>

<style lang="less" scoped>
.project-list {
  margin-right: 20px;
  cursor: pointer;
  color: (--var(--el-text-color-primary));
  display: flex;
  align-items: center;
  outline: none;
}
:deep(.el-menu--horizontal.el-menu) {
  border-bottom-color: #fff;
}
</style>