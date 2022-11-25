import request from "supertest";
import { get_id_request, id } from "./common/get_id_request";

export const baseUrl = process.env.ENDPOINT;
export const token = "live_" + process.env.TOKEN;
export const path = "v1/images";

describe("GET -/v1/images/ -Get image", () => {
  beforeEach(async () => {
    await get_id_request();
  });

  it("Verify that user can get image with existing id", async () => {
    const response = await request(baseUrl)
      .get(`${path}/${id}`)
      .set("x-api-key", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(id);
  });
});
