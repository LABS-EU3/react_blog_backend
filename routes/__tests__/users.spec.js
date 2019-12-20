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
      user: { "avatarUrl": null, email: "testuser999@gmail.com", id: userId, username: "testuser" }
    });
  });

  test("should return status 404 for user that does not exist", async () => {
    const response = await request(server).get("/api/users/99999");
    expect(response.status).toBe(404);
  });
});

describe("[GET] /api/users endpoint", () => {
  test("should return status 200", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
