import express from "express";
import authenticationMiddleware from "../middleware/authentication.js";
//import customerMiddleware from "../middleware/customerMiddleware.js";
const customerRouter = express.Router();

customerRouter.use(authenticationMiddleware);

customerRouter.route("/").get(getCustomers);
customerRouter.route("/:id").get(getCustomer);
customerRouter.route("/favorite").post(addFavorite).get(getFavorite);
customerRouter.route("/:id/cart").post(addToCart).get(getCart);
customerRouter.route("/:id/events").post(addEvent).get(getEvents);
customerRouter.route("/:id/events/:eventId").patch(updateEvent).get(getEvent).delete(cancelEvent);


export default customerRouter;
