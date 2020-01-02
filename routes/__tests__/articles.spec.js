const request = require("supertest");
const server = require("../../app");
const db = require("../../data/dbConfig");

beforeAll(async () => {
    await db("articles").truncate();
})

afterAll(async () => {
    await db("articles").truncate();
});

describe("GET /api/articles", () => {
    test("response should be empty", async () => {

        const response = await request(server)
            .get("/api/articles")

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)

    })
})