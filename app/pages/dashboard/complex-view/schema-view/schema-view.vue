<template>
  <el-row class="schema-view">
    <search-panel></search-panel>
    <table-panel></table-panel>
  </el-row>
</template>
<script setup>
import { provide } from "vue";
import SearchPanel from "./complex-view/search-panel/search-panel.vue";
import TablePanel from "./complex-view/tabel-panel/table-panel.vue";

import { useSchema } from "./hook/schema";
const {api,tableSchema,tableConfig} = useSchema();
provide('schemaViewData',{api,tableSchema,tableConfig});
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