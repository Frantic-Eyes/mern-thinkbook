import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import noteRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
// app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next();
});

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
