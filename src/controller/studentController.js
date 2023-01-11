const userModel = require("../model/userModel")
const studentModel = require("../model/studentModel")
const jwt = require("jsonwebtoken")
const isValid = mongoose.Type.ObjectId.isValid


const createStudent = async function(req,res){
    try{
        const data =req.body
        const { name, rollno, subject } = data
        if(Object.keys(data).length == 0) return res.status(400).send("please provide data in body")

        if(!name) return res.status(400).send({ status: false, msg: "Please provide the title"})
        if(!rollno) return res.status(400).send({ status: false, msg: "Please provide the rollno"})
        if(!subject) return res.status(400).send({ status: false, msg: "Please provide the subject"})    

        const user = userModel.create(data)
        return res.status(201).send({status:true,data:user})

    }catch(err){
            return res.status(500).send({ msg: err.message })
        }        
}

const getStudents = async function(req,res){
    try{
        let data = req.query
        let {name,subject} = data
        let filter =  {isDeleted :false}
        if(name){filter.name = name}
        if(subject){filter.subject =subject}

        if(Object.keys(data).length ==0){
            let allStudents = await studentModel.find(filter.isDeleted).select({_id:0})
            return res.status(200).send({status:true, data:allStudents})
        }else{filter = await studentModel.find(filter).select({_id:0})
            return res.status(200).send({status:true, data:filter})}
}
catch(err){
    return res.status(500).send({ status: false, message: err.message })
}}

const deleteStudent=async function(req,res){
    try{
        let studentId=req.params.studentId
        if(!isValid(studentId)) return res.status(400).send({status:false,message:"ID is invalid"})
    
        let details = await studentModel.findOneAndUpdate({_id:studentId,isDeleted:false},{isDeleted:true},{new:true})
        if(!details) return res.status(404).send({status:false,message:"No data found"})
    
        return res.status(200).send({status:false,message:"deleted Successfully"})
    
    }catch(error){
        return res.status(500).send({status:false,message:error.messgae})
    }
    }

module.exports ={createStudent,getStudents,deleteStudent}