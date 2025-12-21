<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}}</title>
    <link href="/static/normalize.css" rel="stylesheet">
    <link rel="icon" href="/static/favicon.svg" type="image/svg+xml">
</head>
<body>
    <h1>PAGE1</h1>
    <input id="env" value={{env}} style="display:none" />
    <input id="options" value={{options}} style="display:none" />
    <button onclick="handleClick()">请求</button>
    <script src="https://unpkg.com/axios@1.6.7/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-md5@0.8.3/src/md5.min.js"></script>
    <script type="text/javascript">
    try{
        const env =document.getElementById('env').value
        const options= document.getElementById('options').value
        window.env=env
        window.options=JSON.parse(options)
    }catch(e){
        console.error(e)
    }
    const handleClick=async ()=>{
        try {
            //const response = await axios.get('/api/project/list');
            //const response =await axios.request({
            //    method:'post',
            //    url:'/api/project/list',
            //})
            //console.log(response.data);
            const signKey='vhcw9548g7hw045g7hg08547y'
            const st=Date.now()
            axios.request({
                method:'get',
                url:'/api/project/list',
                params:{proj_key:123},
                headers:{
                    s_t:st,
                    s_sign:md5(`${signKey}_${st}`)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    </script>
</body>
</html>