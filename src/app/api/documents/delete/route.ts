import clientPromise from "@/lib/mongodb";
const { ObjectId } = require("mongodb");

export async function POST(req: Request) {
  const client = await clientPromise;
  let { _id, document } = await req.json();
  try {
    await client.connect();
    const db = client.db("libraryDB");
    const query = await db
      .collection("ouvrages")
      .deleteOne({ _id: new ObjectId(_id) });
    return Response.json({
      message: "Document deleted successfully",
      query,
      document,
    });
  } catch (error) {
    return Response.json({ message: "Failed to delete document", error });
  } finally {
    await client.close();
  }
}
