import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const client = await clientPromise;
  const { ouvrage } = await req.json();
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("libraryDB");
    const collection = db.collection("ouvrages");
    await collection.insertOne(ouvrage);
    return Response.json({ message: "Inserted Successfully " });
  } catch (error) {
    return Response.json({
      error: "Failed to fetch documents",
      message: error,
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
