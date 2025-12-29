<template>
  <h1>page1</h1>
  <!-- <input v-model="iptVal" /> -->
  <!-- <div>{{ iptVal }}</div> -->
  <!-- <el-button type="primary" @click="handleClick">ceshi</el-button> -->
  <el-table :data="tableData" style="width: 100%;">
    <el-table-column prop="name" label="name" width="180"></el-table-column>
    <el-table-column prop="desc" label="desc" ></el-table-column>
  </el-table>
</template>

<script setup>
import { ref,onMounted } from "vue";
import $curl from '$common/curl'
console.log("page1 init");
// let iptVal = ref("");
const tableData=ref([])
onMounted(async()=>{
  const res = await $curl({
    method:'get',
    url:'/api/project/list',
    query:{
      proj_key: 123
    }
  })
  tableData.value=res.data
})
// const handleClick = () => {
//   const signKey = "vhcw9548g7hw045g7hg08547y";
//   const st = Date.now();
//   axios.request({
//     method: "get",
//     url: "/api/project/list",
//     params: { proj_key: 123 },
//     headers: {
//       s_t: st,
//       s_sign: md5(`${signKey}_${st}`),
//     },
//   });
// };
</script>

<style lang="less" scoped>
h1 {
  color: red;
}
</style>