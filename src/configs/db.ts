import mongoose from 'mongoose';

export const connectDB = async (): Promise<any> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables.');
    }

    const connection = await mongoose.connect(mongoUri);
    console.log(`🍃 MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};
