import express from "express";
import Workout from "../models/Workout.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a workout
router.post("/", verifyToken, async (req, res) => {
  try {
    const newWorkout = new Workout({ ...req.body, userId: req.userId });
    await newWorkout.save();
    res.status(201).json({ message: "Workout logged", workout: newWorkout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all workouts for user
router.get("/", verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
