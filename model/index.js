const glob=require('glob')
const path=require('path')
const _=require('lodash')
const{sep}=path

// 项目继承model
const projectExtendModel=(model,project)=>{
    return _.mergeWith({},model,project,(modelValue,projValue)=>{
        // 处理数组合并的特殊情况
        if(Array.isArray(modelValue)&&Array.isArray(projValue)){
            let res=[]
            // project继承model 需要处理修改和新增内容的情况
            // project有的键值 model也有 => 修改（重载）
            // project有的键值，model没有 => 新增
            // model有的键值，project没有 => 保留（继承）

            // 处理修改和保留
            for (let i = 0; i < modelValue.length; i++) {
                const modelItem = modelValue[i];
                const projItem=projValue.find(proItem=>proItem.key===modelItem.key)
                // project有的键值 model也有则递归调用 projectExtendModel 覆盖修改
                res.push(projItem?projectExtendModel(modelItem,projItem):modelItem)
            }

            // 处理新增
            for (let i = 0; i < projValue.length; i++) {
                const projItem = projValue[i];
                const modelItem=modelValue.find(modelItem=>modelItem.key===projItem.key)
                if(!modelItem)res.push(projItem)
            }
            return res
        }
    })
}


/**
 * 解析model配置，并返回组织及继承后的数据结构
 * [
 *  {
 *      modelKey:${model},
 *      project:{
 *          proj1Key:${proj1},
 *          proj2Key:${proj2}
 *      }
 *  },...
 * ]
 */
module.exports=(app)=>{
    const modelList=[]
    // 遍历当前文件夹，构造数据模型结构，挂载到 modelList上
    const modelPath=path.resolve(app.baseDir,`.${sep}model`)
    const fileList=glob.sync(path.resolve(modelPath,`.${sep}**${sep}**.js`))
    fileList.forEach(file=>{
        if(file.indexOf('index.js')>-1){return}
        // 区分配置类型 model/project
        const type=path.normalize(file).indexOf(`${sep}project${sep}`)>-1?'project':'model'
        if(type==='project'){
            const modelKey=file.match(/\/model\/(.*)\/project/)?.[1]
            const projKey=file.match(/\/project\/(.*)\.js/)?.[1]
            const modelItem=modelList.find(item=>item.model?.key===modelKey)
            if(!modelItem){ //初始化 model 结构数据
                modelItem={}
                modelList.push(modelItem)
            }
            if(!modelItem.project){ //初始化project数据结构
                modelItem.project={}
            }
            modelItem.project[projKey]=require(path.resolve(file))
            modelItem.project[projKey].key=projKey //注入projectKey
            modelItem.project[projKey].modelKey=modelKey //注入modelKey
        }
        if(type==='model'){
            const modelKey=file.match(/\/model\/(.*?)\/model\.js/)?.[1]
            let modelItem=modelList.find(item=>item.model?.key===modelKey)
            if(!modelItem){
                modelItem={}
                modelList.push(modelItem)
            }
            modelItem.model=require(path.resolve(file))
            modelItem.model.key=modelKey // 注入modelKey
        }
    })

    // 整理： project==>继承model
    modelList.forEach(ele=>{
        const {model,project}=ele
        for(const key in project){
            project[key]=projectExtendModel(model,project[key])
        }
    })

    return modelList 
}