import mongoose from "mongoose";
import User from "./backend/models/User.js";

// MongoDB connection (add this if not already connected)
mongoose
  .connect("mongodb://localhost:27017/opsmind", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const newUser = new User({
  username: "johndoe",
  email: "john@example.com",
  password: "securepassword",
});

newUser
  .save()
  .then(() => console.log("User saved successfully"))
  .catch((err) => console.error(err));
