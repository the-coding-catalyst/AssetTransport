const express = require('express')
const { createARequest, seeAllRequests, getMatchedRequests, applyARequest } = require('../controllers/requestor-controller')
const requestRouter = express.Router()

requestRouter.post("/create", createARequest)
// requestRouter.get("/all",)
requestRouter.get("/all", seeAllRequests)
requestRouter.get("/match", getMatchedRequests)
requestRouter.post("/apply", applyARequest)

module.exports = requestRouter