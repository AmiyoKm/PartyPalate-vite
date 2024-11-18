import mongoose from "mongoose";
import User from "./user.js";



const customerSchema = new mongoose.Schema({
    bio :{
        type :string ,
        required :false

    },
    phone : {
        type : string,
        required : true,
        default : ''
    },
    address : {
        type : string,
        required : true,
        default : ''
    },
    favoriteRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
})
const Customer = User.discriminator("Customer", customerSchema);
export default Customer