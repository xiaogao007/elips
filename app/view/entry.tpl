<!DOCTYPE html>
<html class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/static/normalize.css" rel="stylesheet">
    <link rel="icon" href="/static/favicon.svg" type="image/svg+xml">
    <title>{{name}}</title>
</head>
<body style="margin:0">
    <div id="root"></div>
    <input id="env" value={{env}} style="display:none" />
    <input id="options" value={{options}} style="display:none" />
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
    </script>
</body>
</html>