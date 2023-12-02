const fs = require('fs')
const Tour = require('../models/toursModel')

// const data = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkID = (req, res, next, val) => {
    // if(req.params.id * 1 > data.length) {
    //     console.log('invalid id')
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     })
    // }
    // next()
// }

exports.checkBody = (req, res, next) => {
    console.log(req.body.name)
    console.log(req.body.price)
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next()
}

exports.addTour = async (req, res) => {
    // const newId = data[data.length - 1].id + 1;
    // const newTour = Object.assign({id: newId}, req.body);

    // fs.writeFile(JSON.stringify(`${__dirname}/../dev-data/data/tours-simple.json`), JSON.stringify(data), err => {
    //     res.status(201).json({
    //         status: 'success',
    //         data: {
    //             tour: newTour
    //         }
    //     })
    // })

    try {
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }

}

exports.getTours = (req, res) => {
    console.log(req.body)
    console.log(req.requestTime)

    const id = req.params.id * 1;
    const tour = data.find(el => el.id === id)

    // if(id > data.length - 1) {
    //     res.status(404).json({
    //         status: 'success',
    //         requestTime: req.requestTime,
    //         message: 'Invalid ID'
    //     })
    // }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}