import express from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweet.controller.js";

const adminCheck = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }
  next();
};


import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/", authMiddleware, adminCheck, addSweet);
router.put("/:id", authMiddleware, adminCheck, updateSweet);
router.delete("/:id", authMiddleware, adminCheck, deleteSweet);
router.post("/:id/restock", authMiddleware, adminCheck, restockSweet);


export default router;
