import Restaurant from "../model/Restaurant.js"
import Customer from "../model/Customer.js"
import { StatusCodes } from "http-status-codes"
import NotFoundError from "../errors/not-found.js"
import mongoose from "mongoose"

const createEvent = async (req , res) => {
    const {id : restaurantId} = req.params
    
    const {event} = req.body
   
    
    //console.log(event);
   // console.log(req.body);
    
    const restaurantEvent= {
        _id :new mongoose.Types.ObjectId(),
        planner : event.plannerName,
        eventName : event.eventName,
        date : event.date,
        time : event.time,
        description : event.description,
        guests : event.guests,
     
        plannedBy : req.user._id
    } 
    console.log(restaurantEvent);
    
    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId}, {$push : {events : restaurantEvent}}, { new : true , runValidators : true})

    const customerEvent ={
        _id : restaurantEvent._id,
        restaurantName : restaurant.restaurantName,
        restaurant : restaurant._id,
        eventName : event.eventName,
        date : event.date,
        time : event.time,
        description : event.description,
        guests : event.guests,
     
    }

    const customer = await Customer.findOneAndUpdate({_id : req.user._id}, { $push : { events : customerEvent} }, {new : true , runValidators : true})


    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
    }
    res.status(StatusCodes.OK).json({customer : customer , restaurant : restaurant})
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
const updateEventForRestaurant = async ( req, res)=>{
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
    console.log(event.plannedBy);
    
    const customer = await Customer.findOneAndUpdate({_id : event.plannedBy , "events._id" : eventId}, { $set : {
        "events.$.name" : event.name,
        "events.$.date" : event.date,
        "events.$.time" : event.time,
        "events.$.guests" : event.guests,
        "events.$.description" : event.description,
        "events.$.status" : event.status
    }} , { new : true , runValidators : true})
    console.log(customer);
    
    res.status(StatusCodes.OK).json({restaurant : restaurant})
}
const cancelEvent = async(req,res)=>{
    const {id : restaurantId , eventId} = req.params
    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId ,"events._id": eventId }, { $pull : {events : {_id : eventId}}} , { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No event with id : ${eventId}`)
    }
    res.status(StatusCodes.OK).json({events : restaurant.events})
}

export {getEvent , updateEventForRestaurant , cancelEvent ,createEvent , getAllEvents}