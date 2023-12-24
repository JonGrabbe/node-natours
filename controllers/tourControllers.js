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

exports.getTour = async (req, res) => {
    // console.log(req.body)
    // console.log(req.requestTime)

    // const id = req.params.id * 1;
    // const tour = data.find(el => el.id === id)

    // if(id > data.length - 1) {
    //     res.status(404).json({
    //         status: 'success',
    //         requestTime: req.requestTime,
    //         message: 'Invalid ID'
    //     })
    // }

    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getAllTours = async (req, res) => {
    try {
        // console.log(req.query)
        const queryObj = {...req.query}
        const excluededFields = ['page', 'sort', 'limit', 'fields']
        excluededFields.forEach(el => delete queryObj[el])

        // advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        // console.log(JSON.parse(queryStr))

        // console.log(req.query, queryObj)

        queryStr = JSON.parse(queryStr)
        let query = Tour.find(queryStr)

        // sorting
        console.log(req.query.sort)
        if(req.query.sort) {
            let sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // query limiting
        if(req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        // pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit)
        // const ToursNum = await Tour.countDocuments();
        //     console.log(ToursNum)

        if(req.query.page) {
            const ToursNum = Tour.countDocuments();
            console.log(ToursNum)
            if(skip >= ToursNum) throw new Error('This page does not exist');
        }

        // run query
        const tours = await query;
        console.log(tours.length, ' tours length')
    
        res.status(200).json({
            status: 'success',
            data: {
                tours
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteOne = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}