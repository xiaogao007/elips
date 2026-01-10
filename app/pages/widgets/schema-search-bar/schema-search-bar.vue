<template>
  <el-form
    v-if="schema && schema.properties"
    :inline="true"
    class="schema-search-bar"
  >
    <el-form-item
      v-for="(schemaItem, key) in schema.properties"
      :key="key"
      :label="schemaItem.label"
    >
      <component
        :is="SearchItemConfig[schemaItem.option?.comType]?.component"
        :ref="handleSearchComList"
        :schema-key="key"
        :schema="schemaItem"
        @loaded="handleChildLoaded"
      ></component>
    </el-form-item>
    <!-- 操作区域 -->
    <el-form-item>
      <el-button type="primary" plain class="search-btn" @click="search">
        搜索
      </el-button>
      <el-button plain class="reset-btn" @click="reset"> 重置 </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, toRefs } from "vue";
import SearchItemConfig from "./serach-item-config";
const props = defineProps({
  /**
   * schema配置，结构如下：
   * {
   *      type:'object',
   *      properties:{
   *          key:{
   *              ...schema,//标准 schema 配置
   *              type:'',//字段类型
   *              label:'',//字段中文名
   *              // 字段在searchba中的配置
   *              searchOptions:{
   *                  ...eleComponentConfig, //标准的el-component-column配置
   *                  comType:'',//配置组件类型 input/select
   *                  default:'',//默认值
   *              },
   *          },
   *      }
   * }
   */
  schema: {
    type: Object,
    default: () => ({}),
  },
});

const { schema } = toRefs(props);
const searchComList = ref([]);
const handleSearchComList = (el) => {
  // 过滤空值，并防止重复添加
  if (el && !searchComList.value.includes(el)) {
    searchComList.value.push(el);
  }
};
const emit = defineEmits(["load", "search", "reset"]);
const getValue = () => {
  const dtoObj = {};
  searchComList.value.forEach((component) => {
    Object.assign(dtoObj, component?.getValue());
  });
  return dtoObj;
};
let childComLoadedCount = 0;
const handleChildLoaded = () => {
  childComLoadedCount++;
  if (childComLoadedCount >= Object.keys(schema?.value.properties).length) {
    emit("loda", getValue());
  }
};
const search = () => {
  emit("search", getValue());
};
const reset = () => {
  searchComList.value.forEach((el) => {
    el?.reset();
  });
  emit("reset");
};
defineExpose({
  getValue,
  reset,
});
</script>
<style lang="less" scoped>
.schema-search-bar {
  min-width: 500px;
  .search-btn {
    width: 100px;
  }
  .reset-btn {
    width: 100px;
  }
  .input {
    width: 180px;
  }
  .select {
    width: 180px;
  }
  .dynamic-select {
    width: 180px;
  }
}
</style>
