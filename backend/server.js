const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
const URI = "mongodb://localhost:27017/vaccipet"
const PORT = 3000;
var whitelist = ['http://localhost:4200', 'http://localhost:8080']; //white list consumers

const app = express()
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
  };
  
  app.use(cors(corsOptions));
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



