import { NotFoundError } from "../errors/index.js";
import Restaurant from "../model/Restaurant.js"


const getOrders = async(req,res) =>{
    const {id : restaurantId} = req.params
    
    const restaurant = await Restaurant.find({restaurantId : restaurantId})
    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
}
    res.status(StatusCodes.OK).json({orders : restaurant.orders})
}

const createOrder = async(req,res) =>{
    const { order} = req.body
    const  { id : restaurantId} = req.params

    const restaurant = await Restaurant.findOneAndUpdate({ _id : restaurantId}, { $push : {orders : order}},{ new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
    }
    res.status(StatusCodes.OK).json({orders : restaurant.orders})
}

const singleOrder = async(req,res)=>{
    const { id : restaurantId , orderId} = req.params

    const restaurant =await Restaurant.findOne({_id : restaurantId , "orders._id": orderId},{"orders.$": 1})
    if(!restaurant){
        throw new NotFoundError(`No order with id : ${orderId}`)
    }
    res.status(StatusCodes.OK).json({order : restaurant.orders})
}
const updateOrder = async(req,res)=>{ 
    const { id : restaurantId , orderId} = req.params

    const {order} = req.body

    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId , "orders._id": orderId}, { $set : {"orders.$.status": order.status}}, { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No order with id : ${orderId}`)
    }
    res.status(StatusCodes.OK).json({orders : restaurant.orders})
}
const deleteOrder = async(req,res)=>{
    const { id : restaurantId , orderId} = req.params
    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId , "orders._id": orderId}, { $pull : {"orders": { _id : orderId}}}, { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No order with id : ${orderId}`)
    }
    res.status(StatusCodes.OK).json({orders : restaurant.orders})
}

export {deleteOrder , updateOrder , singleOrder,getOrders , createOrder}