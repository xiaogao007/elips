<template>
  <h1>page1</h1>
  <input v-model="iptVal" />
  <div>{{ iptVal }}</div>
  <button @click="handleClick">ceshi哈哈</button>
</template>

<script setup>
import { ref } from "vue";
import utils from "$common/utils";
console.log(utils);
console.log("page1 init");
let iptVal = ref("");
const handleClick = () => {
  const signKey = "vhcw9548g7hw045g7hg08547y";
  const st = Date.now();
  axios.request({
    method: "get",
    url: "/api/project/list",
    params: { proj_key: 123 },
    headers: {
      s_t: st,
      s_sign: md5(`${signKey}_${st}`),
    },
  });
};
</script>

<style lang="less" scoped>
h1 {
  color: red;
}
</style>