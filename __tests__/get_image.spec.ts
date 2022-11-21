import request from "supertest";

const baseUrl = process.env.ENDPOINT;
const token = process.env.TOKEN;

describe("search image", () => {
  it("Verify that user can search random image", async () => {
    let accessToken = "live_" + token;
    const response = await request(baseUrl)
      .get("v1/images/search")
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(200);
    // expect(response.body[0].id.string).toBe(true);
    // console.log(response.body);
  });
});
