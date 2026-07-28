const express = require('express');
const app = express();
const port = 3007;

app.listen(port,(err)=>{
    if(!err){
        console.log(`Server Running on : localhost:${port}`);
    }
    else{
        console.log("already server running",err);
    }
})