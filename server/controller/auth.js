import { StatusCodes } from "http-status-codes"
import User from '../model/user.js'
import BadRequestError from "../errors/bad-request.js"
import NotFoundError from "../errors/not-found.js"



export const login =async(req,res)=>{
    const {email , password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email})
   
    if (!user) {
       throw new NotFoundError(`No user with email : ${email} `)
      }
      const isPasswordCorrect = await user.comparePassword(password)
      if (!isPasswordCorrect) {
        throw new BadRequestError('Invalid Credentials')
      }
      const token = await user.createJWT()
      res.status(200).json({
        user ,
        token,
        isRestaurantRegistered : user.isRestaurantRegistered
      });
}

export const registration =async(req,res)=>{

     if(!req.body.username || !req.body.email || !req.body.password){
        throw new BadRequestError("Please provide username , email and password")
     }
    const user = await User.create({...req.body})

    const token = await user.createJWT()
    //console.log(token);
    
    res.status(StatusCodes.CREATED).json({user , token})
    

}
export const getAllUsers = async(req,res)=>{
    const users = await User.find({})
    if(!users){
      throw new NotFoundError('No users found')
    }
    res.status(StatusCodes.OK).json({users})
}