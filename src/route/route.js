const express = require('express')
const router = express.Router()
const userController=require('../Controller/teacherController')
const studentController=require('../Controller/studentController')
const auth=require('../middleware/auth')

router.post('/createUser',createTeacher)
router.post('/login',login)

router.post('/createstudent/:userId',auth.authentication,studentController.createStudent)
router.get('/getstudent',auth.authentication,studentController.getStudents)
router.put('/updatemarks/:studentId',auth.authentication,studentController.updateStudent)
router.delete('/deletestudent/:studentId',auth.authentication,studentController.deleteStudent)

router.all('/*',function(req,res){
    return res.status(404).send({messgae:"Invalid http request"})
})


module.exports = router
