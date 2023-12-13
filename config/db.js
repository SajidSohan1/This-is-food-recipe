import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://mohammedismail301199:jzsnb1OXCoivSSdC@cluster0.sse6j3b.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB: ${conn.connection.host}`.bgBlue.white);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
  }
};

export default connectDB;
