const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')



const createCollege = async function (req, res) {
    let data = req.body
    let savedData = await collegeModel.create(data)
    res.status(201).send({status: true, data : savedData})
}

const createIntern = async function (req, res) {
    let data = req.body
    let savedData = await internModel.create(data)
    res.status(201).send({status: true, data : savedData})
}

const getCollegeDetails = async function (req, res) {
    let data = req.query.collegeName
    let checkCollege = await collegeModel.findOne({name : data}) 

    let checkIntern = await internModel.find({collegeId : checkCollege._id}).select({name: 1, email : 1, mobile : 1, _id: 1})
    
    checkCollege = await collegeModel.findOne({name : data}).select({name: 1, fullName : 1, logoLink : 1, interests : 1, _id: 0})

    checkCollege._doc["interests"] = checkIntern

    res.status(200).send({status : true, data : checkCollege})

}


module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getCollegeDetails = getCollegeDetails