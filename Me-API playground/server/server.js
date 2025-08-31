import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profile.js";



dotenv.config();
const app = express();

import cors from "cors";
app.use(cors());

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/profile", profileRoutes);





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
