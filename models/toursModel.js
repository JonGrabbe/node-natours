const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a group size']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
        default: 300
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;