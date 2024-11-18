import mongoose from 'mongoose'

const connectDB = async(url)=>{
    try {
        await mongoose.connect(url);
        console.log('Database Connected');
      } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process if the database connection fails
      }
   
}
export default connectDB