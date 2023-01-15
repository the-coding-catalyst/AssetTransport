const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
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
    noOfAssets: {
        type: Number,
        required: true
    },
    assetType:{
        type: String,
        required: true
    },
    assetSensitivity: {
        type: String,
        required: true
    },
    toDeliver: {
        type: Number,
        required: true
    },
    applied: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('Request', requestSchema)