module.exports=(app)=>{
    return class ProjectService{
        async getList(ctx){
            return [
                {name:'project1',desc:'项目1',id:1},
                {name:'project2',desc:'项目2',id:2},
                {name:'project3',desc:'项目3',id:3},
            ]
        }
    }
}