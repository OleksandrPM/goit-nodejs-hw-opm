/*
1. The answer must have status-code 200.
2. It must be a token in the answer.
3. It must be an object with two fields inside: "email" and "subscription" with data-type String in the answer.
*/

const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const { loginUser } = require("../controllers/auth-controllers");

require("dotenv").config();

const { DB_HOST } = process.env;

const app = express();
app.use(express.json());
app.post("/api/users/login", loginUser);

describe("test loginUser controller", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });
  afterAll(async () => await mongoose.connection.close());

  const sendingObject = { password: "123456", email: "olekspm@gmail.com" };

  test("answer status-code equals 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(sendingObject);
    expect(response.statusCode).toBe(200);
    console.log(response.body); // del
  });
});
