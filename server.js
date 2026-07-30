import express from "express"; 
import studentRoutes from "./routes/studentRoutes.js"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors" 
import authRoutes from "./routes/authRoutes.js"
dotenv.config();

// middleware:converts json-object
const app=express();
//deployment configuration
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true
    })
);

app.use(express.json())
app.use(cors());//allow all origins for development
//config for loading static files
//with this images cannot be loaded
app.use("/uploads",express.static("uploads"))
//call connection db
connectDB();

//studentRoutes
app.use("/students",studentRoutes)
app.use("/home",studentRoutes)
//authentication route
app.use("/auth",authRoutes)
// app.use("/company",companyRoutes)

// // const express= require("express");
// let students=[
//     {
//     id:101,
//     StudentName:"Meghana",
//     email:"meghana@gmail.com",
//     branch:"CSE",
//     cgpa:9.0,
//     },
//     {
//     id:102,
//     StudentName:"sahasra",
//     email:"sahasra@gmail.com",
//     branch:"CSM",
//     cgpa:9.0,
//     },
//     {
//     id:103,
//     StudentName:"gayathri",
//     email:"gayathri@gmail.com",
//     branch:"CSD",
//     cgpa:9.0,
//     }
// ]
// //middleware :convert json-js object
// app.use(express.json()) //express cannot understand the json,acts as middleware to convert json object

// app.get("/students",(req,res)=>{
//     res.json(students);
// });
// app.get("/students/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     const student = students.find((student) => student.id === id);
//     res.json(student);
// });
// app.post("/students",(req,res)=>{
//     const student=req.body;
//     //req.body consist of react form data
//     students.push(student);
//     res.status(201).json({
//         message:"Student Added",
//     });
// });
// console.log(students)
// //create an array named as companies
// //store 2 companies
// //id,name,num_of_emp
// //create a route with POST
// //test with postman
// let companies=[
//     {
//         "id":100,
//         "name":"Accenture",
//         "num_of_emp":5
//     },
//     {
//         "id":101,
//         "name":"TCS",
//         "num_of_emp":10
//     }
// ]
// app.use(express.json())

// app.get("/companies",(req,res)=>{
//     res.json(companies);
// });
// app.get("/companies/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     const company = companies.find((company) => company.id === id);
//     res.json(company);
// });
// app.post("/companies",(req,res)=>{
//     const company=req.body;
//     //req.body consist of react form data
//     students.push(company);
//     res.status(201).json({
//         message:"company Added",
//     });
// });
// console.log(companies)


// app.get("/home",(req,res)=>{
//     res.send("This is my home page with nodemon ");
// });
// //task:when i visit home page get your name
// app.get("/",(req,res)=>{
//     res.send("Meghana sree");
// });
// app.get("/company",(req,res)=>{
//     res.send("This is my company page");
// });
app.listen(8000,()=>{
    console.log("server is started at 8000");
});
