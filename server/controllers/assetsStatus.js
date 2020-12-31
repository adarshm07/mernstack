const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { AssetsStatus } = require('../models/assetsStatus')


router.get('/', (req, res) => {
    AssetsStatus.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new AssetsStatus({
        employeeID: req.body.employeeID,
        assetID: req.body.assetID
    })
    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})

// Update Asset Status
router.post('/:id',(req, res) => {
    AssetsStatus.findById(req.params.id)
      .then(assetsStatus => {
        assetsStatus.employeeID = req.body.employeeID
        assetsStatus.assetID = req.body.assetID;
        
        
        assetsStatus.save()
          .then(() => res.json('Asset Status updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


// Delete 
router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

        AssetsStatus.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})

// Get Single data by assetID
router.get('/:id',(req, res) => {
    AssetsStatus.find( { assetID: { $eq:  req.params.id} } )
    .then(asset => res.send(asset))
    .catch(err => res.status(400).json('Error: ' + err));
  });

// Get Single data by employeeID
router.get('/employeeID/:id',(req, res) => {
    AssetsStatus.find( { employeeID: { $eq:  req.params.id} } )
    .then(asset => res.send(asset))
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router