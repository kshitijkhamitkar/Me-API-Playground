import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  education: [String],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      skills: [String],
      link: String
    }
  ],
  work: [
    {
      company: String,
      role: String,
      duration: String,
      description: String
    }
  ],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
