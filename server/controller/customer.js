import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import Customer from '../model/Customer.js'

import { StatusCodes } from 'http-status-codes'
const createCustomer = async (req,res)=>{
    
    req.body.user = req.user._id
    const customerExist =await Customer.findOne({user : req.user._id})
    if(customerExist){
        throw new BadRequestError("Customer already exist")
    } 
    const customer = await Customer.create({...req.body , _id : req.user._id})
    res.status(StatusCodes.CREATED).json({customer})
}
const getAllCustomers = async (req,res)=>{
    const customer = await Customer.find({})

    if(!customer){
        throw new NotFoundError(`No customer found`)
    }
    res.status(StatusCodes.OK).json({customer})

}

const getCustomer = async (req,res)=>{
    const {id : customerId} = req.params
    const customer = await Customer.findOne({_id : customerId})
    if(!customer){
        throw new NotFoundError(`No customer with id : ${customerId}`)
    }
    res.status(StatusCodes.OK).json({customer})
}
const updateCustomer = async(req,res)=>{
    const {id : customerId} = req.params
    const customer = await Customer.findOneAndUpdate({_id : customerId}, {...req.body}, {new : true , runValidators : true})
    if(!customer){
        throw new NotFoundError(`No customer with id : ${customerId}`)
    }
    res.status(StatusCodes.OK).json({customer})
}
const deleteCustomer = async(req,res)=>{
    const {id : customerId} = req.params
    const customer = await Customer.findOneAndDelete({_id : customerId})
    if(!customer){
        throw new NotFoundError(`No customer with id : ${customerId}`)
    }
    res.status(StatusCodes.OK).json({customer})
}
export {createCustomer , getAllCustomers , getCustomer , updateCustomer , deleteCustomer}