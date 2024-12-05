import express from "express";
import authenticationMiddleware from "../middleware/authentication.js";
import { addFavorite, createCustomer, deleteCustomer, getAllCustomers, getCustomer, getFavorite, updateCustomer } from "../controller/customer.js";
import {  createOrderCustomer, getAllOrders, getSingleOrder } from "../controller/customerOrder.js";
import { createOrder, singleOrder, updateOrderCustomer } from "../controller/order.js";
import { createEvent, getAllEvents } from "../controller/event.js";
import { getAllEventsCustomer, updateEventForCustomer } from "../controller/customerEvent.js";
//import customerMiddleware from "../middleware/customerMiddleware.js";
const customerRouter = express.Router();

customerRouter.use(authenticationMiddleware);

customerRouter.route("/").get(getAllCustomers).post(createCustomer);
customerRouter.route("/:id").get(getCustomer).patch(updateCustomer).delete(deleteCustomer);
customerRouter.route("/:id/favorite/:restaurantId").post(addFavorite).get();
customerRouter.route("/:id/favorite").get(getFavorite);
//customerRouter.route("/:id/cart").post(addToCart).get(getCart);
 customerRouter.route("/:id/events").post().get(getAllEventsCustomer);
 customerRouter.route("/:id/events/:eventId").patch(updateEventForCustomer).get().delete();
 customerRouter.route("/:restaurantId/orders").post(createOrder)
customerRouter.route("/:id/orders").get(getAllOrders)
 customerRouter.route("/:id/orders/:orderId").patch(updateOrderCustomer).get(getSingleOrder).delete();


export default customerRouter;
