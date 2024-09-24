// index.js
import express from 'express';
import connect from './models/db.js';  // Import the connect function
import Profile from './models/profile.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to MongoDB
connect();  // Call the connect function to establish a connection

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// POST route to add a profile
app.post('/api/profile', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);  // Log the error
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// Route to fetch all profiles
app.get('/api/profile', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);  // Log the error
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// DELETE route to delete all profiles
app.delete('/api/profile', async (req, res) => {
  try {
      await Profile.deleteMany(); // Deletes all documents in the Profile collection
      res.status(200).json({ message: 'All profiles deleted successfully' });
  } catch (error) {
      console.error('Error deleting profiles:', error);
      res.status(500).json({ error: 'Failed to delete profiles' });
  }
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
