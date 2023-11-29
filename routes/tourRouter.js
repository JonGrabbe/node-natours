const express = require('express');
const Router = express.Router();
const fs = require('fs')
const data = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const tourController = require('./../controllers/tourControllers');

// const data = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

Router.param('id', (req, res, next, val) => {
    console.log('tour id is :'+val)
    if(val * 1 > data.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID!!!'
        })
    }
    next()
})

// check body

Router
    .route('/:id')
    .get(tourController.checkBody, tourController.getTours)

Router
    .route('/')
    .post(tourController.addTour)

module.exports = Router;