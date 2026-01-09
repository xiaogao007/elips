<template>
  <sider-container>
    <template #menu-content>
      <el-menu
        :default-active="activeKey"
        :ellipsils="false"
        @select="onMenuSelect"
      >
        <template v-for="item in menuList">
          <sub-menu
            v-if="item.subMenu && item.subMenu.length > 0"
            :menu-item="item"
          ></sub-menu>
          <el-menu-item v-else :index="item.key">{{ item.name }}</el-menu-item>
        </template>
      </el-menu>
    </template>
    <template #main-content>
      <router-view></router-view>
    </template>
  </sider-container>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMenuStore } from "$store/menu";
import SiderContainer from "$widgets/sider-container/sider-container.vue";
import SubMenu from "./complex-view/sub-menu/sub-menu.vue";
const router = useRouter();
const route = useRoute();
const menuStore = useMenuStore();

let activeKey = ref("");
const setActiveKey = () => {
  let siderMenuItem = menuStore.findMenuItem({
    key: "key",
    value: route.query.sider_key,
  });

  //   首次加载sider-view时，route.query.sider_key可能不存在，默认选中第一个菜单项
  if (!siderMenuItem) {
    const hMneuItem = menuStore.findMenuItem({
      key: "key",
      value: route.query.key,
    });
    if (hMneuItem && hMneuItem.siderConfig && hMneuItem.siderConfig.menu) {
      const sideMneuList = hMneuItem.siderConfig.menu;
      siderMenuItem = menuStore.findFirstMenuItem(sideMneuList); //找出左侧第一个菜单项
      if (siderMenuItem) {
        handleMneuSelect(siderMenuItem.key);
      }
    }
  }
  activeKey.value = siderMenuItem?.key;
};

const menuList = ref([]);
const setMenuList = () => {
  const menuItem = menuStore.findMenuItem({
    key: "key",
    value: route.query.key,
  });
  if (menuItem && menuItem.siderConfig && menuItem.siderConfig.menu){
      menuList.value = menuItem.siderConfig.menu;
  }
};

watch(
  () => route.query.key,
  () => {
    setMenuList();
    setActiveKey();
  }
);
onMounted(() => {
    setMenuList();
  setActiveKey();
});
watch(
  () => menuStore.menuList,
  () => {
    console.log("🚀 ~ menuStore.menuList:", menuStore.menuList)
    setMenuList();
    setActiveKey();
  },{deep:true}
);

const onMenuSelect = (menuKey) => {
  handleMneuSelect(menuKey);
};
const handleMneuSelect = (menuKey) => {
const menuItem = menuStore.findMenuItem({
    key: "key",
    value: menuKey,
  });
  const { moduleType, key, customConfig } = menuItem;
  // 点击当前侧边栏菜单，不做跳转
  if (key === route.query.sider_key) {
    return;
  }

  const pathMap = {
    iframe: "/iframe",
    schema: "/schema",
    custom: customConfig?.path,
  };
  router.push({
    path: `/view/dashboard/sider${pathMap[moduleType]}`,
    query: {
      key: route.query.key,
      sider_key: key,
      proj_key: route.query.proj_key,
    },
  });
}

</script>
<style lang="less" scoped>
</style>