// auth.js
import "dotenv/config";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
}

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be set");
}

const client = new MongoClient(MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(client),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
  },

  session: {
    strategy: "cookie", // IMPORTANT
  },

  account: {
    linking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
});