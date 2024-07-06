import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest) {
  const client = await clientPromise;
  const { searchParams } = new URL(req?.url ?? "");
  const title = searchParams.get("title");

  try {
    await client.connect();
    const db = client.db("libraryDB");
    const query = title ? { titre: { $regex: title } } : {};
    const ouvrages = await db.collection("ouvrages").find(query).toArray();
    return Response.json({ data: ouvrages.reverse() });
  } catch (error) {
    return Response.json({ error: "Failed to fetch documents" });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
