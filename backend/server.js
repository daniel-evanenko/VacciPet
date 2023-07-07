const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
const URI = "mongodb://localhost:27017/vaccipet"
const PORT = 3000;
const app = express()

app.use(cors({
    credentials:true,
    origin:['*']
}))
app.use(cookieParser())

app.use(express.json())

app.use("/api",routes)

mongoose.connect(URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>{
    console.log('> Connected to database');
    app.listen(PORT,()=>{
        console.log("app is listening on port " + PORT);
    })
})
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))



