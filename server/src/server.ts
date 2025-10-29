import express from "express";
import { PORT } from "./config/env";
import connectToDatabase from "./database/mongodb";
import cors from "cors";
import { clerkwebhooks } from "./controllers/webhooks";
import User from "./models/user";
// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
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
app.post("/clerk", clerkwebhooks);
// Add debug route - this won't affect your Clerk configuration
app.post("/clerk-debug", (req, res) => {
  console.log("=== DEBUG WEBHOOK ===");
  console.log("Headers:", req.headers);
  console.log("Body:", JSON.stringify(req.body, null, 2));
  console.log("=== END DEBUG ===");
  res.json({
    received: true,
    message: "Debug webhook received",
    body: req.body,
  });
});
// mongodb test

app.get("/test-db", async (req, res) => {
  try {
    const testUser = await User.create({
      _id: "test_" + Date.now(),
      name: "Test User",
      email: "test@example.com",
      imageUrl: "",
    });
    res.json({ success: true, user: testUser });
  } catch (error: any) {
    res.json({ success: false, error: error.message });
  }
});
// Port
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});
