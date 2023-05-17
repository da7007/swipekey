import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import * as mongo from "mongodb";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors({
    origin: 'http://localhost:8080'
}));
const client = new mongo.MongoClient("mongodb://localhost");
async function addToDB(user) {
    await client.connect();
    const db = client.db("swipe-key-db");
    await db.collection("users").insertOne(user);
}
async function findInDB(user) {
    await client.connect();
    const db = client.db("swipe-key-db");
    const users = await db
        .collection("users")
        .findOne({ username: user.username });
    return users;
}
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
    const hashedToken = await findInDB(user);
    const compareToken = await bcrypt.compare(request.token, hashedToken.token);
    if (compareToken) {
        res.end(JSON.stringify({ tokenValidated: true }));
    }
    else {
        res.end(JSON.stringify({ tokenValidated: false }));
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
    res.end(JSON.stringify({ token: token }));
});
app.listen(port, () => {
    console.info(`Listening on port ${port}`);
});
//# sourceMappingURL=api.js.map