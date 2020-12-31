const mongoose = require('mongoose')

var Employees = mongoose.model('Employees',
{
    name : {type:String},
    email : {type:String},
    profession: {type:String}
},'employees')

module.exports = { Employees}