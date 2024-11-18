import mongoose from "mongoose";

import User from "./user.js";
const menuItemSchema = new mongoose.Schema({
  
  itemName: { type: String , unique : true},
  price: { type: Number },
  description: { type: String },
  image: { type: String },

})
const eventSchema = new mongoose.Schema({
  
    eventName: { type: String },
    date: { type: String },
    time: { type: String , unique : true},
    description: { type: String },
    guests: { type: Number },
    status : { type: String , default : 'waiting' , enum : ['waiting' , 'accepted' , 'rejected']},
  
})
const orderSchema = new mongoose.Schema({
  customerName: {
    type: String, 
  },
  customerId: {
    type : String
  },
  items: [
    {
      itemName: {
        type: String, 
      },
      itemPrice: {
        type: Number, 
      },
      quantity: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
    enum: ["preparing", "ready", "delivered"], 
  },
})

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "Please provide a restaurant name"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please provide a address"],
      unique: true,
    },
    phone: { type: String, required: true },
    menu: [
      menuItemSchema
    ],
    events: [
      eventSchema
    ],
    orders: [
      orderSchema
    ],
    
    capacity: {
      type: Number,
      required: [true, "Please provide a capacity"],
    },
    cuisine: {
      type: String,
      required: [true, "Please provide a cuisine"],
    },
    priceRange: {
      type: String,
      required: [true, "Please provide a price range"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide a image"],
    },
    openingTime: {
      type: String,
      required: [true, "Please provide a opening time"],
    },
    closingTime: {
      type: String,
      required: [true, "Please provide a closing time"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
