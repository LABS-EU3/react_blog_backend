// const request = require("supertest");
// const server = require("../../app");
// const db = require("../../data/dbConfig");

// // beforeAll(async () => {
// //     await db("articles").truncate();
// // })

// // afterAll(async () => {
// //     await db("articles").truncate();
// // });

// describe("GET /api/articles", () => {
//     test("response should be empty", async () => {

//         const response = await request(server)
//             .get("/api/articles")

//         expect(response.status).toBe(404)
//         expect(response.body).toBeInstanceOf(Object)

//     })
// })

describe("server", () => {
    describe("[GET] / endpoint", () => {
      test("the db env is testing", () => {
        expect(process.env.DB_ENV).toBe("testing");
      });
    });
  });