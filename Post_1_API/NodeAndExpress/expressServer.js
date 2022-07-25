const express = require('express');

const server = express();

server.use(express.urlencoded({extended:true}));

server.post('/',(req,res) => {
    let body ='';
    const userName=req.body.username;
    res.setHeader('Content-Type','text/html'); 
    res.end('<h1>'+userName+'</h1>');
})

server.get('/',(req,res) => {
    res.setHeader('Content-Type','text/html');
    res.end('<form method="POST"><input type="text" name="username"></input><button type ="submit"> Login </button></form>');
})

server.listen(5000);

