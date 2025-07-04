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


export const checkAndAwardStreakBadge = async (userId) => {
  const today = new Date();
  let hasFullStreak = true;

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const workouts = await Workout.find({
      userId,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      }
    });

    if (workouts.length === 0) {
      hasFullStreak = false;
      break;
    }
  }

  if (hasFullStreak) {
    const existingBadge = await Badge.findOne({ userId, badgeName: "7-Day Streak" });
    if (!existingBadge) {
      const newBadge = new Badge({ userId, badgeName: "7-Day Streak" });
      await newBadge.save();
      console.log("🏆 Awarded: 7-Day Streak Badge");
    }
  }
};
