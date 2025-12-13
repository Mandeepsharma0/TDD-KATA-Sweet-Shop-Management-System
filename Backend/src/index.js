import express from "express";
import authRoutes from "./routes/auth.routes.js"; 
import authMiddleware from "./middleware/auth.middleware.js";
import sweetRoutes from "./routes/sweet.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sweet Shop Backend is running!");
});


app.use("/api/auth", authRoutes);

app.use("/api/sweets", sweetRoutes);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});

export default app;

