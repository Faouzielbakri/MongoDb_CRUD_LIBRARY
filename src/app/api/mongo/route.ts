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
    console.log(query);
    const ouvrages = await db.collection("ouvrages").find(query).toArray();
    return Response.json({ data: ouvrages });
  } catch (error) {
    return Response.json({ error: "Failed to fetch documents" });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const { ouvrage } = await req.json();
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("libraryDB");
    const collection = db.collection("ouvrages");
    await collection.insertOne(ouvrage);
    return Response.json({ message: "Insetred Successfully " });
  } catch (error) {
    return Response.json({ error: "Failed to fetch documents" });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
export async function PUT(req: NextApiRequest) {
  const client = await clientPromise;
  const { _id, update } = req.body;

  try {
    await client.connect();
    const db = client.db("libraryDB");
    await db.collection("ouvrages").updateOne({ _id }, { $set: update });
    return Response.json({ message: "Document updated successfully" });
  } catch (error) {
    return Response.json({ error: "Failed to update document" });
  } finally {
    await client.close();
  }
}

export async function DELETE(req: NextApiRequest) {
  const client = await clientPromise;
  const { searchParams } = new URL(req?.url ?? "");
  const id = searchParams.get("id") as unknown as number;

  try {
    await client.connect();
    const db = client.db("libraryDB");
    // const s = await db.collection("ouvrages").deleteOne({ _id });
    console.log(id);
    const s = await db.collection("ouvrages").deleteOne({ _id: 3 });
    return Response.json({ message: "Document deleted successfully", s });
  } catch (error) {
    return Response.json({ error: "Failed to delete document" });
  } finally {
    await client.close();
  }
}
