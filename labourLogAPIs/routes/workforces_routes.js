var express = require('express');
var router = express.Router();
var Workforce = require('../models/workforces');

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        //console.log(req.params.id);
        Workforce.getWorkforceById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {
        Workforce.getAllWorkForces(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        })
    }
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    Workforce.addWorkforce(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.status(201).send(`Workforce added with ID: ${rows.insertId}`);
        }
    });
});

router.put('/:id', function (req, res, next) {
    Workforce.editWorkforce(req.body, req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }

        else {
            res.json(rows);
            //res.status(201).send(`Workforce added with ID: ${rows.insertId}`);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    Workforce.deleteWorkforce(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
})

module.exports = router;