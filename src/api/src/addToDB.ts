import * as mongo from "mongodb";
import { User } from "./types";

const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost");

export async function addToDB(user: User) {
  await client.connect();
  const db = client.db("swipe-key-db");
  await db.collection("users").insertOne(user);
}
