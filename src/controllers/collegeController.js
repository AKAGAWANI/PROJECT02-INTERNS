const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

let isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

//   let isValidObjectId = function (objectId) { return mongoose.Types.ObjectId.isValid(objectId) }


const createCollege = async function (req, res) {
    let data = req.body
    if (!isValid(data.name)) {
        return res.status(400).send({ status: false, message: "name is required" });
    }
    if (!isValid(data.fullName)) {
        return res.status(400).send({ status: false, message: "fullName is required" });
    }
    let savedData = await collegeModel.create(data)
    res.status(201).send({status: true, data : savedData})
}



const getCollegeDetails = async function (req, res) {
    let data = req.query.collegeName

    if (!data) {
        res.status(400).send({status:false, message: "enter college name in query"})
    }

    let checkCollege = await collegeModel.findOne({name : data}) 

    if (!checkCollege){
        res.status(404).send({status: false, message : "no college found with this name" })
    }

    let checkIntern = await internModel.find({collegeId : checkCollege._id}).select({name: 1, email : 1, mobile : 1, _id: 1})
    
    if (!checkIntern){
        res.status(404).send({status: false, message : "no intern found" })
    }

    checkCollege = await collegeModel.findOne({name : data}).select({name: 1, fullName : 1, logoLink : 1, interests : 1, _id: 0})

    checkCollege._doc["interests"] = checkIntern // will make a key inside the object and assign value by equal operator 

    res.status(200).send({status : true, data : checkCollege})

}


module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails