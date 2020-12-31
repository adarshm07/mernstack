const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { User } = require('../models/User')


router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new User({
        name: req.body.name,
        password: req.body.password
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})


// Get Single data by employeeID
router.get('/:name',(req, res) => {
    User.find( { name: { $eq:  req.params.name} } )
    .then(asset => res.send(asset))
    .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router