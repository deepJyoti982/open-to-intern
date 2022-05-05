const { default: mongoose } = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'college name is required',
        unique: true,
        uppercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: 'Full name is required',
        trim: true
    },
    logoLink: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model('College',collegeSchema)


// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }