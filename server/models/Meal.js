import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  description: {
    type: String
  },
}, { timestamps: true });

export default mongoose.model("Meal", mealSchema);
