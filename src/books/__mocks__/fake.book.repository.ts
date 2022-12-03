import { BookRepository } from "../repositories/book.repository";
import { fakeBookData, updatedBook } from "./fake.book.data";

export const fakeBookRepository = {
  getAll: () => Promise.resolve(fakeBookData),
  getById: () => Promise.resolve(fakeBookData[0]),
  getByAuthor: () => Promise.resolve(fakeBookData[0]),
  update: () => Promise.resolve(updatedBook),
  updateStatus: () => Promise.resolve(updatedBook),
  updateLanguage: () => Promise.resolve(updatedBook),
  create: () => Promise.resolve(fakeBookData[0]),
} as unknown as BookRepository