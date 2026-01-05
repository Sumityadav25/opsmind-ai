import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import askRoutes from "./routes/askRoutes.js";

// 🔹 Initialize app
const app = express();

// 🔹 Global Middlewares (VERY IMPORTANT)
app.use(cors());
app.use(express.json()); // <-- req.body fix (MANDATORY)

// 🔹 Database Connection
connectDB();

// 🔹 Routes
app.use("/api", askRoutes);          // /api/ask , /api/history
app.use("/api", searchRoutes);       // /api/search , /api/chunk
app.use("/api/upload", uploadRoutes);// /api/upload

// 🔹 Health Check
app.get("/", (req, res) => {
  res.send("OpsMind AI Backend Running...");
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
