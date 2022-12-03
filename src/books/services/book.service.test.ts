import { describe, it, expect, jest } from "@jest/globals";
import { invalidIdError } from "../../utils/custom.error";
import { fakeAuthor, fakeBookData, fakeId, updatedBook } from "../__mocks__/fake.book.data";
import { fakeBookRepository } from "../__mocks__/fake.book.repository";
import { BookService } from "./book.service";

const bookService = new BookService(fakeBookRepository);

describe("BookService", () => {
  describe("getAll", () => {
    it("should call repository.getAll", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getAll");
      await bookService.getAll();
      expect(spy).toHaveBeenCalled();
    });
    it("should return a list of books", async () => {
      const books = await bookService.getAll();
      expect(books).toEqual(fakeBookData);
    });
    it("should return a promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getAll").mockRejectedValueOnce("Error");
      const error = await bookService.getAll();
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("getById", () => {
    it("should call repository.getById", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getById");
      await bookService.getById(fakeId);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a book", async () => {
      const book = await bookService.getById(fakeId);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return a promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getById").mockRejectedValueOnce("Error");
      const error = await bookService.getById(fakeId);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
    it("should return a invalidIdError", async () => {
      const error = await bookService.getById("invalidId");
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });

  describe("getByAuthor", () => {
    it("should call repository.getByAuthor", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getByAuthor");
      await bookService.getByAuthor(fakeAuthor);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a book", async () => {
      const book = await bookService.getByAuthor(fakeAuthor);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return a promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getByAuthor").mockRejectedValueOnce("Error");
      const error = await bookService.getByAuthor(fakeAuthor);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });

  });

  describe("update", () => {
    it("should call repository.update", async () => {
      const spy = jest.spyOn(fakeBookRepository, "update");
      await bookService.update(fakeId, updatedBook);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a updated book", async () => {
      const book = await bookService.update(fakeId, updatedBook);
      expect(book).toEqual(updatedBook);
    });
    it("should return a promiseError in a update", async () => {
      jest.spyOn(fakeBookRepository, "update").mockRejectedValueOnce("Error");
      const error = await bookService.update(fakeId, updatedBook);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("updateStatus", () => {
    it("should call repository.updateStatus", async () => {
      const spy = jest.spyOn(fakeBookRepository, "updateStatus");
      await bookService.updateStatus(fakeId, updatedBook);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a updated book", async () => {
      const book = await bookService.updateStatus(fakeId, updatedBook);
      expect(book).toEqual(updatedBook);
    });
    it("should return a promiseError in a updateStatus", async () => {
      jest.spyOn(fakeBookRepository, "updateStatus").mockRejectedValueOnce("Error");
      const error = await bookService.updateStatus(fakeId, updatedBook);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });

    describe("create", () =>{
      it("should call repository.create", async () =>{
        const spy = jest.spyOn(fakeBookRepository, "create");
        await bookService.create(fakeBookData[0]);
        expect(spy).toHaveBeenCalled();
      });
      it("should return a new book", async () =>{
        const book = await bookService.create(fakeBookData[0]);
        expect(book).toEqual(fakeBookData[0]);
      });
      it("should return a promiseError", async () =>{
        jest.spyOn(fakeBookRepository, "create").mockRejectedValueOnce("Error");
        const error = await bookService.create(fakeBookData[1]);
        expect(error).toEqual({
          promiseError: {
            message: "unable to request the Database",
            error: "Error",
          },
        });
      });
    });
  });
})
