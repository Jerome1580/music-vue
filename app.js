const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {

    
    if(request.url === '/'){        
        const html = fs.readFileSync(__dirname +'/dist/index.html','utf-8')
        response.writeHead(200,{
            'Content-type':'text/html',
        })
        
        response.end(html)
    }


    
}).listen(8888)

console.log('server listen 8888');
