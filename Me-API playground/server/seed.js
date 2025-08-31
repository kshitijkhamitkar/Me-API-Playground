import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Profile from "./models/Profile.js";

dotenv.config();

const seed = async () => {
  await connectDB();
  await Profile.deleteMany();

  await Profile.create({
    name: "John Doe",
    email: "john@example.com",
    bio: "Fullstack Developer",
    skills: ["JavaScript", "React", "Node.js"],
    projects: [
      { title: "Portfolio", description: "Personal website", link: "https://example.com" }
    ]
  });

  console.log("✅ Database seeded!");
  process.exit();
};

seed();
