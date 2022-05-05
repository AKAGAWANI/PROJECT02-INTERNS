const internModel = require('../models/internModel')


let isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };


let isValidObjectId = function (objectId) { return mongoose.Types.ObjectId.isValid(objectId) }


const createIntern = async function (req, res) {
    let data = req.body
    if (!isValid(data.name)) {
        return res.status(400).send({ status: false, msg: "name is required" });
    }
    if (!isValidObjectId(collegeId)) {
        return res.status(400).send({ status: false, msg: "collegeId is incorrect" });
      }
    let savedData = await internModel.create(data)
    res.status(201).send({status: true, data : savedData})
}



module.exports.createIntern = createIntern