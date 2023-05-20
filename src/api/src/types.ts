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

export interface SecretRequest {
  application: string;
  secret_name: string;
}

export interface Secret {
  _id: mongo.ObjectId,
  application: string;
  secret_name: string;
  secret_value: string;
  secret_revealed: boolean;
}
