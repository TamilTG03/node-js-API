

const express=require('express');

const mysql2=require('mysql2');

const app=express();

app.use(express.json());


const db=mysql2.createConnection({

    host:"localhost",
    user:"root",
    password:"root",
    database:"student",
    port:3306

});

db.connect((err)=>{
   
    if(err){
        console.log("Error Connecting DB");
    }else{
        console.log("Connection Success");
    }
    
})


app.get('/getAll',(req,res)=>{

    db.query('select * from student',(err,result)=>{
        if(err){
            res.send({message:"Error getting student"});
        }else{
            res.send(result);
        }
    })

});


app.post('/post',(req,res)=>{

    const {name,email,phone,address}=req.body;
 db.query("insert into student(name,email,phone,address) values(?,?,?,?)",[name,email,phone,address],(err,result,field)=>{
     
    if(err){
        res.send({message:"Error getting student"});
    }else{
        res.send(req.body);
    }

     
    });
})


// app.post("/post",(req,response)=>{
//     const {Name,mark,percentage,res}=req.body;
//     query.query('INSERT INTO tamil(Name,mark,percentage,res) values (?,?,?,?)',[Name,mark,percentage,res],(error,fields,result)=>{
//         response.send({message:"Registered Success"});
//     });
// })



app.get("/getById/:id",(req,res)=>{

    const id=req.params.id;

    console.log(id);

    db.query(`select * from student where id=?`,[id],(err,result,field)=>{

        if(err){
            res.send({message:"Error getting student"});
        }else{
            res.send(result);
        }

    })
 

    

})


app.get("/getbyEmail/:email",(req,res)=>{
    const email=req.params.email;
    console.log(email);
    
    db.query(`select * from student where email=?`,[email],(err,result,field)=>{

        if(err){
            res.send({message:"Error getting student"});
        }else{
            res.send(result);
        }

    })
 })
 app.get("/getbyPhone/:phone",(req,res)=>{
    const phone=req.params.phone;
    console.log(phone);

    db.query(`select * from student where phone=?` ,[phone],(err,result,field)=>{
        if(err){
            res.send({message: "Error getting student"})
        }else{
            res.send(result);
        }
    })

 })
 app.delete("/deletebyID/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id);

    db.query(`delete from student where id=?`,[id],(err,result,field)=>{
        if(err){
            res.send({message:"Error getting student"})
        }else{
            res.send("message deleted");
        }
    })
    
 })


 app.put("/update/:id",(req,res)=>{

    const id=req.params.id;

    const {name,email,phone,address}=req.body;

    db.query(`update student set name = ? , email = ? , phone = ? , address = ? where id = ?`,[name,email,phone,address,id],(err,result,field)=>{

        if(err){
            res.send({message:"Error updating student"})
        }else{
            res.send("Updated Success");
        }

    })



 })
 app.put('/singlevalueupdate/:id',(req,res)=>{

    const id=req.params.id;
    const {name}=req.body;
    db.query('update student set name = ? where id=?',[name,id],(err,result,field)=>{
        if(err){
            res.send({message:"update error"})
        }else{
            res.send({message:"update succesfuly"})
        }
    })

 })



app.listen(3000,()=>{
    console.log("App listening port:3000");
    
});




