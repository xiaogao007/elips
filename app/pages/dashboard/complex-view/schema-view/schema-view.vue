<template>
  <el-row class="schema-view">
    <search-panel></search-panel>
    <table-panel></table-panel>
  </el-row>
</template>
<script setup>
import SearchPanel from "./complex-view/search-panel/search-panel.vue";
import TablePanel from "./complex-view/tabel-panel/table-view.vue";

import { useSchema } from "./hook/schema";
const {api} = useSchema();

setTimeout(() => {
  console.log("🚀 ~ api:", api.value);
},1000);
</script>
<style lang="less" scoped>
.schema-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>