import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["cardio", "strength", "yoga", "stretch", "custom"],
    required: true
  },
  duration: Number, // in minutes
  caloriesBurned: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Workout", workoutSchema);
