var express = require("express");
var router = express.Router();
var User = require("../models/User")
var name = {
    a:"jyj",
    b:"대전",
    c:"광역시"
}

router.get('/',function(req,res,next){
    //next메소드 실행 시 function이 다음 연결된 함수를 바로 실행해줌
    User.find((err,result)=>{
        if(err){
            console.log(err)
        } 
        res.render('index',{data:result})
    })
    
})

router.get('/signup',(req,res,next)=>{
    res.render('signup')
})
router.post('/signup',(req,res,next)=>{
    var contact = new User()//형식 선언
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err,result)=>{
        if(err){

        }
        console.log(result)
    })
})

router.post('/insert',(req,res,next)=>{
    var contact = new User()//형식 선언
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err,result)=>{
        if(err){

        }
        res.send("Sucess")
    })

})
router.get('/login',(req,res,next)=>{
    res.render('login')
})

router.post('/login',async (req,res,next)=>{
    var username = await req.body.username
    var passwordHash = await req.body.passwordHash

    await User.findOne({username:username}, (err,user)=>{
        if(err){
            console.log(err)
        }
        if(!user) {
            res.send(`${username}is no exist`)
        } else{
            if(user.passwordHash == passwordHash){
                //res.send(`Welcom to my World ${username}`)
                res.render('index.ejs',{data:username})
            } else{
                res.send(`${username}'s password is wrong`)
            }
         }
    })
})

module.exports = router;