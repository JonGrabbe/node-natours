const express = require('express');
const Router = express.Router();
// const fs = require('fs')
const tourController = require('./../controllers/tourControllers');

// const data = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));



// app.patch('/api/v1/tours/:id', (req, res) => {
//     if((req.params.id * 1) < data.length) {
//         return res.status(404).json({
//             status: 'success',
//             data: {
//                 tours: data
//             }
//         })
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<updated tour here>'
//         }
//     })
// })
Router.param('id', (req, res, next, val) => {
    console.log('tour id is :'+val)
    next()
})

Router
    .route('/:id')
    .get(tourController.getTours)

Router
    .route('/')
    .post(tourController.addTour)

module.exports = Router;