import { Schema, model, Model, InferSchemaType } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 24,
    unique: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    maxLength: 18,
    require: true,
    default: [],
  },
  status: {
    type: Boolean,
    required: true,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
  },
  author: {
    type: String,
    required: true,
    unique: true,
    maxLength: 24,
  }
});

export type Book = InferSchemaType<typeof bookSchema>;

export const BookModel: Model<Book> = model("Book", bookSchema)