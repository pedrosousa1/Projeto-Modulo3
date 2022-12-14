import { Model } from "mongoose";
import { Book } from "../models/book.model";
import { fakeBookData, updatedBook } from "./fake.book.data";

export const fakeBookModel = {
  find: () => Promise.resolve(fakeBookData),
  findById: () => Promise.resolve(fakeBookData[0]),
  findByIdAndUpdate: () => Promise.resolve(updatedBook),
  create: () => Promise.resolve(fakeBookData[0]),
} as unknown as Model<Book>