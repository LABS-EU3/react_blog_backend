// const request = require("supertest")
// const server = require('../../app');
// const db = require("../../data/dbConfig");

// beforeAll(async () => {
//     await db("reactions").delete();
// });

// afterAll(async () => {
//     await db('reactions').delete();
// });

// describe("POST /articles/reaction/:id endpoint", () => {
//     test("should return message asking user to log in to react if no user id is present", async () => {
//         const mockUserData = {
//             email: "test1000@yahoo.com",
//             password: "1234",
//             fullname: "Test User"
//         };

//         const mockAuthorData = {
//             fullname: "Test author",
//             email: "testauthor2@gmail.com",
//             password: "1234"
//       };
//       try {
//         await request(server)
//         .post("/api/auth/register")
//         .send(mockUserData);

//         const registerAuthorData = await request(server)
//             .post("/api/auth/register")
//             .send(mockAuthorData);
//         const authorId = registerAuthorData.body.response.id;

//         const mockArticle = {
//             id: 1,
//             custom_id: 12,
//             title: "Test 2",
//             authorId: authorId,
//             body: [
//                 {
//                     type: "paragraph",
//                     data: {
//                         highlighted_text: "Hey, this is a new articl"
//                     }
//                 }
//             ],
//             isEditing: false,
//             isPublished: true
//         };
//         await db('articles').insert(mockArticle);

//         const reactOnArticleResponse = await request(server).post(`/api/articles/reaction/${mockArticle.id}`)
//             expect(reactOnArticleResponse.status).toBe(404);
//             expect(reactOnArticleResponse.text).toEqual(
//                 '{"message":"Must be logged in to like article."}'
//             );
//         return reactOnArticleResponse;
//       } catch (err) {
//         expect(err).toMatch('error');
//       }
//     })
    
// })