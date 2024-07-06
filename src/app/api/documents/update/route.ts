import clientPromise from "@/lib/mongodb";
const { ObjectId } = require("mongodb");

export async function POST(req: Request) {
  const client = await clientPromise;
  const { _id, update } = await req.json();

  try {
    await client.connect();
    const db = client.db("libraryDB");
    const s = await db
      .collection("ouvrages")
      .updateOne({ _id: new ObjectId(_id) }, { $set: update });
    return Response.json({ message: "Document updated successfully", s });
  } catch (error) {
    return Response.json({
      message: "Failed to update document",
      error,
    });
  } finally {
    await client.close();
  }
}
