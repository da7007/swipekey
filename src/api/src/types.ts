import * as mongo from "mongodb";

export interface User {
  _id: mongo.ObjectId;
  username: string;
  email: string;
  password: string;
  token: string;
}

export interface AuthRequest {
  username: string;
  email: string;
  password: string;
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
