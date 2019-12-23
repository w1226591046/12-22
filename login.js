const http = require('http');
const fs = require('fs');
function queryString(str){
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g,($0,$1,$2)=>{
        obj[$1] = $2;
    });
    return obj;
};
let sql = [
    {
        id:0,
        username:'xxx',
        password:123
    },
    {
        id:1,
        username:'www',
        password:123
    },
    {
        id:2,
        username:'哈哈',
        password:123
    }
];
http.createServer((req,res)=>{
    let url = req.url;
    if(url !== '/favicon.ico'){
        if(url.includes('?')){
            //接口
            let ary = url.split('?');
            let jiekou = ary[0];
            let opt = queryString(ary[1]);
            switch(jiekou){
                case '/getname':
                    //返回给前端json
                    let msg = {
                        code:0,
                        msg:'可以注册'
                    };
                    let o1 = sql.find(item=>item.username === decodeURI(opt.user));
                    //看有这个人吗
                    if(o1){
                        msg.code = 1;
                        msg.msg = '有这个人了';
                    };
                    res.setHeader('content-type','text/html;charset=utf-8');
                    res.write(JSON.stringify(msg));
                    res.end();
                break;
                //注册接口
                case '/register':
                    let msg1 = {
                        code:1,
                        msg:'注册成功'
                    }
                    let o= sql.find(item=>item.username === decodeURI(opt.user));
                    if(o){
                        msg1.code = 0;
                        msg1.msg = '有这个人'
                    }else{
                        if(opt.password){
                            sql.push({
                                id:Date.now(),
                                username:decodeURI(opt.user),
                                password:opt.password
                            })
                        }else{
                            msg1.code = 2;
                            msg1.msg = '参数不正确';
                            res.writeHead(400,{'content-type':'text/html;charset=utf-8'});
                            res.write(JSON.stringify(msg1));
                            res.end();
                            return;
                        }
                    }
                    res.setHeader('content-type','text/html;charset=utf-8');
                    res.write(JSON.stringify(msg1));
                    res.end();
                    break;
            }
        }else{
            try {
                if(url === '/'){
                    url = '/index.html';
                }
                let data = fs.readFileSync('www'+url);
                res.write(data.toString());
                res.end();
            } catch (error) {
                let data = fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end()
            }
        }
    }
}).listen(80);