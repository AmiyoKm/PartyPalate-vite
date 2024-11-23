import Customer from "../model/Customer.js"
import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import Restaurant from "../model/Restaurant.js"
import NotFoundError from "../errors/not-found.js"
import mongoose from "mongoose"



const getAllEventsCustomer = async (req , res)=>{
    const {id : customerId} = req.params
    const customer = await Customer.findOne({_id : customerId})

    if(!customer){
        throw new BadRequestError("customer doesn't exist")
    }

    res.status(StatusCodes.OK).json({customer : customer})

}
const updateEventForCustomer = async ( req, res)=>{
    const {id : customerId , eventId} = req.params
    const {event } = req.body 
   // console.log(req.body);
    
    const customer = await Customer.findOneAndUpdate({_id : req.user._id , "events._id" : eventId} , {$set : {
        "events.$.name" : event.name ,
        "events.$.date" : event.date,
        "events.$.time" : event.time,
        "events.$.guests" : event.guests,
        "events.$.description" : event.description,
        "events.$.status" : event.status
    }} , {new : true , runValidators : true})
    console.log(customer);
    
    const restaurant = await Restaurant.findOneAndUpdate({ _id : event.restaurant , "events._id" : eventId} , {$set : {
        "events.$.name" : event.name,
        "events.$.date" : event.date,
        "events.$.time" : event.time,
        "events.$.guests" : event.guests,
        "events.$.description" : event.description,
        "events.$.status" : event.status
    }} ,{ new  : true , runValidators : true})

    res.status(StatusCodes.OK).json({customer : customer , restaurant : restaurant})

}
export {getAllEventsCustomer ,updateEventForCustomer}