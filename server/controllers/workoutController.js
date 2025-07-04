import Workout from "../models/Workout.js";

// ✅ Create a new workout
export const createWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout({ ...req.body, userId: req.userId });
    await newWorkout.save();
    res.status(201).json({ message: "Workout logged", workout: newWorkout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all workouts for a user
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
