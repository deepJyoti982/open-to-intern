const express=require('express')
const router = express.Router()
const commonController = require('../controller/commonController')

router.post('/functionup/colleges', commonController.createCollege)
router.post('/functionup/interns', commonController.createIntern)
router.get('/functionup/collegeDetails', commonController.getCollegeDetails)




module.exports=router