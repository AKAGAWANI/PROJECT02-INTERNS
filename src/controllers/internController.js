const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
var validator = require('email-validator')


let isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };


// let isValidObjectId = function (objectId) { return mongoose.Types.ObjectId.isValid(objectId) }


const createIntern = async function (req, res) {
  try {  
  let data = req.body

    if (!isValid(data.name)) {
        return res.status(400).send({ status: false, msg: "name is required" });
    }

    if (!isValid(data.email)){
      return res.status(400).send({status : false, message : "email is required"})
    }

    let isValidEmail = await validator.validate(data.email)

    if (!isValidEmail){
      return res.status(400).send({status: false, message: "email is not valid"})
    }

    let isUniqueEmail = await internModel.findOne({email:data.email })
    
    if (isUniqueEmail) {
      return res.status(400).send({status: false, message : "email already exists/ Not unique"})
    }

    if (!isValid(data.mobile)){
      return res.send({status: false, message: "mobile number is required"})
    }
    
    let validMobile = data.mobile

    if (validMobile.length !== 10){
      return res.status(400).send({status: false, message: "mobile number has to be of 10 digit"})
    }

    let isUniqueMobile = await internModel.findOne({mobile : data.mobile})

    if (isUniqueMobile) {
      return res.status(400).send({status: false, message : "mobile number already exists/ Not unique"})
    }

    let collegeId = data.collegeId
    
    if (collegeId.length !== 24 ){
      return res.status(400).send({status: false, message: "id has to be minimum 24 in length"})
    }

    let isValidCollegeId = await collegeModel.findOne({ _id : data.collegeId})

    if (!isValidCollegeId) {
      return res.status(400).send({status: false, message: "This college Id doesn't exist"})
    }
   
    // if (!isValidObjectId(collegeId)) {
    //     return res.status(400).send({ status: false, msg: "collegeId is incorrect" });
    //   }

    let savedData = await internModel.create(data)
    res.status(201).send({status: true, data : savedData})
} catch (err) {
    console.log(err.message)
    res.status(500).send({ error: err.message })
  }
}



module.exports.createIntern = createIntern