import { Model } from "mongoose";
import { Book } from "../models/book.model";

export class BookRepository {
  constructor(private readonly bookModel: Model<Book>) {}

  async getAll(): Promise<Book[]> {
    const books = await this.bookModel.find().populate('review');

    return books;
  }

  async getById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).populate('review');

    if (book === null) {
      return {} as Book;
    }

    return book;
  }

  async getByAuthor(author: string): Promise<Book[]> {
    const book = await this.bookModel.find({ author: author});

    return book;
  }

  async update(id: string, book: Book): Promise<Book> {
    const {language, review } = book 
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, {$set: {language, review}}, {
      new: true,
    });

    if (updatedBook === null) {
      return {} as Book;
    }

    return updatedBook;
  }

  async updateStatus(id: string, book: Book): Promise<Book> {
    const {status} = book;
    const updatedStatusBook = await this.bookModel.findByIdAndUpdate(
      id,
      { $set: {status} },
      {
        new: true,
      }
    );

    if (updatedStatusBook === null) {
      return {} as Book;
    }

    return updatedStatusBook;
  }

  async create(book: Book): Promise<Book> {
    const newBook = this.bookModel.create(book);
    return newBook;
  }
}
