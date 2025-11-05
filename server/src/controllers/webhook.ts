import { Webhook } from "svix";
import User from "../models/user";

// API controller function to manage clerk user with database
export const clerkWebhooks = async (req:any, res:any) => {
  try {
    // Validate webhook secret
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      return res.status(500).json({ success: false, message: "CLERK_WEBHOOK_SECRET not configured" });
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    // Verify webhook signature
    //  ✅ FIXED: Use the raw Buffer directly, don't stringify it
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = req.body;
    
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url
        };

        await User.create(userData);
        res.json({ success: true, message: "User created" });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url
        };
        
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        res.json({ success: true, message: "User updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ success: true, message: "User deleted" });
        break;
      }

      default:
        res.json({ success: false, message: "Unhandled event type" });
        break;
    }

  } catch (error:any) {
    console.error("Webhook error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};