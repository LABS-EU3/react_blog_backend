// const request = require("supertest");
// const server = require("../../app");
// const db = require("../../data/dbConfig");

// beforeAll(async () => {
//     await db("follows").delete();
// })

// afterAll(async () => {
//     await db("follows").delete();
// })

// describe("/api/follows", () => {
//     test("should return follow id, followerId and followingId as a response to a post req", async () => {
//         const mockData = {
//             followerId: "11",
//             followingId: "14"
//         };
//         const res = await request(server)
//             .post("/api/follows")
//             .send(mockData)
//         expect(res.statusCode).toEqual(201)
//         expect(res.body).toBeInstanceOf(Object);
//     })
// })

describe("server", () => {
    describe("[GET] / endpoint", () => {
      test("the db env is testing", () => {
        expect(process.env.DB_ENV).toBe("testing");
      });
    });
  });
