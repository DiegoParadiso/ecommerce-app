import mongoose from "mongoose";

const connectDB = async () => {
    console.log('MONGO_URI:', process.env.MONGO_URI); // <--- DEBUG
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    })
    await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`)
}

export default connectDB;