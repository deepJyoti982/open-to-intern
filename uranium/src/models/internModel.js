const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Intern name is required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required field',
        unique: true,
        trim: true,
        validate: {
            validator: function(email){
                return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
            },message:'Please fill a valid email address', isAsync:false
        }
    },
    mobile: {
        type: Number, //min: 10, max: 10,
        required: 'Mobile is a required field',
        unique: true,
        validate: /^(\+\d{1,3}[- ]?)?\d{10}$/
    },
    collegeId: {
        type: ObjectId,
        ref: 'College',
        required: 'College Id is required'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model('Intern', internSchema)

// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
