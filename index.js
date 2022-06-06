const { urlencoded } = require('express');
const express=require('express');
const authRouter=require('./auth.route');
const voterRouter=require('./voter.router');
const dbRouter=require('./db.route');
const fs=require('fs');

const app=express();

app.use(urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('app working');
})
app.use('/db',dbRouter);
app.use('/user',authRouter);

app.use('/votes',voterRouter);

const PORT= process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT} `);
})
