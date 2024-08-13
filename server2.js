const express=require('express')
const mysql2=require('mysql2')
const app=express();

app.use(express.json())

const db=mysql2.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"root",
        database:"student",
        port:"3306"
    }
)

db.connect((err)=>{
    if(err)
    {
        console.log("connection err");
        
    }
    else{
        console.log("connection sucess");
        
    }
})
app.get('/getAll',(req,res)=>{
    db.query('select * from student',(err,result)=>{
        if(result){
            res.send(result)
            console.log(typeof(result));
            
        }else{
            res.send({message:"err"})
        }
    })
})



app.post('/post',(req,res)=>{
    const {name,email,phone,address}=req.body;
    db.query('insert into student(name,email,phone,address) values(?,?,?,?)',[name,email,phone,address],(err,result,field)=>{
        if(err){
            res.send({message:"post err"})
        }else{
            res.send({message:"sucess"})
        }
    })
})


app.listen(3000,()=>{
    if(3000)
    {
        console.log("applision");
        
    }else{
        console.log("lison err");
        
    }
})


