import request from "supertest";
import { create_image_request } from "./common/create_image_request";

export const baseUrl = process.env.ENDPOINT;
export const token = "live_" + process.env.TOKEN;
export const mockFiles = "./image_file/1.jpg";
export const path = "v1/images/upload";
const image = "./image_file/2.jpg";

describe("POST -/v1/images/upload -upload image", () => {
  beforeEach(async () => {
    await create_image_request();
  });

  it("IMG_09:Verify that user cannot upload with a different image file which not contain cat image", async () => {
    const response = await request(baseUrl)
      .post(path)
      .attach("file", image)
      .set("x-api-key", token)
      .set("Content-Type", "multipart/form-data");
    expect(response.statusCode).toBe(400);
    expect(response.body.id).toBeUndefined();
    expect(response.body.url).toBeUndefined();
  });
});
