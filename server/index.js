import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";



const app = express(); // ✅ must come BEFORE app.use()

app.use("/api/workouts", workoutRoutes);
app.use("/api/protected", protectedRoutes);
dotenv.config();


app.use(cors());
app.use(express.json());

// ✅ Use routes AFTER defining `app`
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed:", err.message);
  });
