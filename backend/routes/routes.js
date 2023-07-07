const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/register',async (req,res) => {

    const salt = await bcrypt.genSalt(10);
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password
    const hashedPassword = await bcrypt.hash(password,salt)

    const record = await User.findOne({email:email})

    if(record){
        return res.status(400).send({
            message: "Email is already registerd",
        });
    }else{
        const user = new User({
            name:name,
            email:email,
            password:hashedPassword
        })
        const result = await user.save();

        //JWT Token

        const {_id} = await result.toJSON()
        const token = jwt.sign({_id:_id},"secret")

        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:24*60*60*60*1000 // 24H
        })
        res.send({
            message: "success"
        })
    }

})

router.post('/login',async (req,res) => {
    console.log("here")
    res.send("login user")
})


router.get('/user',async (req,res) => {
    res.send("user")
})

router.get('/',async (req,res) => {
    res.send("hello world")
})
module.exports = router;