import { describe, it, expect } from "@jest/globals";
import { ReviewFactory } from "./review.factory";

describe("UserFactory", () => {
  it("should create the user Domain", () => {
    expect(ReviewFactory()).toBeDefined();
  });
});
