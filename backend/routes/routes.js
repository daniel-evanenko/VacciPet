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
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).send({
            message: "User not found"
        })
    }
    if(!(await bcrypt.compare(req.body.password,user.password))){
        return res.status(400).send({message: "Password is incorrect"})
    }

    const token = jwt.sign({_id:user._id},"secret")

    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:24*60*60*60*1000 // 24H
    })

    res.send({
        message:"login success!"
    })
})


router.get('/user',async (req,res) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie,"secret")
        if(!claims){
            return res.status(401).send({
                message:"Unauthenticated"
            })
        }

        const user = await User.findOne({_id:claims._id})
        const {password,...data} = await user.toJSON();
        res.send(data);
    } catch (error) {
        res.status(401).send({
            message:"Unauthenticated"
        })
    }
})

router.post('/logout',async (req,res) => {
    res.cookie('jwt',"",{maxAge:0})
    res.send({
        message:'logout successfuly'
    })
})
module.exports = router;
