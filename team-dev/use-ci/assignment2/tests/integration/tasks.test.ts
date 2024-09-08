import { sequelize } from "../../src/db";
import request from "supertest";
import app from "../../src/app";

describe("Integration Test", () => {
  beforeAll(async () => {
    await sequelize.sync(); // DBの同期（テーブルを作成）
  });

  afterAll(async () => {
    await sequelize.close(); // DB接続を閉じる
  });

  test("GET /tasks should return all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
