const request = require("supertest")
const server = require('../../app');
const db = require("../../data/dbConfig");

beforeAll(async () => {
    await db("reactions").delete();
});

afterAll(async () => {
    await db('reactions').delete();
});

describe("POST /api/reactions", () => {
    test("should create a new reaction when a user highlights an article and adds a reaction", async ()=> {
        const mockUserData = {
            email: "test1000@yahoo.com",
            password: "1234",
            fullname: "Test User"
        };
        const signUpUserResponse = await request(server)
            .post("/api/auth/register")
            .send(mockUserData);
        const token = signUpUserResponse.body.token;

        const reactionBody = {
            highlighted_text: "test highlighted string",
            emoji: "test emoji string"
        }
        const postReactionsResponse = await request(server)
            .post("/api/reactions", reactionBody)
            .set("Authorization", token);

        expect(postReactionsResponse.status).toBe(201);
        expect()

    })
})