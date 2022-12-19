import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import express from "express";
import supertest from "supertest";
import bookRoutes from "../books/routes/book.routes";
import { mongoConnect, mongoDisconnect } from "../db/mongo.connect";
import reviewRoutes from "../reviews/routes/review.routes";
import { faker } from "@faker-js/faker";

const app = express();
app.use(express.json());
app.use("/reviews", reviewRoutes);
app.use("/book", bookRoutes);

const testReview = {
  title: faker.name.jobArea(),
  review: ["review test"],
  score: 3,
};

const testReview2 = {
  title: faker.name.jobArea(),
  review: ["review test2"],
  score: 2,
};

const testBook = {
  title: faker.name.jobArea(),
  releaseDate: "08/09/1998",
  language: ["português", "inglês"],
  status: true,
  author: faker.name.fullName(),
};

const testBook2 = {
  language: ["português", "inglês"],
  status: false,
};

beforeAll(() => {
  mongoConnect(true);
});

afterAll(async () => {
  await mongoDisconnect();
});

describe("Book", () => {
  it("should create book", async () => {
    const response = await supertest(app).post("/book").send(testBook);
    expect(response.status).toBe(201);
  });
  it("should get all book", async () => {
    const response = await supertest(app).get("/book");
    expect(response.status).toBe(200);
  });

  it("should get book by id", async () => {
    const getAll = await supertest(app).get("/book");
    const id = getAll.body[0]._id;
    const response = await supertest(app).get(`/book/${id}`);
    expect(response.status).toBe(200);
  });

  it("should get by author per book", async () => {
    const response = await supertest(app).get("/book?author=Pedro");
    expect(response.status).toBe(200);
  });

  it("should update book", async () => {
    const getAll = await supertest(app).get("/book");
    const lastReview = getAll.body[getAll.body.length - 1];
    const id = lastReview._id;
    const response = await supertest(app).put(`/book/${id}`).send(testBook2);
    expect(response.status).toBe(200);
  });
  it("should update status", async () => {
    const getAll = await supertest(app).get("/book");
    const lastReview = getAll.body[getAll.body.length - 1];
    const id = lastReview._id;
    const response = await supertest(app)
      .put(`/book/${id}/status`)
      .send(testBook2);
    expect(response.status).toBe(200);
  });
});

describe("Review", () => {
  it("should create review", async () => {
    const response = await supertest(app).post("/reviews").send(testReview);
    expect(response.status).toBe(201);
  });
  it("should get all review", async () => {
    const response = await supertest(app).get("/reviews");
    expect(response.status).toBe(200);
  });

  it("should get review by id", async () => {
    const getAll = await supertest(app).get("/reviews");
    const id = getAll.body[0]._id;
    const response = await supertest(app).get(`/reviews/${id}`);
    expect(response.status).toBe(200);
  });

  it("should update review", async () => {
    const getAll = await supertest(app).get("/reviews");
    const lastReview = getAll.body[getAll.body.length - 1];
    const id = lastReview._id;
    const response = await supertest(app)
      .put(`/reviews/${id}`)
      .send(testReview2);
    expect(response.status).toBe(200);
  });
});
