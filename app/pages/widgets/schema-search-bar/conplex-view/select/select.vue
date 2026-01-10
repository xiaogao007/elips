<template>
  <el-select v-model="dtoValue" v-bind="schema.option" class="select">
    <el-option
      v-for="item in schema.option?.enumList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>item.label
<script setup>
import { ref, onMounted } from "vue";
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

const getValue = () => {
  return dtoValue.value !== undefined ? { [schemaKey]: dtoValue.value } : {};
};
const reset = () => {
  dtoValue.value =
    schema?.option?.default ?? schema?.option?.enumList[0]?.value;
};
onMounted(() => {
  reset();
  emit("loaded");
});
defineExpose({
  getValue,
  reset,
});
</script>
<style lang="less" scoped></style>
