import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweet.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// ✅ Allow frontend (Vite runs on 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Parse JSON body
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Sweet Shop Backend is running!");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

// ✅ Protected test route
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

// ✅ Global error handler (ALWAYS LAST)
app.use(errorHandler);

export default app;

