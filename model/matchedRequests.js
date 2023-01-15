const mongoose = require('mongoose')

const matchedSchema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model("MatchedRequests", matchedSchema)