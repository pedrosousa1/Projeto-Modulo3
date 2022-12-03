import { describe, it, expect } from "@jest/globals";
import { bookFactory } from "./book.factory";

describe("UserFactory", () => {
  it("should create the user Domain", () => {
    expect(bookFactory()).toBeDefined();
  });
});
