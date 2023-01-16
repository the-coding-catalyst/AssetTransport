const Request = require('../model/request')
const Rider = require('../model/rider')
const MatchedRequests = require("../model/matchedRequests")
const request = require('../model/request')

const createARequest = async (req, res, next) => {
    // console.log(req)
    console.log(req.query)
    const {from, to, dateAndTime, noOfAssets, assetType, assetSensitivity, toDeliver} = req.body
    const validAssets = ["LAPTOP", "TRAVEL_BAG", "PACKAGE"]
    const validAssetSensitivity = ["HIGHLY_SENSITIVE", "SENSITIVE", "NORMAL"]
    if(!validAssets.includes(assetType) || !validAssetSensitivity.includes(assetSensitivity))
    return res.status(400).json({message: "Asset type or sensitivity is invalid"})
    let newRequest = new Request({from, to, dateAndTime, noOfAssets, assetType, assetSensitivity, toDeliver, status: "pending", applied: false})
    await newRequest.save()
    return res.status(201).json({message: "Requeste created"})
}

const seeAllRequests = async (req, res, next) => {
    let allRequests
    try{
        allRequests = await Request.find(req.query).sort({dateAndTime: 1}).limit(5)
    }catch(err){
        return res.status(500).json(err)
    }
    const result = []
    const currentTime = new Date()
    for (const key in allRequests) {
        let request = allRequests[key]
        if(request.dateAndTime > currentTime)
        request.status = "Expired"
        result.push(request)
    }

    return res.status(200).json(result)
}

async function matchedRequests(req){
    let riderInfo
    let allRequests
    try{
        riderInfo = await Rider.find()
        allRequests = await Request.find()
    }catch(err){
        res.status(500).json(err)
    }
    var matchedRides = []
    for (const key1 in allRequests) {
        for(const key2 in riderInfo){
            const request = allRequests[key1]
            const rider = riderInfo[key2]
            if(request.from == rider.from && request.to == rider.to && request.date == rider.date)
            matchedRides.push(request.id)
        }
          
        }
    return matchedRides
}

const getMatchedRequests = async (req, res) => {
    const result = await matchedRequests(req)
    return res.status(200).json(result)
}

const applyARequest = async (req, res) => {
    let request
    let id = req.body.id
    try{
        request = await Request.findById(id)
    }catch(err){
        return res.status(500).json(err)
    }
    if(request.applied == true) return res.status(400).json({message: "Request already applied"})
    const result = await matchedRequests(req)
    if(result.includes(request.id))
    request.applied = true
    else
    return res.status(400).json({message: "Request is not matched yet..."})
    return res.status(200).json({message: "Request applied"})
}

module.exports = {createARequest, seeAllRequests, getMatchedRequests, applyARequest, matchedRequests}