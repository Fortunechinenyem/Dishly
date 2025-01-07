import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const { recipeId, title, image } = req.body;

    await db
      .collection("favorites")
      .updateOne(
        { userId: session.user.id, recipeId },
        { $set: { title, image } },
        { upsert: true }
      );

    return res.status(201).json({ message: "Recipe added to favorites" });
  }

  if (req.method === "GET") {
    const favorites = await db
      .collection("favorites")
      .find({ userId: session.user.id })
      .toArray();

    return res.status(200).json(favorites);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
