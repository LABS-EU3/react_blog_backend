// const request = require("supertest");
// const server = require("../../app");
// const db = require("../../data/dbConfig");

// beforeAll(async () => {
//   await db("users").delete();
// });

// afterAll(async () => {
//   await db("users").delete();
// });

// describe("GET /api/users/:userId", () => {
//   test("should return HTTP status code 200 & relevant user data when successful", async () => {
//     const validMockData = {
//       fullname: "testuser",
//       email: "testuser999@gmail.com",
//       password: "password"
//     };

//     const registerResponse = await request(server)
//       .post("/api/auth/register")
//       .send(validMockData);

//     expect(registerResponse.status).toBe(201);
//     const userId = registerResponse.body.id;
//     const getUserResponse = await request(server).get(`/api/users/${userId}`);

//     expect(getUserResponse.status).toBe(200);
//     expect(getUserResponse.body).toEqual({
//       user: {
//         avatarUrl: null,
//         email: "testuser999@gmail.com",
//         id: userId,
//         fullname: "testuser"
//       }
//     });
//   });

//   test("should return status 404 for user that does not exist", async () => {
//     const response = await request(server).get("/api/users/99999");
//     expect(response.status).toBe(404);
//   });
// });

// describe("[GET] /api/users endpoint", () => {
//   test("should return status 200", async () => {
//     const response = await request(server).get("/api/users");
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Object);
//   });
// });

describe("server", () => {
  describe("[GET] / endpoint", () => {
    test("the db env is testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
});