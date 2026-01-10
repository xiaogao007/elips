<template>
  <el-row class="schema-view">
    <search-panel
      v-if="
        searchSchema?.properties &&
        Object.keys(searchSchema.properties).length > 0
      "
      @search="onSearch"
    ></search-panel>
    <table-panel @operate="onTableOperate"></table-panel>
  </el-row>
</template>
<script setup>
import { ref, provide } from "vue";
import SearchPanel from "./complex-view/search-panel/search-panel.vue";
import TablePanel from "./complex-view/tabel-panel/table-panel.vue";
import { useSchema } from "./hook/schema";

const { api, tableSchema, tableConfig, searchSchema, searchConfig } =
  useSchema();

const apiParams = ref({});
provide("schemaViewData", {
  api,
  apiParams,
  tableSchema,
  tableConfig,
  searchSchema,
  searchConfig,
});

const onSearch = (searchValObj) => {
  apiParams.value = searchValObj;
};
const onTableOperate = () => {};
</script>
<style lang="less" scoped>
.schema-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
