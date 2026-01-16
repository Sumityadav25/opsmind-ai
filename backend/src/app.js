import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import askRoutes from "./routes/askRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/", (req, res) => {
  res.send("OpsMind AI Backend Running");
});

// 🔓 Public routes
app.use("/api/auth", authRoutes);

// 🔐 Secured routes (JWT handled inside route files)
app.use("/api/ask", askRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 OpsMind AI running on port ${PORT}`));
