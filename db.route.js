const Router=require('express');
const fs=require('fs');

 const dbRouter=Router();

 dbRouter.get('/',(req,res)=>{
    fs.readFile('./db.json',(err,data)=>{
        if(err){
            console.log('error occcuerd', err.message);
        }
        // const parseddata=JSON.parse(data);
        res.send(data);
    })
})

dbRouter.post('/',({body},res)=>{
    fs.writeFile('./db.json',JSON.stringify(body),()=>{
        res.send('data posted succesfully');
    })
  })

  module.exports=dbRouter;