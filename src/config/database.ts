import mongoose from 'mongoose';

const connectDB = async () => {
  console.log('MONGO_URI:', process.env.MONGO_URI); // Tambahkan ini untuk memeriksa nilai MONGO_URI
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('MongoDB connection string is not defined in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }

};

export default connectDB;
