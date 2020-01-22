const request = require("supertest");
const server = require("../../app");
const db = require("../../data/dbConfig");

beforeAll(async () => {
  await db("users").delete();
});

afterAll(async () => {
  await db("users").delete();
});

describe("POST /api/auth/register", () => {
  test("should return HTTP status code 201 when successful", async () => {
    const validMockData = {
      fullname: "testuser",
      email: "testuser999@gmail.com",
      password: "password",
    };

    const response = await request(server)
      .post("/api/auth/register")
      .send(validMockData);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.response).toHaveProperty("fullname", validMockData.fullname);
    expect(response.body.response).toHaveProperty("email", validMockData.email);
    expect(response.body.response).toHaveProperty("id");
  });

  // test("should return HTTP status code 400 when missing data", async () => {
  //   const invalidMockData = {
  //     fullname: "testuser",
  //     email: "",
  //     password: "testpassword"
  //   };

  //   const response = await request(server)
  //     .post("/api/auth/register")
  //     .send(invalidMockData);

  //   // expect(response.status).toBe(400);
  //   expect(response.body).toBeInstanceOf(Object);
  // });
});

// describe("POST /api/auth/login", () => {
//   test("should return an HTTP status code of 200 if user logs in successflly", async () => {
//     const loginMockData = {
//       email: "testuser999@gmail.com",
//       password: "password"
//     };

//     const response = await request(server)
//     .post("/api/auth/login")
//     .send(loginMockData)
//     expect(response.status).toBe(200);
//   });
// })
