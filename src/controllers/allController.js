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
    let data = req.query
    let checkDB = await collegeModel.find(data)
    // let savedData = await internModel.find({collegeId : checkDB._id})
    // checkDB.interest = "jai"
    res.status(200).send({data : checkDB })
}


module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getCollegeDetails = getCollegeDetails