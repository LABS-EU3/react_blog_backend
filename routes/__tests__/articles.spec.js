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
  test("response should return 200 an object containing arrays of articles", async () => {
    const response = await request(server).get("/api/articles");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  test("response should always return array of trending articles, regardless of whether credentials are present", async () => {
    const response = await request(server).get("/api/articles");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("trending");
  });
});
