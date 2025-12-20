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
    <input id="env" value={{env}} />
    <input id="options" value={{options}} />
    <script>
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