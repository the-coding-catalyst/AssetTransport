const express = require('express')
const requestRouter = require('./Routes/requestor-router')
const app = express()
const mongoose = require('mongoose')
const riderRouter = require('./Routes/rider-route')

mongoose.connect('mongodb+srv://ramit:ramit@cluster0.8fdlu.mongodb.net/test?retryWrites=true&w=majority', (err)=>{
    console.log("connected to db") 
})
app.use(express.json())
app.use("/request", requestRouter)
app.use("/rider", riderRouter)


app.listen(process.env.port || 5001, () => {console.log("server started at port 5001")})