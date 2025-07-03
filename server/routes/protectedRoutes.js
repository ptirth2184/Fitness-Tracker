import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected dashboard route",
    userId: req.userId
  });
});

export default router;
