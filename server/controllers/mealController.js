import Meal from "../models/Meal.js";

// POST: Add meal
export const addMeal = async (req, res) => {
  try {
    const { mealType, calories, description } = req.body;
    const newMeal = new Meal({
      userId: req.userId,
      mealType,
      calories,
      description
    });
    await newMeal.save();
    res.status(201).json({ message: "Meal logged", meal: newMeal });
    console.log("Meal body:", req.body);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Get all meals
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
