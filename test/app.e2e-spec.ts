import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { BaseHttpFilter } from "./../src/common/filters/base-http.filter";
import { GlobalValidationPipe } from "./../src/common/pipes/global-validation.pipe";

// ต้องมี .env ครบ (แอปตรวจ env ตอนเริ่ม) ทุกเคสในนี้ไม่ query DB
describe("Auth routes (e2e)", () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new GlobalValidationPipe());
    app.useGlobalFilters(new BaseHttpFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /auth/register is reachable without a token", () => {
    return request(app.getHttpServer())
      .post("/auth/register")
      .send({ email: "not-an-email", password: "x" })
      .expect(400)
      .expect(({ body }) => {
        expect(body).toMatchObject({ errorCode: "VALIDATION_ERROR" });
      });
  });

  it("PATCH /users requires a token", () => {
    return request(app.getHttpServer())
      .patch("/users")
      .expect(401)
      .expect(({ body }) => {
        expect(body).toMatchObject({ errorCode: "MISSING_TOKEN" });
      });
  });
});
