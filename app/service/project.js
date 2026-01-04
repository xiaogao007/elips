module.exports=(app)=>{
    const BaseService=require('./base')(app)
    const modelList=require('../../model/index.js')(app)
    return class ProjectService extends BaseService {
        /**
         * 根据projKey获取项目配置
         */
        get(projKey){
            let projConfig
             modelList.forEach(modelItem=>{
                if(modelItem.project[projKey]){
                    projConfig=modelItem.project[projKey]
                }
            })
            return projConfig
        }
        /**
         * 获取当前projeKey 对应的模型下的项目列表（无则获取全部）
         */
        getList({projKey}){
            return modelList.reduce((preList,modelItem)=>{
                const {project} =modelItem
                // 传了projKey 则只获取同模型下的项目，否则全量
                if(projKey && !project[projKey]){
                    return preList
                }
                for(const pKey in project){
                    preList.push(project[pKey])
                }
                return preList
            },[])

            // const projectList=[]
            // modelList.forEach(modelItem=>{
            //     const {project} =modelItem
            //     // 传了projKey 则只获取同模型下的项目，否则全量
            //     if(projKey && !project[projKey]){return}
            //     for(const pKey in project){
            //         projectList.push(project[pKey])
            //     }
            // })
            // return projectList
        }
        /**
         * 获取所有模型与项目的结构化数据
         * @returns 
         */
       async getModelList(){
        return modelList
       }
    }
}