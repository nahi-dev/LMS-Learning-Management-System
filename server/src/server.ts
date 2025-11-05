import express from "express";
import cors from "cors";
import "dotenv/config";
import { PORT } from "./config/env";
import connectToDatabase from "./database/mongodb";
import { clerkWebhooks } from "./controllers/webhook";
// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get("/", (req, res) => {
  res.send("API working");
});
// app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

app.get("/clerk", (req,res)=>{
  res.send("clerk route")
})
app.post("/clerk", clerkWebhooks);
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
