// src/db/connectMongoDB.js
import mongoose from 'mongoose';
//* Підключення до MongoDB
export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl, {
      dbName: 'notes',
    });
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // аварійне завершення програми
  }
};
