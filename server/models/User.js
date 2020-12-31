const mongoose = require('mongoose')

var User = mongoose.model('User',
{
    name : {type:String},
    password : {type:String},
},'user')

module.exports = { User}