import request from "supertest";
import {
  createdImageId,
  create_image_request,
} from "./common/create_image_request";

const baseUrl = process.env.ENDPOINT;
const token = "live_" + process.env.TOKEN;
const path = "v1/images/";

describe("DELETE -/v1/images -Delete image", () => {
  beforeEach(async () => {
    await create_image_request();
  });

  let deletedImageId: string;

  it("IMG_06:Verify that user can delete image", async () => {
    const response = await request(baseUrl)
      .delete(path + createdImageId)
      .set("x-api-key", token);
    expect(response.statusCode).toBe(204);
    deletedImageId = response.body.id;
  });

  it("Verify that user cannot search the deleted image", async () => {
    const response = await request(baseUrl)
      .get(path + deletedImageId)
      .set("x-api-key", token);
    expect(response.statusCode).toBe(400);
    expect(response.body.id).toBeUndefined();
    expect(response.body.url).toBeUndefined();
  });
});
