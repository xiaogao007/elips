<template>
  <el-select v-model="dtoValue" v-bind="schema.option" class="dynamic-select">
    <el-option
      v-for="item in enumList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>item.label
<script setup>
import { ref, onMounted } from "vue";
import $curl from "$common/curl";
const { schemaKey, schema } = defineProps({
  schemaKey: {
    type: String,
    default: "",
  },
  schema: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["loaded"]);
const dtoValue = ref();
const enumList = ref([]);
const fetchEnumList = async () => {
  const res = await $curl({
    method: "get",
    url: schema?.option?.api,
    data: {},
  });
  if (res?.data?.length > 0) {
    enumList.value.push(...res?.data);
  }
};
const getValue = () => {
  return dtoValue.value !== undefined ? { [schemaKey]: dtoValue.value } : {};
};
const reset = () => {
  dtoValue.value = schema?.option?.default ?? enumList.value[0]?.value;
};

onMounted(async () => {
  await fetchEnumList();
  reset();
  emit("loaded");
});

defineExpose({
  getValue,
  reset,
});
</script>
<style lang="less" scoped></style>
