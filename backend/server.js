import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow credentials for cookie-based auth
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Body parser middleware
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Authenticated Todo API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
