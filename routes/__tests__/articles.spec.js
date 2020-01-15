const request = require("supertest");
const server = require("../../app");
const db = require("../../data/dbConfig");

beforeAll(async () => {
  await db("users").delete();
  await db("articles").delete();
  await db("tags").delete();
  await db("interests").delete();
  await db("follows").delete();
});

afterAll(async () => {
  await db("users").delete();
  await db("articles").delete();
  await db("tags").delete();
  await db("interests").delete();
  await db("follows").delete();
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

  // test("Should return array of relevant articles based on users interests in place of main feed if credentials are present and user has interests", async () => {
  //   const mockUserData = {
  //     email: "test2000@yahoo.com",
  //     password: "1234",
  //     fullname: "Test User"
  //   };
  //   const signUpUserResponse = await request(server)
  //     .post("/api/auth/register")
  //     .send(mockUserData);
  //   const token = signUpUserResponse.body.token;
  //   const userId = signUpUserResponse.body.response.id;

  //   const mockArticle = {
  //     id: 2,
  //     coverImageUrl:
  //       "https://images.unsplash.com/photo-1506645292803-579c17d4ba6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //     custom_id: 12,
  //     title: "Test 2",
  //     authorId: userId,
  //     body: [
  //       {
  //         type: "paragraph",
  //         data: {
  //           text:
  //             "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
  //         }
  //       }
  //     ],
  //     createdAt: "2019-12-12",
  //     updatedAt: "2019-12-12",
  //     isEditing: false,
  //     isPublished: true
  //   };
  //   await db("articles").insert(mockArticle);
  //   await db("tags").insert({ name: "Business", articleId: 2 });
  //   await db("interests").insert({ userId: userId, name: "Business" });

  //   const getArticlesResponse = await request(server)
  //     .get("/api/articles")
  //     .set("Authorization", token);

  //   expect(getArticlesResponse.status).toBe(200);
  //   expect(getArticlesResponse.body).toHaveProperty("trending");
  //   expect(getArticlesResponse.body).not.toHaveProperty("mainFeed");
  //   expect(getArticlesResponse.body).toHaveProperty("interests");
  //   expect(getArticlesResponse.body.interests[0].id).toEqual(mockArticle.id);
  // });

  // const mockUser = {
  //   email: "test3000@yahoo.com",
  //   password: "1234",
  //   fullname: "User"
  // };
  // const mockAuthor = {
  //   email: "test4000@yahoo.com",
  //   password: "1234",
  //   fullname: "Author"
  // };
  // test("Should return additional array of articles written by authors that the user follows if they follow other users", async (done) => {
  //   const signUpUserResponse = await request(server)
  //     .post("/api/auth/register")
  //     .send(mockUser);
  //   const token = signUpUserResponse.body.token;
  //   const userId = signUpUserResponse.body.response.id;

  //   const signUpAuthorResponse = await request(server)
  //     .post("/api/auth/register")
  //     .send(mockAuthor);
  //   const authorId = signUpAuthorResponse.body.response.id;

  //   const mockArticle = {
  //     id: 1,
  //     coverImageUrl:
  //       "https://images.unsplash.com/photo-1506645292803-579c17d4ba6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  //     custom_id: 12,
  //     title: "Test 2",
  //     authorId: authorId,
  //     body: [
  //       {
  //         type: "paragraph",
  //         data: {
  //           text:
  //             "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
  //         }
  //       }
  //     ],
  //     createdAt: "2019-12-12",
  //     updatedAt: "2019-12-12",
  //     isEditing: false,
  //     isPublished: true
  //   };

  //   await db("articles").insert(mockArticle);
  //   await db("follows").insert({ followerId: userId, followingId: authorId });

  //   const getArticlesResponse = await request(server)
  //     .get("/api/articles")
  //     .set("Authorization", token);

  //   expect(getArticlesResponse.status).toBe(200);
  //   expect(getArticlesResponse.body).toHaveProperty("trending");
  //   expect(getArticlesResponse.body).toHaveProperty("following");
  //   expect(getArticlesResponse.body.following[0].authorId).toEqual(authorId);
  //   done();
  // });
});