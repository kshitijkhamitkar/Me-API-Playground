import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profile.js";
import cors from "cors";

dotenv.config();
const app = express();

// CORS Setup
const allowedOrigins = [
  "http://localhost:3000",         // local frontend (dev)
  "https://your-frontend.vercel.app" // deployed frontend (replace with actual Vercel domain)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/profile", profileRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});






// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import profileRoutes from "./routes/profile.js";



// dotenv.config();
// const app = express();

// import cors from "cors";
// app.use(cors());

// // Middleware
// app.use(express.json());

// // Connect DB
// connectDB();

// // Routes
// app.use("/api/profile", profileRoutes);





// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

