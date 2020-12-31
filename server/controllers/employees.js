const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { Employees } = require('../models/Employees')

// Get All Employees
router.get('/', (req, res) => {
    Employees.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})
// Add Employee
router.post('/', (req, res) => {
    var newRecord = new Employees({
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})

// Update Employee
router.post('/:id',(req, res) => {
    Employees.findById(req.params.id)
      .then(employee => {
        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.profession = req.body.profession;
        
        employee.save()
          .then(() => res.json('employee updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Delete Employee
router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

        Employees.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})

// Get Single Employee data
router.get('/:id',(req, res) => {
    Employees.findById(req.params.id)
      .then(employee => res.send(employee))
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router