import express from 'express'
import authenticationMiddleware from '../middleware/authentication.js'
import {addItem, getMenu, getAllRestaurants ,createRestaurant, getSingleRestaurant, deleteRestaurant, updateRestaurant } from '../controller/restaurant.js'
import { deleteItem, getItem, updateItem } from '../controller/food.js'
import { cancelEvent, createEvent, getAllEvents, getEvent, updateEventForRestaurant } from '../controller/event.js'
import { createOrder, deleteOrder, getOrders, singleOrder, updateOrder } from '../controller/order.js'
//import restaurantMiddleware from '../middleware/restaurantMiddleware'

const restaurantRouter = express.Router()





restaurantRouter.use(authenticationMiddleware)
restaurantRouter.route('/').get(getAllRestaurants).post(createRestaurant)
restaurantRouter.route('/:id').get(getSingleRestaurant).patch(updateRestaurant).delete(deleteRestaurant)
 restaurantRouter.route('/:id/menu').post(addItem).get(getMenu)
 restaurantRouter.route('/:id/menu/:itemId').get(getItem).patch(updateItem).delete(deleteItem)
 restaurantRouter.route('/:id/event').get(getAllEvents).post(createEvent)
 restaurantRouter.route('/:id/event/:eventId').get(getEvent).patch(updateEventForRestaurant).delete(cancelEvent)
 restaurantRouter.route('/:id/orders').get(getOrders).post(createOrder)
 restaurantRouter.route('/:id/orders/:orderId').get(singleOrder).patch(updateOrder).delete(deleteOrder)

console.log('restaurant router');
export default restaurantRouter