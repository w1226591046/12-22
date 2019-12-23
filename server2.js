const http = require('http');
const fs = require('fs');
http.createServer(function(req,res){
    try {
        let url = req.url;
        if(url === '/'){
            url = '/index.html';
        }
        //如果是某个文件夹下的文件，要加路径
        let data = fs.readFileSync('www/'+url);
        res.write(data.toString());
        res.end();
    } catch (error) {
        let data = fs.readFileSync('www/404.html');
        res.write(data.toString());
        res.end();
    }
}).listen(80);