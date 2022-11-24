import request from "supertest";
import { baseUrl, path, mockFiles, token } from "../post_image.spec";

export let createdImageId: string;

export async function create_image_request() {
  const response = await request(baseUrl)
    .post(path)
    .attach("file", mockFiles)
    .set("x-api-key", token)
    .set("Content-Type", "multipart/form-data");
  createdImageId = response.body.id;
}
