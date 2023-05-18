import * as mongo from "mongodb";
import { User } from "./types";

const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost");

export async function findInDB(user: User) {
  await client.connect();
  const db = client.db("swipe-key-db");

  const users = await db
    .collection("users")
    .findOne({ username: user.username });
  return users;
}
