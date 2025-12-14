import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addSweet,
  getAllSweets,
  buySweet,
  updateSweet,
  deleteSweet
} from "../controllers/sweet.controller.js";

const router = express.Router();

const adminCheck = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

router.get("/", authMiddleware, getAllSweets);
router.post("/:id/buy", authMiddleware, buySweet);

router.post("/", authMiddleware, adminCheck, addSweet);
router.put("/:id", authMiddleware, adminCheck, updateSweet);
router.delete("/:id", authMiddleware, adminCheck, deleteSweet);

export default router;

