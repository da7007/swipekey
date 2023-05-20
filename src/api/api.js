import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import * as mongo from "mongodb";
import cors from "cors";
import { addToDB } from "./src/addToDB.js";
import { findSecretInDB, findUserInDB, getAllSecretsInDB } from "./src/findInDB.js";
const app = express();
const port = 3000;
app.use(cors({
    methods: ["GET", "POST"],
    origin: "*",
}));
app.get("/secrets", async (req, res) => {
    const secrets = await getAllSecretsInDB();
    res.send({ secrets });
});
app.post("/fetch", async (req, res) => {
    const request = {
        application: req.query.application,
        secret_name: req.query.secret_name,
    };
    const secret = {
        _id: new mongo.ObjectId(),
        application: request.application,
        secret_name: request.secret_name,
        secret_value: "",
        secret_revealed: false,
    };
    console.log(request);
    const fetchedSecret = await findSecretInDB(secret);
    console.log(fetchedSecret);
    res.send({ fetchedSecret });
});
app.post("/auth", async (req, res) => {
    let request = {
        username: req.query.username,
        email: req.query.email,
        token: req.query.token,
        password: req.query.password,
    };
    let user = {
        _id: new mongo.ObjectId(),
        username: request.username,
        email: request.email,
        password: request.password,
        token: request.token,
    };
    const hashedToken = await findUserInDB(user);
    const compareToken = await bcrypt.compare(request.token, hashedToken.token);
    if (compareToken) {
        res.send(200);
    }
    else {
        res.send(403);
    }
});
app.post("/register", async (req, res) => {
    let request = {
        username: req.query.username,
        email: req.query.email,
        password: req.query.password,
    };
    const salt = await bcrypt.genSalt(15);
    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(request.password, salt);
    const hashedToken = await bcrypt.hash(token, salt);
    let user = {
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
//# sourceMappingURL=api.js.map