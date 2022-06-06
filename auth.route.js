const Router=require('express');
const fs=require('fs');
const { parse } = require('path');
const authRouter=Router();

authRouter.post('/create',(req,res)=>{
        fs.readFile('./db.json',(err,data)=>{
            if(err){
                console.log('error occcuerd', err.message);
            }
             const parsedData=JSON.parse(data);
             parsedData.users=[...parsedData.users,req.body];
             fs.writeFile('./db.json',JSON.stringify(parsedData),()=>{
                 res.status(201).send(`{${201}:user created,${req.body.id}}`)
             })
        })

})

authRouter.post('/login',({body},res)=>{
    if(!(body.username && body.password)){
        res.status(400).send(`${400}:please provide username and password`);
    }else{
        fs.readFile('./db.json',(err,data)=>{
            if(err){
                console.log('error occcuerd', err.message);
            }
             const parsedData=JSON.parse(data);
             let flag=false;
             parsedData.users.map((user,i)=>{
                 if(user.username===body.username && user.password===body.password){
                     flag=true;
                     parsedData.users[i]={...user,token:`token-${user.username}`}
                     res.send(`${200}:Login succesfull, 'token-${user.username}`);
                 }
             })
             if(flag===true){
                fs.writeFile('./db.json',JSON.stringify(parsedData),()=>{
                   JSON.parse(parsedData).users.map((user)=>{
                        if(user.username===body.username){
                            res.send(`${200}:Login succesfull, token-${user.username}`);
                        }
                    })
                })
             }else {
                fs.writeFile('./db.json',JSON.stringify(parsedData),()=>{
                    res.status(401).send(`${401}:Invalid Credentials`);
                 })
             }
        })   
    }

})

authRouter.post('/logout',({body},res)=>{
        fs.readFile('./db.json',(err,data)=>{
            if(err){
                console.log('error occcuerd', err.message);
            }
             const parsedData=JSON.parse(data);
             parsedData.users.map((user,i)=>{
                 if(user.username===body.username && user.password===body.password){
                     parsedData.users[i]={id:user.id,name:user.name,age:user.age,username:user.username,password:user.password,role:user.role};
                 }
             })
                fs.writeFile('./db.json',JSON.stringify(parsedData),()=>{          
                            res.send(`${200}:user logged out successfully`);
                    })
                })
        })   
    
module.exports=authRouter;
