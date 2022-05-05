const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({

name : {
    type : String,
    require: true,
    trim : true
},
email : {
    type : String,
    require : true, 
    unique: true
},
mobile : {
    type: String,
    require: true,
    unique: true
},
collegeId : {
    type:  mongoose.Schema.Types.ObjectId,
    ref : 'college'
},
isDeleted : {
    type : Boolean,
    default: false
}

}, {timestamps: true});

module.exports = mongoose.model('Intern', internSchema)