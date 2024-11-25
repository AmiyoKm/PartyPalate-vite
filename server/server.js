import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import 'express-async-errors';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handle.js';
import path, { dirname } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRouter from './routes/auth.js';
import restaurantRouter from './routes/restaurant.js';
import customerRouter from './routes/customer.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted-script-source.com"],
        styleSrc: ["'self'", "'unsafe-inline'"], // Allows inline styles if needed
        imgSrc: ["*"],
        connectSrc: ["'self'", "https://api.example.com"], // For API calls
      },
    },
  })
);

// Configure CORS for production
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || '*', // Replace with your frontend's URL
//   optionsSuccessStatus: 200,
// };
//app.use(cors(corsOptions));

// Rate limiting
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, 
//     max: 100, 
//   })
// );

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/restaurant', restaurantRouter);
app.use('/api/v1/customer', customerRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
// Error handling middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

console.log(path.join(__dirname, '/client/dist') , process.env.FRONTEND_URL , process.env.NODE_ENV, path.resolve(__dirname, "client", "dist", "index.html"));


// Start the server
const start = async (port) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};
start(port);
