import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true , 'Please provide a username'],
       
    },
    email : {
        type : String,
        required : [true , 'Please provide a email'],
        trim : true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'User already exists , Please provide a valid email',
          ],
          unique : true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
      },
      role :{
        type : String,
        enum : ['customer' , 'restaurant'],
        default : 'customer',
        required : true
      },
      isRestaurantRegistered: { 
        type: Boolean, 
        default: false
     },
     isCustomerRegistered: { 
        type: Boolean, 
        default: false
     },
      

},{ discriminatorKey: "kind",timestamps : true})
userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})
userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword , this.password)
    return isMatch
}
userSchema.methods.createJWT = async function() {
    return jwt.sign({ userId: this._id ,email: this.email , role : this.role , isRestaurantRegistered : this.isRestaurantRegistered },process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN})
}
export default mongoose.model('User', userSchema)