const express=require("express");
const path=require("path");
const mongoose = require('mongoose');
const { stringify } = require("querystring");

const bodyParser=require("body-parser");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/talentservedb');
}

var DataSchema = new mongoose.Schema({
    name: String,
    id: Number,
    role: String,
    instagram: String,
    facebook: String,
    linkedin: String,
    twitter: String
  });

var Entry = mongoose.model('Entry', DataSchema);

const app=express();
const port=5500;
app.use("/static",express.static('static'));
app.use(express.urlencoded());
app.set('view engine','pug')
app.set('views',path.join(__dirname,"views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.render("home.pug")
})
app.post('/', (req , res)=>{
    var mydata = new Entry(req.body);
    mydata.save().then(()=>{
        res.render("home.pug");
    }).catch(()=>{
        res.status(400).send("There was some problem ,Please submit again")
    });
})

app.listen(port,()=>{
    console.log("Running.....")
})