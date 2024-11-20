import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Customer from "../model/Customer.js";
import Restaurant from "../model/Restaurant.js"


const getOrders = async(req,res) =>{
    const {id : restaurantId} = req.params
    
    const restaurant = await Restaurant.findOne({_id : restaurantId})
    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
}
    console.log(restaurant.orders);
    
    res.status(StatusCodes.OK).json({ orders: restaurant.orders });

}

const createOrder = async(req,res) =>{
    const { items , total , status} = req.body
    const  { restaurantId : restaurantId} = req.params
    const userId = req.user._id
    const restaurant = await Restaurant.findOneAndUpdate({ _id : restaurantId}, { $push : {orders : {items , total , status , orderedBy : userId}}},{ new : true , runValidators : true})
    const customer = await Customer.findOneAndUpdate({ _id : userId}, { $push : {orders : {items , total , status , restaurant : restaurantId}}},{ new : true , runValidators : true})
    if(!customer || !restaurant){
        throw new BadRequestError("customer or restaurant doesn't exist")
    }
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