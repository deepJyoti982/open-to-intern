const { default: mongoose } = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createCollege = async function (req, res) {
    try {
        const requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters! Please provide College details' })
            return
        }

        //Extract Params
        const { name, fullName, logoLink } = requestBody; //object destructuring

        //Validation starts
        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'College name is required' })
            return
        }

        if (!isValid(fullName)) {
            res.status(400).send({ status: false, message: 'College fullName is required' })
            return
        }

        if (!isValid(logoLink)) {
            res.status(400).send({ status: false, message: 'Logolink is required' })
            return
        }
        //validation ends
        const college = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, msg: 'College created succefully', data: college })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const createIntern = async function (req, res) {
    try {
        const requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg: "Invalid request parameters! Please provide college details" })
            return
        }

        const {name,email,mobile,collegeId} = requestBody

        if(!isValid(name)) {
            res.status( 400 ).send({status: false, msg: "Intern name is requuired"})
            return
        }

        if(isValid(email)) {

            if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))){
                res.status(400).send({status:false, message: `Emial should be a valid email address`})
                return
            }
        }else {
            res.status( 400 ).send({status: false, msg: "Email Id is required"})
            return
        }

        if(isValid(mobile)) {

            if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))) {
                res.status( 400 ).send({status: false, msg: "Mobile number is not valid"})
                return
            }
        }else {
            res.status( 400 ).send({status: false, msg: "Mobile no is required"})
            return
        }

        if(!isValidObjectId(collegeId)) {
            res.status( 400 ).send({status: false, msg: `${collegeId} is not a valid college Id`})
            return
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
    
        let findCollege = await collegeModel.findOne({$and: [dataQuery , {isDeleted: false}]}) //.select({name: 1, fullName: 1, logoLink:1, _id: 0})
    
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