const { urlencoded } = require('express');
const express=require('express');
const authRouter=require('./auth.route');
const voterRouter=require('./voter.router');
const fs=require('fs');

const app=express();

app.use(urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('app working');
})
app.use('/user',authRouter);

app.use('/votes',voterRouter);

app.get('/db',(req,res)=>{
    fs.readFile('./db.json',(err,data)=>{
        if(err){
            console.log('error occcuerd', err.message);
        }
        // const parseddata=JSON.parse(data);
        res.send(data);
    })
})

app.post('/db',({body},res)=>{
  fs.writeFile('./db.json',JSON.stringify(body),()=>{
      res.send('data posted succesfully');
  })
})
const PORT= process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT} `);
})
