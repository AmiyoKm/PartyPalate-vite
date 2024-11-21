import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Customer from "../model/Customer.js";
import Restaurant from "../model/Restaurant.js"
import mongoose from "mongoose";


const getOrders = async(req,res) =>{
    const {id : restaurantId} = req.params
    
    const restaurant = await Restaurant.findOne({_id : restaurantId})
    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
}
    console.log(restaurant.orders);
    
    res.status(StatusCodes.OK).json({ orders: restaurant.orders });
 
}

const createOrder = async (req, res) => {
    const { items, total, status } = req.body;
    const { restaurantId } = req.params;
    const userId = req.user._id;
  
    // Create the new order object with a generated _id
    const newOrder = {
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
      items,
      total,
      status,
      orderedBy: userId,
      restaurant: restaurantId,
    };
  
    // Add the new order to the restaurant's orders
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { orders: newOrder } },
      { new: true, runValidators: true }
    );
  
    // Add the new order to the customer's orders
    const customerOrder = {
      _id: newOrder._id, // Use the same _id
      items,
      total,
      status,
      restaurant: restaurantId,
    };
  
    const customer = await Customer.findOneAndUpdate(
      { _id: userId },
      { $push: { orders: customerOrder } },
      { new: true, runValidators: true }
    );
  
    // Check for errors
    if (!customer || !restaurant) {
      throw new BadRequestError("Customer or restaurant doesn't exist");
    }
  
    if (!restaurant) {
      throw new NotFoundError(`No restaurant with id: ${restaurantId}`);
    }
  
    // Return the newly created order with its _id
    res.status(StatusCodes.OK).json({ order: customerOrder });
  };
  

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