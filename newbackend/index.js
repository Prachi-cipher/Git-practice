const express = require('express')
// import express from 'express'

const app = express()


app.get("/api" , (req,res)=>{
    res.send("hello world")
})
app.get("/api/hello" , (req,res)=>{
    res.send("hello")
})
app.get("/api/hell" , (req,res)=>{
    res.send("hello")
})
app.get("/api/bell" , (req,res)=>{
    res.send("hello")
})
app.get("/api/sell" , (req,res)=>{
    res.send("hello")
})
// app.get("/api/:id" , (req,res)=>{
//     const {id} =  req.params
//     res.send(id)

// })

app.listen(3000 ,()=> {
    console.log("server is running on 3000")
})