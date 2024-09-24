import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url:{
    type:String,
    required:true,
  },
  
  about: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  followerCount: {
    type: Number,
    required: false
  },
  connectionCount: {
    type: Number,
    required: false
  }
});

// Create and export the model
const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;

