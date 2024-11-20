import express from "express";
import authenticationMiddleware from "../middleware/authentication.js";
import { createCustomer, deleteCustomer, getAllCustomers, getCustomer, updateCustomer } from "../controller/customer.js";
import {  createOrderCustomer, getAllOrders } from "../controller/customerOrder.js";
import { createOrder } from "../controller/order.js";
//import customerMiddleware from "../middleware/customerMiddleware.js";
const customerRouter = express.Router();

customerRouter.use(authenticationMiddleware);

customerRouter.route("/").get(getAllCustomers).post(createCustomer);
customerRouter.route("/:id").get(getCustomer).patch(updateCustomer).delete(deleteCustomer);
//customerRouter.route("/favorite").post(addFavorite).get(getFavorite);
//customerRouter.route("/:id/cart").post(addToCart).get(getCart);
// customerRouter.route("/:id/events").post(addEvent).get(getEvents);
// customerRouter.route("/:id/events/:eventId").patch(updateEvent).get(getEvent).delete(cancelEvent);
 customerRouter.route("/:restaurantId/orders").post(createOrder)
customerRouter.route("/:id/orders").get(getAllOrders)
// customerRouter.route("/:id/orders/:orderId").patch(updateOrder).get(singleOrder).delete(deleteOrder);


export default customerRouter;
