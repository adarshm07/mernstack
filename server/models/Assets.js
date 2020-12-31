const mongoose = require('mongoose')

var Assets = mongoose.model('Assets',
{
    name : {type:String},
    stock : {type:Number},
},'assets')

module.exports = { Assets}