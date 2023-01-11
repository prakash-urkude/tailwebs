const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

const createUser = async function(req,res){
    try{
        const data =req.body
        const { name, email, password } = data
        if(Object.keys(data).length == 0) return res.status(400).send("please provide data in body")

        if(!name) return res.status(400).send({ status: false, msg: "Please provide the title"})
        if(!email) return res.status(400).send({ status: false, msg: "Please provide the title"})
        if(!password) return res.status(400).send({ status: false, msg: "Please provide the title"})    

        const user = userModel.create(data)
        return res.status(201).send({status:true,data:user})

    }catch(err){
            return res.status(500).send({ msg: err.message })
        }        
}

const login = async function(req,res){
    try{
    let data = req.body
    const {email,password} = data

    if(!email) return res.status(400).send({ status: false, msg: "Please provide the title"})
    if(!password) return res.status(400).send({ status: false, msg: "Please provide the title"}) 

    const user = await userModel.findOne({email:email,password:password})
    if(user){ const token = jwt.sign({userId:user._id},'tailwebs')}
    res.header("x-api-keys",token)
    return res.status(200).send({ status: true, token: token })
}
catch(err){
    return res.status(500).send({ status: false, message: err.message })
}}



models.exports ={createUser,login}