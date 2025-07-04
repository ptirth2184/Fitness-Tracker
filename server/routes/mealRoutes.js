import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addMeal, getMeals } from "../controllers/mealController.js";

const router = express.Router();

router.post("/", verifyToken, addMeal);
router.get("/", verifyToken, getMeals);

export default router;
