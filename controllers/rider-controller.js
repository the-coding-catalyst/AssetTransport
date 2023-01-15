const Rider = require("../model/rider")

const addTravelInfo = async(req, res) => {
    const {from, to, dateAndTime, medium} = req.body
    const validMediums = ["BUS", "CAR", "TRAIN"]
    if(!validMediums.includes(medium)) return res.status(400).json({message: "Invalid medium type"})
    let newMedium
    try{
        newMedium = new Rider({from, to, dateAndTime, medium})
        await newMedium.save()
    }catch(err){
        return res.status(500).json(err)
    }
    return res.status(201).json({message: "Travel info added"})
}


const shareTravelInfo = async(req, res) => {
    let allTravel
    try{
        allTravel = await Rider.find()
    }catch(err){
        res.status(500).json(err)
    }
    return res.status(200).json({allTravel})
}
module.exports = {addTravelInfo, shareTravelInfo}

