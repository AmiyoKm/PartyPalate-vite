import Restaurant from "../model/Restaurant.js"
import { StatusCodes } from "http-status-codes"
import NotFoundError from "../errors/not-found.js"

const createEvent = async (req , res) => {
    const {id : restaurantId} = req.params
    const {event} = req.body

    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId}, {$push : {events : event}}, { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
    }
    res.status(StatusCodes.OK).json({events : restaurant.events})
}

const getAllEvents = async (req , res) => {
    const {id : restaurantId} = req.params
    const events = await Restaurant.findOne({_id : restaurantId}).select('events')
    if(!events){
        throw new NotFoundError(`No events with id : ${restaurantId}`)
    }
    res.status(StatusCodes.OK).json({events})
}
const getEvent = async (req , res) => {
    const {id : restaurantId , eventId} = req.params
    const restaurant = await Restaurant.findOne({_id : restaurantId , "events._id" : eventId} , {"events.$" : 1})
    if(!restaurant){
        throw new NotFoundError(`No event with id : ${eventId}`)
    }
    res.status(StatusCodes.OK).json({event : restaurant.events})  
}
const updateEvent = async ( req, res)=>{
    const {id : restaurantId , eventId} = req.params
    const {event} = req.body
    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId , "events._id" : eventId}, {$set : {
        "events.$.name" : event.name,
        "events.$.date" : event.date,
        "events.$.time" : event.time,
        "events.$.guests" : event.guests,
        "events.$.description" : event.description,
        "events.$.status" : event.status
    }} , { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No event with id : ${eventId}`)
    }
    res.status(StatusCodes.OK).json({events : restaurant.events})
}
const cancelEvent = async(req,res)=>{
    const {id : restaurantId , eventId} = req.params
    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId ,"events._id": eventId }, { $pull : {events : {_id : eventId}}} , { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No event with id : ${eventId}`)
    }
    res.status(StatusCodes.OK).json({events : restaurant.events})
}

export {getEvent , updateEvent , cancelEvent ,createEvent , getAllEvents}