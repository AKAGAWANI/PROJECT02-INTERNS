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
    let checkCollege = await collegeModel.findOne({name : data}) //.select({name: 1, fullName : 1, logoLink : 1, interests: 1, _id: 0})
    // console.log(checkCollege)
    // console.log(checkCollege._id)
    let checkIntern = await internModel.findOne({collegeId : checkCollege._id}).select({name: 1, email : 1, mobile : 1, _id: 1})

    let updatedInterests = checkCollege.interests
    updatedInterests.push(checkIntern)

    // console.log(updatedInterests[0]._id)
    // updatedInterests.push(checkIntern)

//     for (i=0; i<updatedInterests.length; i++){
    
//     if (updatedInterests[i] == undefined){
//         updatedInterests = updatedInterests.push(checkIntern)
//     }
//     if (updatedInterests[i]._id !== checkIntern._id){
//         updatedInterests =  updatedInterests.push(checkIntern) 
//     }
//     // if (updatedInterests[i]._id == checkIntern._id){
//     //     updatedInterests = updatedInterests
//     // } 
// }
    
    let updatedCollegeIntern = await collegeModel.findOneAndUpdate({name : data}, {interests : updatedInterests}, {new: true}).select({name: 1, fullName : 1, logoLink : 1, interests: 1, _id: 0})

    res.status(200).send({data : updatedCollegeIntern })
}


module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getCollegeDetails = getCollegeDetails