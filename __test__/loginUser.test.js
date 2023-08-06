/*
1. The response must have status-code 200.
2. It must be a token in the response.
3. It must be an object "user" with two fields inside the response: "email" and "subscription" with data-type String.
*/

const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { loginUser } = require("../controllers/auth-controllers");

require("dotenv").config();

const { DB_HOST, JWT_SECRET } = process.env;

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
    const expectedStatusCode = 200;

    const response = await request(app)
      .post("/api/users/login")
      .send(sendingObject);

    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test("there is a token in the response", async () => {
    const expectedFieldName = "token";
    const typeOfToken = "string";

    const response = await request(app)
      .post("/api/users/login")
      .send(sendingObject);

    expect(Object.keys(response.body).includes(expectedFieldName)).toBeTruthy();
    expect(typeof response.body[expectedFieldName]).toBe(typeOfToken);
    expect(() => {
      jwt.verify(response.body[expectedFieldName], JWT_SECRET);
    }).not.toThrow(Error);
  });

  test("there is an object 'user' with defined fields in the response", async () => {
    const expectedObjectName = "user";
    const expectedFieldsNames = ["email", "subscription"];
    const typeOfData = "string";

    const response = await request(app)
      .post("/api/users/login")
      .send(sendingObject);

    expect(
      Object.keys(response.body).includes(expectedObjectName)
    ).toBeTruthy();
    expect(Object.keys(response.body[expectedObjectName])).toEqual(
      expectedFieldsNames
    );
    expect(
      typeof response.body[expectedObjectName][expectedFieldsNames[0]]
    ).toBe(typeOfData);
    expect(
      typeof response.body[expectedObjectName][expectedFieldsNames[1]]
    ).toBe(typeOfData);
  });
});
