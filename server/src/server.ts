import express from "express";
import { PORT } from "./config/env";
import connectToDatabase from "./database/mongodb";
import cors from "cors";
import { clerkwebhooks } from "./controllers/webhooks";
// Initialize express
const app = express();

// Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
app.post("/clerk", express.json(), clerkwebhooks);
// Port
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});
