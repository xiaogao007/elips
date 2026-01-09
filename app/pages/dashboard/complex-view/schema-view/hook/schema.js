import { ref, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "$store/menu";

export const useSchema = () => {
    const route = useRoute();
    const menuStore = useMenuStore();

    const api = ref('');
    const tableSchema = ref({});
    const tableConfig = ref({});
    // 构造schema相关配置，共schemaview解释器使用
    const buildData = () => {
        const { key, sider_key: siderKey } = route.query;
        const mItem = menuStore.findMenuItem({
            key: 'key',
            value: siderKey || key
        })
        if (mItem && mItem.schemaConfig) {
            const { schemaConfig: sConfig } = mItem;
            const configSchema=JSON.parse(JSON.stringify(sConfig.schema || {}));
            api.value = sConfig.api ?? '';
            tableSchema.value = {};
            tableConfig.value = undefined;
            nextTick(() => {
                tableSchema.value = buildDtoSchema(configSchema,'table');
                tableConfig.value = mItem.tableConfig
            })
        }

    }
    // 构建通用清楚噪音方法
    const buildDtoSchema=(_schema,comName)=>{
        if(!_schema?.properties)return {};
        const dtoSchema={type:'object',properties:{}};
        for (const key in _schema.properties) {
            const props =  _schema.properties[key];
            if(props[`${comName}Option`]){
                let dtoProps={}
                // 提取props里非Option的属性，存放到dtoProps
                for (const pKey in props) {
                    if(pKey.indexOf('Option')<0){
                        dtoProps[pKey]=props[pKey];
                    } 
                }
                // 处理 comNameOption 里的属性
                dtoProps=Object.assign({},dtoProps,{options:props[`${comName}Option`]||[]})
                dtoSchema.properties[key]=dtoProps;
            }
        }
        return dtoSchema;
    }

    watch([
        () => route.query.key,
        () => route.query.sider_key,
        () => menuStore.menuList
    ], () => {
        buildData()
    }, { deep: true })

    onMounted(() => {
        buildData()
    })

    return {
        api,
        tableSchema,
        tableConfig
    }
}