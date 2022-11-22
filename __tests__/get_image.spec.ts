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
    expect(response.body[0].id).not.toBeNull();
    expect(response.body[0].url).not.toBeNull();
    expect(response.body[0].width).toBeGreaterThan(0);
    expect(response.body[0].height).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);
    // console.log(response.body);
  });

  it("Verify that user can search image with limit", async () => {
    let accessToken = "live_" + token;
    const limit = 2;
    const response = await request(baseUrl)
      .get("v1/images/search?limit=" + limit)
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).not.toBeNull();
    expect(response.body[1].id).not.toBeNull();
    // console.log(response.body);
  });

  it("Verify that user can get image with existing id", async () => {
    let accessToken = "live_" + token;
    let imageId = "e7t";
    const response = await request(baseUrl)
      .get("v1/images/" + imageId)
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(imageId);
    console.log(response.body);
  });

  
});
