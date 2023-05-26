import * as mongo from "mongodb";
import * as types from "./types";

const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost");

export async function findUserInDB(user: types.User) {
  await client.connect();
  const db = client.db("swipe-key-db");

  const users = await db
    .collection("users")
    .findOne({ username: user.username });
  return users;
}

export async function findUserByEmailInDB(user: types.User) {
  await client.connect();
  const db = client.db("swipe-key-db");

  const users = await db
    .collection("users")
    .findOne({ email: user.email });
  return users;
}
export async function findSecretInDB(secret: types.Secret) {
  await client.connect();
  const db = client.db("swipe-key-db");

  const secrets = await db
    .collection("secrets")
    .findOne({ application: secret.application, secret_name: secret.secret_name });
  return secrets;
}

export async function getAllSecretsInDB() {
  await client.connect();
  const db = client.db("swipe-key-db");

  const secrets = await db.collection("secrets").find({}).toArray();

  return secrets;
}