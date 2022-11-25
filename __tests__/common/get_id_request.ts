import request from "supertest";
import { baseUrl, path, token } from "../get_image_with_valid_id.spec";

export let id: string;

export async function get_id_request() {
  const response = await request(baseUrl)
    .get(`${path}/search`)
    .set("x-api-key", token)
  id = response.body[0].id;
}
