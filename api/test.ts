const { startServer } = require("./server");
const supertest = require("supertest");
import { initDb } from "../api/database/utils";
const basicAuthUsername: string = process.env.BASIC_AUTH_USERNAME || ""; //sets basic auth username
const basicAuthPassword: string = process.env.BASIC_AUTH_PASSWORD || ""; //sets basic auth password
let requestWithSupertest: any = undefined;

beforeAll(async () => {
  const db = require("./database/db");
  await initDb(db); //initialises db
  const server = await startServer(); //starts server
  requestWithSupertest = supertest(server); //creates supertest server
});

describe("V1 Weather Endpoint", () => {
  it("should show a list of weather data and return a 200 response code", async () => {
    const res = await requestWithSupertest
      .get(
        "/v1/weather?postcode=CT27UF&start_date=2022-04-02&end_date=2022-04-09"
      )
      .auth(basicAuthUsername, basicAuthPassword);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("weather");
  });

  it("should fail and return 400 due to no postcode param", async () => {
    const res = await requestWithSupertest
      .get("/v1/weather?start_date=2022-04-02&end_date=2022-04-09")
      .auth(basicAuthUsername, basicAuthPassword);

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail and return 400 due to BAD postcode param", async () => {
    const res = await requestWithSupertest
      .get("/v1/weather?postcode=HI&start_date=2022-04-02&end_date=2022-04-09")
      .auth(basicAuthUsername, basicAuthPassword);

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("errors");
  });

  it("should accept and return 200 for a postcode with a space", async () => {
    const res = await requestWithSupertest
      .get(
        "/v1/weather?postcode=BS15%203FW&start_date=2022-04-02&end_date=2022-04-09"
      )
      .auth(basicAuthUsername, basicAuthPassword);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("weather");
  });

  it("should fail and return 400 due to no start_date param", async () => {
    const res = await requestWithSupertest
      .get("/v1/weather?postcode=CT27UF&end_date=2022-04-09")
      .auth(basicAuthUsername, basicAuthPassword);

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail and return 400 due to no end_date param", async () => {
    const res = await requestWithSupertest
      .get("/v1/weather?postcode=CT27UF&start_date=2022-04-02")
      .auth(basicAuthUsername, basicAuthPassword);

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail and return 401 due to lack of basic auth", async () => {
    const res = await requestWithSupertest.get(
      "/v1/weather?postcode=CT27UF&start_date=2022-04-02&end_date=2022-04-09"
    );
    expect(res.status).toEqual(401);
  });
});
