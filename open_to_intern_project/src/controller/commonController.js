const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validator = require('../validation/validator')


const createCollege = async function (req, res) {
    try {
        const requestBody = req.body
        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters! Please provide College details' })
            return
        }

        
        const { name, fullName, logoLink } = requestBody; 

        
        if (!validator.isValid(name)) {
            res.status(400).send({ status: false, message: 'College name is required' })
            return
        }

        if(await collegeModel.findOne({name: name})) {
            return res.status( 400 ).send({status: false, msg: `The college name '${name}' is already exist`})
        }

        if (!validator.isValid(fullName)) {
            res.status(400).send({ status: false, message: 'College fullName is required' })
            return
        }

        if(validator.isValid(logoLink)) {

            if(!validator.isValidlogoLink(logoLink)) {
                return res.status( 400 ).send({status: false, msg: "Logolink is not valid"})
            }
            
        }else {
            res.status( 400 ).send({status: false, msg: "logoLink is required"})
            return
        }
        
        const college = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, msg: 'College created succefully', data: college })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const createIntern = async function (req, res) {
    try {
        const requestBody = req.body
        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg: "Invalid request parameters! Please provide interns details" })
            return
        }

        const {name,email,mobile,collegeId} = requestBody

        if(!validator.isValid(name)) {
            res.status( 400 ).send({status: false, msg: "Intern name is required"})
            return
        }

        if(validator.isValid(email)) {

            if(!validator.isValidEmail(email)) {
                return res.status( 400 ).send({status: false, msg: "Email shoud be a valid email address"})
            }
            if(await internModel.findOne({email: email})) {
                return res.status( 400 ).send({status: false, msg: "This email is already in use"})
            }
            
        }else {
            res.status( 400 ).send({status: false, msg: "Email Id is required"})
            return
        }

        if(validator.isValid(mobile)) {

            if(!validator.isValidMobile(mobile)) {
                return res.status( 400 ).send({status: false, msg: "Please provide a valid mobile number"})
            }
            if(await internModel.findOne({mobile: mobile})) {
                return res.status( 400 ).send({status: false, msg: "This mobile number is already in use"})
            }
        }else {
            res.status( 400 ).send({status: false, msg: "Mobile number is required"})
            return
        }

        if(!validator.isValidObjectId(collegeId)) {
            res.status( 400 ).send({status: false, msg: `${collegeId} is not a valid college Id`})
            return
        }

        if(!await collegeModel.findOne({$and: [{_id: collegeId},{isDeleted: false}]})) {
            return res.status( 400 ).send({status: false, msg: "The college is not available"})
        } 

        const intern = await internModel.create(requestBody)
        res.status( 201 ).send({status: true, msg: "Intern created successfully", data: intern})

    }catch ( error ) {
        res.status( 500 ).send({status: false, msg: error.message})
    }
}

const getCollegeDetails = async function(req,res) {
    try {

        let dataQuery = req.query
       
        if(Object.keys(dataQuery).length === 0) {
            return res.status( 400 ).send({status: false, msg: "Put some querey first"}) 
        }
    
        let findCollege = await collegeModel.findOne({$and: [dataQuery , {isDeleted: false}]})
    
        if(!findCollege) return res.status( 404 ).send({status: false, msg: "No college found"})
        
        let findInterns = await internModel.find({$and: [{collegeId: findCollege._id.toString()}, {isDeleted: false}]}).select({name: 1, email: 1, mobile: 1})
        
        if(findInterns.length == 0) return res.status( 404 ).send({status: false, msg: "This college has no interns yet!"})
        res.status( 200 ).send({status: true, data: {name: findCollege.name, fullname: findCollege.fullName, logoLink: findCollege.logoLink, interests: findInterns}})
    }catch( error ) {
        res.status( 500 ).send({status: true , msg: error.message})
    }
} 

module.exports = { 
    createCollege,
    createIntern,
    getCollegeDetails 
}