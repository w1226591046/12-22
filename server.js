const http = require('http');
let app = http.createServer(function(request,response){
    if(request.url !== '/favicon.ico'){
        let num = (/user=(\d)/.exec(request.url.split('?')[1]))[1];
        console.log(num);
        response.setHeader('content-type','text/html;charset=utf-8');
        if(num === '1'){
            response.write('{"name":"哈哈"}');
        }else if(num === '0'){
            response.write('{"name":"嘿嘿"}');
        }
        response.end();
    }
});
app.listen(80);





   