import express from 'express'
import authenticationMiddleware from '../middleware/authentication'
import restaurantMiddleware from '../middleware/restaurantMiddleware'

const menuRouter = express.Router()

menuRouter.use(authenticationMiddleware , restaurantMiddleware )

menuRouter.route('/:id/menu').post().get()
menuRouter.route('/menu/:itemId').patch().delete()