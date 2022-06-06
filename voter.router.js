const Router=require('express');
const fs=require('fs');
const { parse } = require('path');
const voterRouter=Router();

voterRouter.get('/party/:apikey',(req,res)=>{
    const {apikey}=req.params;
    fs.readFile('./db.json',(err,data)=>{
        if(err){
            console.log('error occcuerd', err.message);
        }
        const parseddata=JSON.parse(data);
        const partydata=[];
        parseddata.users.map((user)=>{
         if(user.party===apikey){
             partydata.push(user);
         }
        })
        res.send(partydata);
    })
})
voterRouter.get('/voters',(req,res)=>{
    fs.readFile('./db.json',(err,data)=>{
        if(err){
            console.log('error occcuerd', err.message);
        }
        const parseddata=JSON.parse(data);
        const voterdata=[];
        parseddata.users.map((user)=>{
         if(user.role==="voter"){
             voterdata.push(user);
         }
        })
        res.send(voterdata);
    })
})
module.exports=voterRouter;