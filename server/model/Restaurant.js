import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  quantity: { type: Number, default: 1 },
});



const eventSchema = new mongoose.Schema({
  // Explicitly use the same ID
  planner : {
    type : String,
    required: true,
  },
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String },
  guests: { type: Number, required: true },
  status: {
    type: String,
    enum: ["waiting", "accepted", "rejected" , "cancelled" , "completed"],
    default: "waiting",
  },
  plannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  costPerPerson: { 
    type: Number, required: true , default : 400
  },

});

const orderSchema = new mongoose.Schema({
  // Explicitly use the same ID
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  name : { type: String, required: true },
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
    //enum: ["preparing", "ready", "delivered"],
    default: "preparing",
  },
});

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: [true, "Please provide a restaurant name"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
    unique: true,
  },
  phone: { type: String, required: true },
  menu: [
    menuSchema
  ],
  events: [eventSchema], // Embedded events with customer reference
  orders: [orderSchema], // Embedded orders with customer reference
  capacity: { type: Number, required: true },
  cuisine: { type: String, required: true },
  priceRange: {
    type: String,
    enum: ["Inexpensive", "Moderate", "Expensive", "Very Expensive"],
    required: true,
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  rating: { type: Number, default: 0 },
  costPerPerson : {type : Number , default : 400},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
