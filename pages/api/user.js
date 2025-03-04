import { connectToDB } from "@/lib/mongodb";
import User from "@/model/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDB();

    const users = await User.find({}, { password: 0 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
