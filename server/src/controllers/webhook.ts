import { Webhook } from "svix";
import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user";
import { CLERK_WEBHOOK_SECRET, MONGODB_URI } from "../config/env";

export const clerkWebhooks = async (req: Request, res: Response) => {
  try {
    console.log("Webhook received:", req.body);

    // Ensure MongoDB connection is alive
    if (mongoose.connection.readyState !== 1) {
      console.log("Reconnecting to MongoDB...");
      await mongoose.connect(MONGODB_URI as string);
    }

    if (CLERK_WEBHOOK_SECRET) {
      try {
        const whook = new Webhook(CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
          "svix-id": req.headers["svix-id"] as string,
          "svix-timestamp": req.headers["svix-timestamp"] as string,
          "svix-signature": req.headers["svix-signature"] as string,
        });
        console.log("Webhook verification successful");
      } catch (verifyError) {
        console.error("Webhook verification failed:", verifyError);
        return res.status(401).json({ error: "Webhook verification failed" });
      }
    }

    const { data, type } = req.body;
    console.log(`Webhook type: ${type}`, data);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url || "",
        };
        console.log("Creating user:", userData);

        try {
          const newUser = await User.create(userData);
          console.log("User created successfully in DB:", newUser);
          return res.json({
            success: true,
            message: "User created",
            user: newUser,
          });
        } catch (dbError: any) {
          console.error("Database error:", dbError);
          return res.status(500).json({
            success: false,
            message: "Failed to save user to database",
            error: dbError.message,
          });
        }
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url || "",
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.json({ success: true, message: "User updated" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true, message: "User deleted" });
      }

      default:
        return res.json({
          success: true,
          message: "Webhook received but not handled",
        });
    }
  } catch (error: any) {
    console.error("Webhook error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};