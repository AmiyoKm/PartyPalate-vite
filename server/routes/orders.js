import express from 'express'

import authenticationMiddleware from '../middleware/authentication.js'

const orderRouter = express.Router();

orderRouter.route('/').post(authenticationMiddleware , createOrder).get(authenticationMiddleware , getOrders)
orderRouter.route('/:orderId').get(authenticationMiddleware , getOrder).delete(authenticationMiddleware , cancelOrder)

export default orderRouter