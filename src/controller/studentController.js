const userModel = require("../model/userModel")
const studentModel = require("../model/studentModel")
const jwt = require("jsonwebtoken")
const isValid = mongoose.Type.ObjectId.isValid


const createStudent = async function(req,res){
    try{
        const data =req.body
        let userId = req.params.userId
        const { name, rollno, subject, marks } = data
        if(Object.keys(data).length == 0) return res.status(400).send("please provide data in body")

        let User=await teacherModel.findById({_id:userId})
        if(!User) return res.status(404).send({status:false,message:"user not found"})

        if(!name) return res.status(400).send({ status: false, msg: "Please provide the title"})
        if(!rollno) return res.status(400).send({ status: false, msg: "Please provide the rollno"})
        if(!subject) return res.status(400).send({ status: false, msg: "Please provide the subject"})
        if(!marks) return res.status(400).send({ status: false, msg: "Please provide the marks"})    

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

const updateStudent = async function(req,res){
    try{
        let studentId = req.params.studentId
        let data = req.body
        let {name , subject, rollno ,marks} =data

        if(!isValid(studentId)) return res.status(400).send({status:false,message:"ID is invalid"})
        let student= await studentModel.findById({studentId})
        if(!student) return res.status(400).send("student not present with this id")
        
        if(Object.keys(data).length==0) return res.status(400).send("please provide data in body")
        else{if(name && subject){
            let updateStudent= await studentModel.findOne({_id:studentId,name:name,subject:subject,isDeleted:false},{marks:(student.marks+marks)},{new:true})
            return res.status(200).send({status:true,message:"Marks added",data:updateStudent})
        }else{let createStud=await studentModel.create(data)
            return res.status(201).send({status:true,message:"Success",data:createStud})}}}
catch(err){
        return res.status(500).send({status:false,message:error.messgae})
    }
}

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

module.exports ={createStudent,getStudents,updateStudent,deleteStudent}