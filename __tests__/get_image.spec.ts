import request from "supertest";

const baseUrl = process.env.ENDPOINT;
const token = "live_" + process.env.TOKEN;
const path = "v1/images/search";

describe("GET -/v1/images/search -Search image successfully", () => {
  it("IMG_01: Verify that user can search random image", async () => {
    const response = await request(baseUrl).get(path).set("x-api-key", token);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).not.toBeNull();
    expect(typeof response.body[0].id).toBe("string");
    expect(response.body[0].url).not.toBeNull();
    expect(typeof response.body[0].url).toBe("string");
    expect(response.body[0].width).toBeGreaterThan(0);
    expect(response.body[0].height).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("IMG_02: Verify that user can search image with limit", async () => {
    let limit = 2;
    const response = await request(baseUrl)
      .get(`${path}?limit=` + limit)
      .set("x-api-key", token);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).not.toBeNull();
    expect(response.body[1].id).not.toBeNull();
    expect(response.body.length).toBe(limit);
  });

  it("IMG_04: Verify that user can get image with breed_ids", async () => {
    let breedID = "beng";
    const response = await request(baseUrl)
      .get(`${path}?breed_ids=` + breedID)
      .set("x-api-key", token);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].breeds[0].id).toEqual(breedID);
  });
});
