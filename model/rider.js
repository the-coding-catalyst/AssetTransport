const mongoose = require('mongoose')

const riderSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: Date,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    }
    
})

module.exports = mongoose.model('Rider', riderSchema)