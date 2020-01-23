const request = require("supertest");
const server = require("../../app");
const db = require("../../data/dbConfig");

beforeAll(async () => {
    await db("interests").delete();
});

afterAll(async () => {
    await db("interests").delete();
})

describe("GET /api/interests", () => {
    test("should return 200 and an object containing an array of interests", async () => {
        const response = await request(server).get("/api/articles");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object)
    });

    test("should return name of interest, userId and id of interest when a post request is made", async () => {
        const mockData = {
            name: "Tech",
            userId: "12",
        };
        const res = await request(server)
            .post("/api/interests")
            .send(mockData)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toBeInstanceOf(Object);
    })

})

