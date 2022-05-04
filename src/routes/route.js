const express = require('express')
const router = express.Router()
const allController = require('../controllers/allController')

router.post('/colleges', allController.createCollege)

router.post('/interns', allController.createIntern)

router.get('/collegeDetails', allController.getCollegeDetails)




module.exports = router