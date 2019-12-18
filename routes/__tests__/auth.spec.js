const request = require("supertest");
const server = require("../../app");
const db = require("../../data/dbConfig");

beforeAll(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db("users").truncate();
});

describe("POST /api/auth/register", () => {
  test("should return HTTP status code 201 when successful", async () => {
    const validMockData = {
      username: "testuser",
      email: "testuser999@gmail.com",
      password: "password",
      confirmPassword: "password"
    };

    const response = await request(server)
      .post("/api/auth/register")
      .send(validMockData);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("username", validMockData.username);
    expect(response.body).toHaveProperty("email", validMockData.email);
    expect(response.body).toHaveProperty("id");
  });

  test("should return HTTP status code 400 when missing data", async () => {
    const invalidMockData = {
      username: "testuser",
      email: "",
      password: "testpassword"
    };

    const response = await request(server)
      .post("/api/auth/register")
      .send(invalidMockData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("POST /api/auth/login", () => {
  test("should return an HTTP status code of 200 if user logs in successflly", async () => {
    const loginMockData = {
      email: "testuser999@gmail.com",
      token: "token"
    };

    const response = await request(server)
    .post("/api/auth/login")
    .send(loginMockData)

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("email", loginMockData.email);
    expect(response.body).toHaveProperty("token", loginMockData.token);
  });

  test("should return an HTTP status code of 400 if any of the fields are missing", async () => {
    const wrongLoginMockData = {
      username: "",
      password: "testpassword"
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(wrongLoginMockData);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);

  })
})
