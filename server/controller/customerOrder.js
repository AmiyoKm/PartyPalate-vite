import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import Customer from '../model/Customer.js'

const createOrderCustomer = async(req,res)=>{
    const { items , total , status } = req.body
    const {restaurantId , id : customerId}= req.params
    const customer = await Customer.findOneAndUpdate({_id : customerId } , { $push : { orders : {items , total ,status , restaurant: restaurantId } }} , {new : true  , runValidators : true})

    if(!customer){
      throw new  BadRequestError("customer doesn't exist")
    }
    res.status(StatusCodes.CREATED).json({customer})
}
const getAllOrders = async(req , res)=>{
    const {id : customerId} = req.params
    const customer = await Customer.findOne({_id : customerId}).populate("orders")
    if(!customer){
      throw new  BadRequestError("customer doesn't exist")
    }
    res.status(StatusCodes.OK).json({orders : customer.orders})
}

const getSingleOrder = async(req , res)=>{
  const {id : customerId , orderId}= req.params
  const customer = await Customer.findOne({_id : customerId , "orders._id" : orderId} , {"orders.$" : 1})

  if(!customer){
    throw new  BadRequestError("customer doesn't exist")
  }
  res.status(StatusCodes.OK).json({order : customer.orders})
}
export { createOrderCustomer , getAllOrders ,getSingleOrder}