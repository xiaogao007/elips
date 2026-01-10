<template>
  <div class="schema-table">
    <el-table
      v-if="schema && schema.properties"
      v-loading="loading"
      :data="tableData"
      class="table"
    >
      <template v-for="(schemaItem, key) in schema.properties">
        <el-table-column
          v-if="schemaItem.option?.visible !== false"
          :key="key"
          :prop="key"
          :label="schemaItem.label"
          v-bind="schemaItem.option"
        >
        </el-table-column>
      </template>
      <el-table-column
        v-if="buttons?.length > 0"
        key="operation"
        label="操作"
        fixed="right"
        :width="operationWidth"
      >
        <template #default="scope">
          <el-button
            v-for="(item, i) in buttons"
            :key="i"
            link
            v-bind="item"
            @click="operationHandler({ btnConfig: item, rowData: scope.row })"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="end" class="pagination">
      <el-pagination
        v-if="total > 0"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script setup>
import { ref, toRefs, watch, computed, nextTick, onMounted } from "vue";
import $curl from "$common/curl";

const props = defineProps({
  /**
   * 表格 schema 配置
   * {//模块数据结构
   *      type:'object',
   *      properties:{
   *        key:{
   *             ...schema,//标准 schema 配置
   *            type:'',//字段类型
   *            label:'',//字段中文名
   *            // 字段在table中的配置
   *            tableOptions:{
   *                ...tlTableClomnOptions,//标准 table 列配置
   *                visible:true,//是否在table中显示
   *            },
   *            ...
   *        },
   *     }
   * }
   */
  schema: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  /**
   * API 接口

   */
  api: {
    type: String,
    required: true,
    default: "",
  },
  /**
   * apiParams
   */
  apiParams: {
    type: Object,
    default: () => {},
  },
  /**
   * 操作按钮
   *  {
   *      label:'',//按钮名称
   *      eventKey:'',//按钮事件标识
   *      eventOption:{},//按钮配置
   *      ...elButtonConfig//标准 el-button 配置
   *  },
   */
  buttons: {
    type: Array,
    required: false,
    default: () => [],
  },
});
const { schema, api, apiParams, buttons } = toRefs(props);

const loading = ref(false);
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const emit = defineEmits(["operate"]);

const operationWidth = computed(() => {
  return buttons?.value?.length > 0
    ? buttons.value.reduce((pre, cur) => {
        return pre + cur.label.length * 18;
      }, 50)
    : 50;
});

onMounted(() => {
  initData();
});

watch(
  [schema, api, apiParams],
  () => {
    initData();
  },
  { deep: true }
);

const handleSizeChange = (val) => {
  pageSize.value = val;
  loadTableData();
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
  loadTableData();
};
const initData = () => {
  currentPage.value = 1;
  pageSize.value = 10;
  nextTick(async () => {
    await loadTableData();
  });
};

let timer;
const loadTableData = () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    await fetchTableData();
    timer = null;
  }, 100);
};
const fetchTableData = async () => {
  if (!api.value) {
    console.warn("schema-table组件缺少api参数");
    return;
  }
  // if(loading.value)return  //请求响应快时 效果不佳
  showLoading();
  const res = await $curl({
    method: "get",
    url: `${api.value}/list`,
    query: {
      page: currentPage.value,
      size: pageSize.value,
      ...apiParams.value, // 合并搜索参数
    },
  });

  hideLoading();
  if (!res || !res.success || !Array.isArray(res.data)) {
    tableData.value = [];
    total.value = 0;
    return;
  }
  tableData.value = buildTableData(res.data);
  total.value = res.metadata.total;

  /**
   * 对返回数据进行预处理
   * @param listData 列表数据
   */
  function buildTableData(listData) {
    if (!schema.value?.properties) {
      return listData;
    }
    return listData.map((rowData) => {
      for (const dKey in rowData) {
        const schemaItem = schema.value.properties[dKey];
        // 处理toFixed
        if (schemaItem?.option?.toFixed) {
          rowData[dKey] =
            rowData[dKey].toFixed &&
            rowData[dKey].toFixed(schemaItem.option.toFixed);
        }
        return rowData;
      }
    });
  }
};

const showLoading = () => {
  loading.value = true;
};
const hideLoading = () => {
  loading.value = false;
};

const operationHandler = ({ btnConfig, rowData }) => {
  emit("operate", { btnConfig, rowData });
};

defineExpose({
  initData,
  loadTableData,
  showLoading,
  hideLoading,
});
</script>
<style lang="less" scoped>
.schema-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.table {
  flex: 1;
}
.pagination {
  margin-top: 12px 0;
  text-align: right;
}
</style>
