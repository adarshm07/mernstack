const express = require("express");
var router = express.Router();
var ObjectID = require("mongoose").Types.ObjectId;

var { Assets } = require("../models/Assets");

// Get all Assets
router.get("/", (req, res) => {
  Assets.find((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while retrieving all records : " +
          JSON.stringify(err, undefined, 2)
      );
  });
});

// Add Assets
router.post("/", (req, res) => {
  var newRecord = new Assets({
    name: req.body.name,
    stock: Number(req.body.stock),
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while creating new record : " + JSON.stringify(err, undefined, 2)
      );
  });
});

// Update Assets
router.post("/:id", (req, res) => {
  Assets.findById(req.params.id)
    .then((asset) => {
      asset.name = req.body.name;
      asset.stock = req.body.stock;
      asset
        .save()
        .then(() => res.json("asset updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//   Delete Assets
router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id : " + req.params.id);

  Assets.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while deleting a record : " + JSON.stringify(err, undefined, 2)
      );
  });
});

// Get Single Employee data
router.get("/:id", (req, res) => {
  Assets.findById(req.params.id)
    .then((asset) => res.send(asset))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;