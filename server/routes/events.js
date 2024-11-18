import express from 'express'
import authenticationMiddleware from '../middleware/authentication'
import restaurantMiddleware from '../middleware/restaurantMiddleware'

const eventRouter = express.Router()
eventRouter.use(authenticationMiddleware,restaurantMiddleware)

eventRouter.route('/:id/events').get(getAllEvents).post(addEvent)
// eventRouter.route('/:eventId/book').get(getAllEvents).post(addEvent)
eventRouter.route('/events/:eventId').get(getEvent).delete(deleteEvent).patch(updateEvent)
export default eventRouter