const request = require("supertest");
const server = require("../../app");
const db = require("../../data/dbConfig");

beforeAll(async () => {
  await db("articles").delete();
});

afterAll(async () => {
  await db("articles").delete();
});

describe("GET /api/articles", () => {
  test("should return 200 an object containing arrays of articles", async () => {
    const response = await request(server).get("/api/articles");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  test("Should return array of trending articles and array for main feed if no credentials are present", async () => {
    const response = await request(server).get("/api/articles");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("trending");
    expect(response.body).toHaveProperty("mainFeed");
  });
  test("Should return array of trending articles and array for main feed if credentials are present but user does not have interests or follow any other authors", async () => {
    const mockUserData = {
      email: "test1000@yahoo.com",
      password: "1234",
      fullname: "Test User"
    };
    const signUpUserResponse = await request(server)
      .post("/api/auth/register")
      .send(mockUserData);
    const token = signUpUserResponse.body.token;

    const getArticlesResponse = await request(server)
      .get("/api/articles")
      .set("Authorization", token);
    expect(getArticlesResponse.status).toBe(200);
    expect(getArticlesResponse.body).toHaveProperty("trending");
    expect(getArticlesResponse.body).toHaveProperty("mainFeed");
  });
});
