<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <headerContainer title="项目列表">
    <template #main-content>
      <div v-loading="loading">
        <div v-for="item in modelList" :key="item.model?.key">
          <!-- model展示区 -->
          <div class="model-panel">
            <el-row type="flex" align="middle">
              <div class="title">{{ item.model?.name }}</div>
            </el-row>
            <div class="divider"></div>
          </div>
          <!-- project展示区 -->
          <div class="project-list">
            <el-card
              v-for="projItem in item.project"
              :key="projItem.key"
              class="project-card"
            >
              <template #header>
                <div class="title"><span>{{ projItem.name }}</span></div>
              </template>
              <div class="content">
                {{ projItem.desc??'---' }}
              </div>
              <template #footer>
                <el-row justify="end">
                  <el-button link type="primary" @click="onEnter(projItem)">进入</el-button>
                </el-row>
              </template>
            </el-card>
          </div>
        </div>
      </div>
    </template>
  </headerContainer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import $curl from "$common/curl.js";
import headerContainer from "$widgets/header-container/header-container.vue";

const loading = ref(false);

const modelList = ref([]);
async function getModelList() {
  loading.value = true;
  const res = await $curl({
    method: "get",
    url: "/api/project/model_list",
    errorMessages: "获取项目列表失败",
  });
  loading.value = false;
  if (!res || !res.success || !res.data) {
    return;
  }
  modelList.value = res.data;
  console.log("🚀 ~ getModelList ~ modelList:", modelList.value)
}
onMounted(() => {
  getModelList();
});
function onEnter(item){
    const {origin}=window.location
    window.open(`${origin}/view/dashboard#${item.homePage}`)
}
</script>

<style lang="less" scoped>
    .model-panel{
        margin: 20px 50px;
        min-width: 500px;
        .title{
            font-size: 25px;
            font-weight: bold;
            color: #e5e5e5;
        }
        .divider{
            margin-top: 10px;
            border-bottom: 1px dashed #6d6c6c;
        }
    }
    .project-list{
        display: flex;
        margin: 0 50px;
        .project-card{
            margin-right: 30px;
            margin-bottom: 20px;
            width: 300px;
            .title{
                font-weight: bold;
                font-size: 17px;
                color: #47a2ff;
            }
            .content{
                color: #6d6c6c;
            }
        }
    }
</style>