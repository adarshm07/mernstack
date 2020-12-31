const mongoose = require('mongoose')

var AssetsStatus = mongoose.model('AssetsStatus',
{
    employeeID : {type:String},
    assetID : {type:String}
},'assetsStatus')

module.exports = { AssetsStatus}