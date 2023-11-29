const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRouter')

app.use(express.json())


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.static(`${__dirname}/public`))

// console.log(app.get('env'))

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


module.exports = app;