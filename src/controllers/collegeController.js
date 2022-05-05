const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
var validUrl = require('valid-url');

let isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const createCollege = async function (req, res) {
    try {
        let data = req.body

        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, message: "name is required" });
        }

        let uniqueName = await collegeModel.findOne({ name: data.name })

        if (uniqueName) {
            return res.status(400).send({ status: false, message: "please enter unique name" })
        }

        if (!isValid(data.fullName)) {
            return res.status(400).send({ status: false, message: "fullName is required" });
        }

        if (!isValid(data.logoLink)) {
            return res.status(400).send({ status: false, message: "logoLink is required" })
        }

        let isvalidUrl = validUrl.isUri(data.logoLink)

        if (!isvalidUrl) {
            return res.status(400).send({ status: false, message: "please enter a valid logoLink" })
        }

        let savedData = await collegeModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message })
    }
}



const getCollegeDetails = async function (req, res) {
    try {
        let data = req.query.collegeName

        if (!data) {
            return res.status(400).send({ status: false, message: "enter college name in query" })
        }

        let checkCollege = await collegeModel.findOne({ isDeleted: false, name: data })

        if (!checkCollege) {
            return res.status(404).send({ status: false, message: "no college exist with this name/ college has deleted its profile(isDeleted: true)" })
        }

        let checkIntern = await internModel.find({ isDeleted: false, collegeId: checkCollege._id }).select({ name: 1, email: 1, mobile: 1, _id: 1 })

        if (checkIntern.length === 0) {
            return res.status(404).send({ status: false, message: "no interns found for this college/ intern has deleted his/her profile (isDeleted : true)" })
        }

        checkCollege = await collegeModel.findOne({ name: data }).select({ name: 1, fullName: 1, logoLink: 1, interests: 1, _id: 0 })

        checkCollege._doc["interests"] = checkIntern // will make a key inside the object and assign value by equal operator 

        return res.status(200).send({ status: true, data: checkCollege })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message })
    }
}


module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails