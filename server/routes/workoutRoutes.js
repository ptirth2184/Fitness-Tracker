import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createWorkout, getWorkouts } from "../controllers/workoutController.js";

const router = express.Router();

// POST /api/workouts
router.post("/", verifyToken, createWorkout);

// GET /api/workouts
router.get("/", verifyToken, getWorkouts);

export default router;
