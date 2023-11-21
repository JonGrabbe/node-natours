const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRouter')

app.use(express.json())

app.use(morgan('dev'))

// app.get('/', (req, res) => {
//     console.log('hi everybody')
//     res.status(404).json({'message': 'hello from the server lol', 'app': 'hahahah omg'})
// })

// const data = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.use((req, res, next) => {
    console.log('hellow from the middlewhare');
    req.requestTime = new Date().toISOString();
    next()
})

app.use('/api/v1/tours', tourRouter)

// app.route('/api/v1/tours/:id')
//     .get(getTours)

// app.route('/api/v1/tours/')
//     .post(addTour)

// app.route('/api/v1/users')
//     .get()



module.exports = app;