import { MongoClient, Db, Collection } from "mongodb";

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (!client) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    client = new MongoClient(uri);
    db = client.db();
    await client.connect();
  }
  return { client, db };
}

export async function getTodoCollection(): Promise<Collection> {
  const { db } = await connectToDatabase();
  return db.collection("todos");
}
