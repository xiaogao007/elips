<template>
  <el-row class="schema-view">
    <search-panel
      v-if="
        searchSchema?.properties &&
        Object.keys(searchSchema.properties).length > 0
      "
      @search="onSearch"
    ></search-panel>
    <table-panel ref="tablePanelRef" @operate="onTableOperate"></table-panel>
    <component
      v-for="(item, key) in components"
      :key="key"
      :is="ComponentConfig[key]?.component"
      ref="comListRef"
      @command="onComponentCommand"
    ></component>
  </el-row>
</template>
<script setup>
import { ref, provide } from "vue";
import SearchPanel from "./complex-view/search-panel/search-panel.vue";
import TablePanel from "./complex-view/tabel-panel/table-panel.vue";
import { useSchema } from "./hook/schema";
import ComponentConfig from "./components/component-config";

const {
  api,
  tableSchema,
  tableConfig,
  searchSchema,
  searchConfig,
  components,
} = useSchema();

const apiParams = ref({});
const tablePanelRef = ref(null);
const comListRef = ref([]);

provide("schemaViewData", {
  api,
  apiParams,
  tableSchema,
  tableConfig,
  searchSchema,
  searchConfig,
  components,
});

const onSearch = (searchValObj) => {
  apiParams.value = searchValObj;
};
// table事件映射
const EventHandlerMap = {
  showComponent: showComponent,
};
const onTableOperate = ({ btnConfig, rowData }) => {
  const { eventKey } = btnConfig;
  if (EventHandlerMap[eventKey]) {
    EventHandlerMap[eventKey]({ btnConfig, rowData });
  }
};
// 展示动态组件
function showComponent({ btnConfig, rowData }) {
  const { comName } = btnConfig.eventOption;
  if (!comName) return;
  const comRef = comListRef.value.find((item) => item.name === comName);
  if (!comRef || typeof comRef.show !== "function") return;
  comRef.show(rowData);
}
</script>
<style lang="less" scoped>
.schema-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
