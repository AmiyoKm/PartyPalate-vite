import mongoose from "mongoose";
import User from "./user.js";


const eventSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // Reference to the restaurant
    required: true,
  },
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String },
  guests: { type: Number, required: true },
  status: {
    type: String,
    enum: ["waiting", "accepted", "rejected"],
    default: "waiting",
  },
  
});


const orderSchema = new mongoose.Schema({
   
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [
    {
      itemName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["preparing", "ready", "delivered"],
    default: "preparing",
  },
});


const customerSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  bio: { type: String },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true,  },
  orders: [orderSchema], // Embedded orders with restaurant reference
  events: [eventSchema], // Embedded events with restaurant reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  favoriteRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
});

const Customer =mongoose.model("Customer", customerSchema);
export default Customer;
