import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import * as mongo from "mongodb";
import cors from "cors";
import { addToDB } from "./src/addToDB";
import { findInDB } from "./src/findInDB";
import * as types from "./src/types";

const app = express();
const port: number = 3000;
app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "http://localhost:8080",
  })
);

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

  const hashedToken: any = await findInDB(user);
  const compareToken = await bcrypt.compare(request.token, hashedToken.token);

  if (compareToken) {
    res.end(JSON.stringify({ tokenValidated: true }));
  } else {
    res.end(JSON.stringify({ tokenValidated: false }));
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

  res.end(JSON.stringify({ token: token }));
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
