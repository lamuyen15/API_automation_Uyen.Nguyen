import request from "supertest";

const baseUrl = process.env.ENDPOINT;
const token = process.env.TOKEN;
//change location image when download
const mockFiles = "D:/API_automation_Uyen.Nguyen/imageFile/1.jpg";
let imageID: string;

describe("delete image", () => {
  // post image to get id
  let accessToken = "live_" + token;
  beforeEach(async () => {
    const response = await request(baseUrl)
      .post("v1/images/upload")
      .attach("file", mockFiles)
      .set("x-api-key", accessToken)
      .set("Content-Type", "multipart/form-data");
    expect(response.statusCode).toBe(201);
    expect(response.body.original_filename).toEqual("1.jpg");
    imageID = response.body.id;
  });

  //get id from response to delete image
  it("Verify that user can delete image", async () => {
    const response = await request(baseUrl)
      .delete("v1/images/" + imageID)
      .set("x-api-key", accessToken);
    expect(response.statusCode).toBe(204);
  });
});
