const express = require('express')
const { addTravelInfo, shareTravelInfo } = require('../controllers/rider-controller')
const riderRouter = express.Router()

riderRouter.post("/create", addTravelInfo)
riderRouter.get("/all", shareTravelInfo)

module.exports = riderRouter