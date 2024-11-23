import express from "express";
import authenticationMiddleware from "../middleware/authentication.js";
import { createCustomer, deleteCustomer, getAllCustomers, getCustomer, updateCustomer } from "../controller/customer.js";
import {  createOrderCustomer, getAllOrders, getSingleOrder } from "../controller/customerOrder.js";
import { createOrder, singleOrder } from "../controller/order.js";
import { createEvent, getAllEvents } from "../controller/event.js";
import { getAllEventsCustomer, updateEventForCustomer } from "../controller/customerEvent.js";
//import customerMiddleware from "../middleware/customerMiddleware.js";
const customerRouter = express.Router();

customerRouter.use(authenticationMiddleware);

customerRouter.route("/").get(getAllCustomers).post(createCustomer);
customerRouter.route("/:id").get(getCustomer).patch(updateCustomer).delete(deleteCustomer);
//customerRouter.route("/favorite").post(addFavorite).get(getFavorite);
//customerRouter.route("/:id/cart").post(addToCart).get(getCart);
 customerRouter.route("/:id/events").post().get(getAllEventsCustomer);
 customerRouter.route("/:id/events/:eventId").patch(updateEventForCustomer).get().delete();
 customerRouter.route("/:restaurantId/orders").post(createOrder)
customerRouter.route("/:id/orders").get(getAllOrders)
 customerRouter.route("/:id/orders/:orderId").patch().get(getSingleOrder).delete();


export default customerRouter;
