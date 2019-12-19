const request = require("supertest");
const server = require("../../app");
const db = require("../../data/dbConfig");

beforeAll(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db("users").truncate();
});

describe("GET /api/users/:userId", () => {
  test("should return HTTP status code 200 & relevant user data when successful", async () => {
    const validMockData = {
      username: "testuser",
      email: "testuser999@gmail.com",
      password: "password",
      confirmPassword: "password"
    };

    const userId = 1;

    const registerResponse = await request(server)
      .post("/api/auth/register")
      .send(validMockData);

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty("id", userId);

    const getUserResponse = await request(server).get(`/api/users/${userId}`);

    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body).toEqual({
      user: { email: "testuser999@gmail.com", id: userId, username: "testuser" }
    });
  });
});
