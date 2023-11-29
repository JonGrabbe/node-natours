const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    // console.log(con.connections)
    console.log('DB connection successful!')
})

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
})
const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
    name: 'The Forest Camper',
    price: 995,
    rating: 5
})

testTour.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log('ERROR!! ', err)
})

const app = require('./app');

const port = process.env.PORT || 8000;

// console.log(process.env)

app.listen(port, () => {
    console.log('app running on port '+port)
})
