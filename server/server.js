import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import 'express-async-errors';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handle.js';
dotenv.config();
import authRouter from './routes/auth.js'
import restaurantRouter from './routes/restaurant.js';
import cors from 'cors';
// import userRouter from './routes/user.js';
// import eventRouter from './routes/event.js';
// import bookingRouter from './routes/booking.js';
// import foodRouter from './routes/food.js';
// import orderRouter from './routes/order.js';




const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000


//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/restaurant' , restaurantRouter)
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/events', eventRouter);
// app.use('/api/v1/bookings', bookingRouter);
// app.use('/api/v1/food', foodRouter);      
// app.use('/api/v1/orders', orderRouter);  


// Error handling middleware
app.use(notFound)
app.use(errorHandlerMiddleware)



const start = async(port)=>{
     await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
start(port);
