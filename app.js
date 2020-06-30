var express = require("express")
var app = express()
require("dotenv").config()
var path = require("path")
require("ejs")
var bodyParser = require("body-parser")
var apiRouter = require('./routes/Router')
const mongoose = require("mongoose")

var pw = process.env.PASSWORD
var url = `mongodb+srv://root:${pw}@cluster0.8n4pr.mongodb.net/Mydb?retryWrites=true&w=majority`
mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true})

//세팅
app.set('views',path.resolve(__dirname+'/views'))//__dirname 현재 디렉토리
//console.log(process.cwd())//process.cwd()도 현재 디렉토리
app.set('view engine','ejs')

//미들웨어
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname,+'.public'));
app.use(bodyParser.json())

//routing파일 등록
app.use('/',apiRouter)

const port = process.env.PORT
app.listen(port,function(){
    console.log(`Server is Starting at http://localhost:${port}`)
})