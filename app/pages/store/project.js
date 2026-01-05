import { defineStore } from "pinia";
import { ref } from "vue";
export const useProjectStore = defineStore('project', () => {
    const projectList = ref([])
    const setProjectList = function (list) {
        projectList.value = list
    }
    return {
        projectList,
        setProjectList
    }
})