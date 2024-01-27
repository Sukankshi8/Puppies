import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();


const MONGO_URI = 'mongodb+srv://sumit:8167529759@cluster0.vrdp82y.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`.cyan.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
};

export default connectDB;