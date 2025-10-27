import express from "express";
import { PORT } from "./config/env";
import connectToDatabase from "./database/mongodb";
import cors from "cors";
import { clerkwebhooks } from "./controllers/webhooks";
// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to: ${req.url}`);
  next();
});
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
app.get("/clerk", (req, res) => {
  res.json("clerk route");
});
app.post("/clerk", express.json(), clerkwebhooks);
// Port
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});
