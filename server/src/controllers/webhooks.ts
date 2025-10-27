import { Webhook } from "svix";
import { Request, Response } from "express";

import User from "../models/user";
import { CLERK_WEBHOOK_SECRET } from "../config/env";

// API Controller function to manage clerk user with database

export const clerkwebhooks = async (req: any, res: any) => {
  try {
    const whook = new Webhook(CLERK_WEBHOOK_SECRET!);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    });
    const { data, type } = req.body;
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
    }
  } catch (error: any) {
    res.json({
      success: false,
      message: (error as Error)?.message || "internal server error",
    });
  }
};
