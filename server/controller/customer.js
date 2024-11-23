import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import Customer from '../model/Customer.js'
import User from '../model/user.js'


import { StatusCodes } from 'http-status-codes'
const createCustomer = async (req, res) => {
    try {
      const { isCustomerRegistered } = req.user;
      if (isCustomerRegistered) {
        throw new BadRequestError("Customer is already registered");
      }
  
      req.body.user = req.user._id; 
      
      const existingCustomer = await Customer.findOne({ _id: req.user._id });
      if (existingCustomer) {
        throw new BadRequestError("Customer already exists with this ID");
      }
  
      const newCustomer = {
        _id: req.user._id, 
        user: req.user._id,
        name: req.body.name,
        phone: req.body.phone,
        bio: req.body.bio,
        address: req.body.address,
      };
  
      console.log("Creating new customer:", newCustomer);
  
      const customer = await Customer.create({ ...newCustomer });
  
      
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { isCustomerRegistered: true }
      );
  
      res.status(StatusCodes.CREATED).json({ customer });
    } catch (error) {
      console.error("Error creating customer:", error.message);
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };
  
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