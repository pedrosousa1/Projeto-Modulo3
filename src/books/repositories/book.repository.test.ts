import { describe, it, expect, jest } from "@jest/globals";
import { fakeAuthor, fakeBookData, fakeId, updatedBook } from "../__mocks__/fake.book.data";
import { fakeBookModel } from "../__mocks__/fake.book.model";
import { BookRepository } from "./book.repository";

const bookRepository = new BookRepository(fakeBookModel);

describe("BookRepository", () => {
  describe("getAll", () => {
    it("should return a list of books", async () => {
      const books = await bookRepository.getAll();
      expect(books).toEqual(fakeBookData);
    });
    it("should return a empty array", async () => {
      jest.spyOn(fakeBookModel, "find").mockResolvedValueOnce([]);
      const books = await bookRepository.getAll();
      expect(books).toEqual([]);
    });
  });

  describe("getById", () => {
    it("should return a book", async () => {
      const book = await bookRepository.getById(fakeId);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return a empty object", async () => {
      jest.spyOn(fakeBookModel, "findById").mockResolvedValueOnce(null);
      const book = await bookRepository.getById(fakeId);
      expect(book).toEqual({});
    });
  });

  describe("getByAuthor", () => {
    it("should return a book", async () => {
      const book = await bookRepository.getByAuthor(fakeAuthor);
      expect(book).toEqual(fakeBookData);
    });
    it("should return a empty object", async () => {
      jest.spyOn(fakeBookModel, "find").mockResolvedValueOnce([]);
      const book = await bookRepository.getByAuthor(fakeAuthor);
      expect(book).toEqual([]);
    }); 

  });

  describe("update", () => {
    it("should update a book", async () => {
      const book = await bookRepository.update(fakeId, fakeBookData[0]);
      expect(book).toEqual(updatedBook);
    });
    it("should return a empty object", async () => {
      jest.spyOn(fakeBookModel, "findByIdAndUpdate").mockResolvedValueOnce(null);
      const book = await bookRepository.update(fakeId, fakeBookData[0]);
      expect(book).toEqual({});
    });
  });

  describe("updateStatus", () => {
    it("should update only status", async () => {
      const book = await bookRepository.updateStatus(fakeId, fakeBookData[3]);
      expect(book).toEqual(updatedBook);
    })
    it("should return a empty object", async () => {
      jest.spyOn(fakeBookModel, "findByIdAndUpdate").mockResolvedValueOnce(null);
      const book = await bookRepository.updateStatus(fakeId, fakeBookData[0]);
      expect(book).toEqual({});
    });
  });

  describe("create", () => {
    it("should update a book", async () => {
      const newBook = await bookRepository.create(fakeBookData[0]);
      expect(newBook).toEqual(fakeBookData[0]);
    });
  });
})