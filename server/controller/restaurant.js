import Restaurant from '../model/Restaurant.js'
import { BadRequestError } from '../errors/index.js'
import NotFoundError from "../errors/not-found.js"
import { StatusCodes } from 'http-status-codes';
import User from '../model/user.js';

const createRestaurant = async (req , res) => {
    
    
    req.body.user = req.user._id
    const {isRestaurantRegistered} = req.user
    console.log(req.user);
    console.log(isRestaurantRegistered);
    
    try {

        if(!req.body.restaurantName || !req.body.address || !req.body.phone  ||  !req.body.capacity || !req.body.cuisine || !req.body.priceRange || !req.body.description || !req.body.image || !req.body.rating || !req.body.user){
            throw new BadRequestError('Please provide all values')
          
        }
    } catch (error) {
        console.log(error);
        
    }
    const user = await Restaurant.findOne({user : req.user._id})
    if(user){
        throw new BadRequestError('You have already registered as a restaurant')
    }
    const userJwt = User.findOneAndUpdate({_id : req.user._id})

    
    const restaurant = await Restaurant.create({...req.body , _id : req.user._id})
    await User.findOneAndUpdate({_id : req.user._id} , {isRestaurantRegistered : true})
   // const token = userJwt.createJWT()
    console.log(isRestaurantRegistered);
    res.status(StatusCodes.CREATED).json({restaurant})
   
}
const getAllRestaurants = async (req , res) => {
    const restaurants = await Restaurant.find({})
    if(!restaurants){
        throw new NotFoundError('No restaurants found')
    }
    res.status(StatusCodes.OK).json({restaurants})
}
const getSingleRestaurant = async (req , res) => {
    const {id : restaurantId} = req.params
    const restaurant = await Restaurant.findOne({_id : restaurantId})
    if(!restaurant){
        throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
    }
    res.status(StatusCodes.OK).json({restaurant})
}
const addItem = async (req , res) => {
    try {
        const {id : restaurantId} = req.params
        const {item} = req.body
        if(!item) {
            throw new BadRequestError('Please provide all values')}
        const menu = await Restaurant.findOneAndUpdate({_id : restaurantId} , {$push : {menu : item}}, { new : true , runValidator : true})
        if(!menu){
            throw new NotFoundError(`No menu with id : ${restaurantId}`)
        }
        res.status(StatusCodes.OK).json({menu})
    } catch (error) {
        console.error(error);
        
    }
}
const getMenu = async (req , res) => {
    const {id : restaurantId} = req.params
    const menu = await Restaurant.findOne({_id : restaurantId}).select('menu')
    if(!menu){
        throw new NotFoundError(`No Menu with id : ${restaurantId}`)
    }
    
    res.status(StatusCodes.OK).json({menu})
}
// const updateMenu = async(req , res) => {
//     const {id : restaurantId} = req.params
//     const {menu} = req.body
//     const updatedMenu = await Restaurant.findOneAndUpdate({_id : restaurantId},{...req.body , menu : menu}).select('menu')
//     if(!menu){
//         throw new NotFoundError(`No Menu with id : ${restaurantId}`)
//     }
    
//     res.status(StatusCodes.OK).json({updatedMenu})
// }
const updateRestaurant = async(req, res)=> {
    try {
        const {id : restaurantId} = req.params
        const restaurant = await Restaurant.findOneAndUpdate({_id : restaurantId} , req.body , { new : true , runValidator : true})
        if(!restaurant){
            throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
        }
        res.status(StatusCodes.OK).json({restaurant})
    } catch (error) {
        console.error(error);
        
    }
   
}
const deleteRestaurant = async (req , res) => {
    try {
        const {id : restaurantId} = req.params
        const restaurant = await Restaurant.findOneAndDelete({_id : restaurantId})
        if(!restaurant){
            throw new NotFoundError(`No restaurant with id : ${restaurantId}`)
        }
        res.status(StatusCodes.OK).json({msg : `Restaurant with id : ${restaurantId} deleted successfully`})
    } catch (error) {
        console.error(error);
        
    }
   
}
export {getMenu ,addItem ,createRestaurant , getAllRestaurants , getSingleRestaurant , updateRestaurant , deleteRestaurant}