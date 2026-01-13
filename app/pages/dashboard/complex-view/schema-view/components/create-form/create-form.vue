<template>
  <el-drawer
    v-model="isShow"
    direction="rtl"
    :destroy-on-close="true"
    :size="550"
  ></el-drawer>
</template>
<script setup>
import { ref } from "vue";
const name = ref("createForm");
const isShow = ref(false);
const show = (rowData) => {
  console.log("🚀 ~ show ~ rowData:", rowData);
  isShow.value = true;
};

defineExpose({
  name,
  show,
});
</script>
<style lang="less" scoped></style>
