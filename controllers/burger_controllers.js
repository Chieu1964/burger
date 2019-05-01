// Dependencies:
var express = require('express');
// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required
var router = express.Router();

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Add new burger to the db
router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], [
            req.body.burger_name, req.body.devoured
        ], function (result) {
            res.json({ id: result.insertId });
        });
});

// Set burger devoured status to true:
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows === 0) {
            // If no row was changed, then the ID must not exit, error 404.
            // http status 404: page not found, or server not found.
            return res.status(404).end();
        } else {
            // http status 200 means "the request has succeeded"
            res.status(200).end();
        }
    });
});

// Delete burger from db:
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function (result) {
        if (result.changedRows === 0) {
            // Iff no row was changed, then the ID must not exist.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use
module.exports = router;


//==== Recalls: ====

//GET requests read data from a database.
// POST requests are used to create new data into a database.
// PUT requests are used to update a row within a database.
// DELETE requests are used to delete a row from a database.

// http status 200 means "the request has succeeded"
// http status 404: page not found, or server not found. 
