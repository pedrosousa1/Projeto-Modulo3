import { describe, it, expect } from "@jest/globals";
import { BookModel } from "./book.model";

describe("BookModel", () => {
  it("Should be defined", () =>{
    expect(BookModel).toBeDefined();
  });
});