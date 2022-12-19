import { faker } from "@faker-js/faker";
import { describe, it, expect } from "@jest/globals";
import { mockRequest } from "../../utils/_fake.routes";
import { invalidBodyBook } from "./body.book.validator";

const req = mockRequest();

const testBook = {
  title: faker.name.jobArea(),
  releaseDate: "08/09/1998",
  language: ["português", "inglês"],
  status: true,
  author: faker.name.fullName(),
};

const testBook2 = {
  title: faker.name.jobArea(),
  releaseDate: "08/09/1998",
  language: ["português", "inglês"],
  status: true,
  author: faker.name.fullName(),
  pages: 4,
};

describe("invalidBodyBook", () => {
  it("should return a valid body", () => {
    req.body = testBook;
    const testBody = invalidBodyBook(req);
    expect(testBody).toEqual(false);
  });
  it("should return a invalid body", () => {
    req.body = testBook2;
    const testBody = invalidBodyBook(req);
    expect(testBody).toEqual(true);
  });
});
