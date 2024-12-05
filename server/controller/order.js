import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Customer from "../model/Customer.js";
import Restaurant from "../model/Restaurant.js"
import mongoose from "mongoose";


const getOrders = async(req,res) =>{
    const {id : restaurantId} = req.params
    
    const restaurant = await Restaurant.findOne({_id : restaurantId})
   // console.log(restaurant.orders);
    
    // const ordersWithCustomer = await Promise.all(
    //   restaurant.orders.map(async(order)=> {
    //    let  customer = await Customer.findOne({_id : order.orderedBy})
    //     return {...order.toObject() , customer : customer || null}
    //   })
    // )
    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
}
    //console.log(restaurant.orders);
   // console.log(ordersWithCustomer);
    
    res.status(StatusCodes.OK).json({ orders: restaurant.orders });
 
}

const createOrder = async (req, res) => {
    const { items, total, status , name } = req.body;
    const { restaurantId } = req.params;
    const userId = req.user._id;
  
    // Create the new order object with a generated _id
    const newOrder = {
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
      items,
      name,
      total,
      status,
      review,
      stars,
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
      review,
      stars,
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
    console.log(order);
    
    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId , "orders._id": orderId}, { $set : {"orders.$.status": order.status, "orders.$.stars" : order.stars , "orders.$.review" : order.review}}, { new : true , runValidators : true})
    const customer = await Customer.findOneAndUpdate({_id : order.orderedBy , "orders._id": orderId}, { $set : {"orders.$.status": order.status ,"orders.$.stars" : order.stars , "orders.$.review" : order.review}}, { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No order with id : ${orderId}`)
    }
    res.status(StatusCodes.OK).json({restaurant : restaurant , customer : customer})
}
const deleteOrder = async(req,res)=>{
    const { id : restaurantId , orderId} = req.params
    const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId , "orders._id": orderId}, { $pull : {"orders": { _id : orderId}}}, { new : true , runValidators : true})
    // const customer = await Customer.findOneAndUpdate({_id : restaurantId , "orders._id": orderId}, { $pull : {"orders": { _id : orderId}}}, { new : true , runValidators : true})
    if(!restaurant){
        throw new NotFoundError(`No order with id : ${orderId}`)
    }
    res.status(StatusCodes.OK).json({restaurant : restaurant})
}
const updateOrderCustomer = async(req,res)=>{
  const { id : customerId , orderId} = req.params

  const {order} = req.body
  console.log(order);
  
  const restaurant = await Restaurant.findOneAndUpdate({_id : order.restaurant , "orders._id": orderId}, { $set : {"orders.$.status": order.status, "orders.$.stars" : order.stars , "orders.$.review" : order.review}}, { new : true , runValidators : true})
  const customer = await Customer.findOneAndUpdate({_id : customerId , "orders._id": orderId}, { $set : {"orders.$.status": order.status ,"orders.$.stars" : order.stars , "orders.$.review" : order.review}}, { new : true , runValidators : true})
  if(!restaurant){
      throw new NotFoundError(`No order with id : ${orderId}`)
  }
  res.status(StatusCodes.OK).json({restaurant : restaurant , customer : customer})
}

export {updateOrderCustomer,deleteOrder , updateOrder , singleOrder,getOrders , createOrder}