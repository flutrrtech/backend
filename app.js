const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
app.use(bodyParser({urlencoded:true}));
app.use(express.json());
require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://admin:fLuTrrMonGo121@162.214.158.195:27017/flutrr", {
    useNewUrlParser: true,
   useUnifiedTopology: true
})

  .then(client => {
    console.log("Connected to Database");
  })

//cron jobs
//var mtCron=require("./cronjob/mtCronjob")
// var mtboostcron=require('./cronjob/boostCron')
// var topPickCron=require('./cronjob/topPickCron')

//
// app.use(express.static(__dirname + 'uploads'));
app.use(express.static('uploads'))
app.use("/api/user",require('./routes/userRoutes'))
app.use("/api/mt",require('./routes/mtRoutes'))
var port =process.env.PORT||3001
  app.listen(port, () => {
    console.log('listening on 3000')
  })