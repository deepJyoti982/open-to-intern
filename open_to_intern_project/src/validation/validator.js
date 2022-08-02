const { default: mongoose } = require("mongoose")


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

const isValidEmail = function (email) {

    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
        return false
    }
    return true
}

const isValidMobile = function (mobile) {

    if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))) {
        return false
    }
    return true
}

const isValidlogoLink = function (logoLink) {

    if (!(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(logoLink))) {
        return false
    }
    return true
}

module.exports = {
    
    isValid,
    isValidRequestBody,
    isValidObjectId,
    isValidEmail,
    isValidMobile,
    isValidlogoLink

}
