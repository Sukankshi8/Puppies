import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`.cyan.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
};

export default connectDB;