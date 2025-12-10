import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Basic Route
app.get("/", (req, res) => {
  res.send("OpsMind AI Backend Running...");
});

// Upload Routes
app.use("/api/upload", uploadRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
