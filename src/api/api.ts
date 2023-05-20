import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import * as mongo from "mongodb";
import cors from "cors";
import { addToDB } from "./src/addToDB.js";
import { findSecretInDB, findUserInDB, getAllSecretsInDB } from "./src/findInDB.js";
import * as types from "./src/types";

const app = express();
const port: number = 3000;

app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "*",
  })
);

app.get("/secrets", async(req, res) => {
  const secrets: any = await getAllSecretsInDB();

  res.send({secrets})
});

app.post("/fetch", async (req, res) => {
  const request: types.SecretRequest = {
    application: req.query.application as string,
    secret_name: req.query.secret_name as string,
  };

  const secret: types.Secret = {
    _id: new mongo.ObjectId(),
    application: request.application,
    secret_name: request.secret_name,
    secret_value: "",
    secret_revealed: false,
  };
  console.log(request);
  const fetchedSecret: any = await findSecretInDB(secret);
  console.log(fetchedSecret);
  res.send({ fetchedSecret });
});

app.post("/auth", async (req, res) => {
  let request: types.AuthRequest = {
    username: req.query.username as string,
    email: req.query.email as string,
    token: req.query.token as string,
    password: req.query.password as string,
  };

  let user: types.User = {
    _id: new mongo.ObjectId(),
    username: request.username,
    email: request.email,
    password: request.password,
    token: request.token,
  };

  const hashedToken: any = await findUserInDB(user);
  const compareToken = await bcrypt.compare(request.token, hashedToken.token);

  if (compareToken) {
    res.send(200);
  } else {
    res.send(403);
  }
});

app.post("/register", async (req, res) => {
  let request: types.RegisterRequest = {
    username: req.query.username as string,
    email: req.query.email as string,
    password: req.query.password as string,
  };

  const salt = await bcrypt.genSalt(15);
  const token: string = crypto.randomBytes(32).toString("hex");

  const hashedPassword = await bcrypt.hash(request.password, salt);
  const hashedToken = await bcrypt.hash(token, salt);

  let user: types.User = {
    _id: new mongo.ObjectId(),
    username: request.username,
    email: request.email,
    password: hashedPassword,
    token: hashedToken,
  };

  addToDB(user);
  console.info(`Token is: ${token}`);
  res.end(JSON.stringify({ token: token }));
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
