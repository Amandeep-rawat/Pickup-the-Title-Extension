// models/db.js
import mongoose from 'mongoose';

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/linkedinProfiles', {
     
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  }
}

export default connect;
