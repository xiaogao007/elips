<template>
  <h1>page2</h1>
  <input v-model="iptVal">
  <div>{{ iptVal }}</div>
</template>

<script setup>
import {ref} from 'vue'
import utils from "$common/utils";
console.log(utils);
console.log('page2 init')
let iptVal=ref('')
</script>

<style lang="less" scoped>
h1{
    color: greenyellow;
}
</style>