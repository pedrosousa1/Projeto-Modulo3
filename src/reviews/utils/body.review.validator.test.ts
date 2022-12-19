import { faker } from "@faker-js/faker";
import { describe, it, expect } from "@jest/globals";
import { mockRequest } from "../../utils/_fake.routes";
import { invalidBodyReview } from "./body.review.validator";

const req = mockRequest();
const testReview = {
  title: faker.name.jobArea(),
  review: ["review test"],
  score: 3,
};
const testReview2 = {
  title: faker.name.jobArea(),
  review: ["review test"],
  score: 3,
  author: faker.name.firstName()
};

describe("invalidBodyReview", () => {
  it("should return a valid body", () => {
    req.body = testReview;
    const testBody = invalidBodyReview(req);
    expect(testBody).toEqual(false);
  });
  it("should return a invalid body", () => {
    req.body = testReview2;
    const testBody = invalidBodyReview(req);
    expect(testBody).toEqual(true);
  });
});
