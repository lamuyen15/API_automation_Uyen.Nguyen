import request from "supertest";

const baseUrl = process.env.ENDPOINT;
const token = process.env.TOKEN;
let accessToken = "live_" + token;

describe("search image", () => {
  it("Verify that user can search random image", async () => {
    const response = await request(baseUrl)
      .get("v1/images/search")
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).not.toBeNull();
    expect(response.body[0].url).not.toBeNull();
    expect(response.body[0].width).toBeGreaterThan(0);
    expect(response.body[0].height).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Verify that user can search image with limit", async () => {
    const limit = 2;
    const response = await request(baseUrl)
      .get("v1/images/search?limit=" + limit)
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).not.toBeNull();
    expect(response.body[1].id).not.toBeNull();
  });

  it("Verify that user can get image with existing id", async () => {
    let imageId = "e7t";
    const response = await request(baseUrl)
      .get("v1/images/" + imageId)
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(imageId);
    console.log(response.body);
  });
  it("Verify that user can get image with breed_ids", async () => {
    let breedID = "beng";
    const response = await request(baseUrl)
      .get("v1/images/search?breed_ids=" + breedID)
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].breeds[0].id).toEqual(breedID);
    console.log(response.body);
  });
});
