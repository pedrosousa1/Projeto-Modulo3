import mongoose from "mongoose";
import { Book } from "../models/book.model";

export const fakeId = "632130d41623c49bf7b1c7e9";

export const fakeAuthor = "Spencer Johnson";

export const fakeBookData: Book[] = [
  {
    title: "Quem Mexeu no Meu Queijo?",
    releaseDate: "08/09/1998",
    language: ["português", "inglês"],
    status: true,
    author: "Spencer Johnson",
    review: new mongoose.Types.ObjectId(),
  },
  {
    title: "Auto da Compadecida",
    releaseDate: "03/02/1955",
    language: ["português", "inglês"],
    status: true,
    author: "Ariano Suassuna",
    review: new mongoose.Types.ObjectId(),
  },
  {
    title: "O Cortiço",
    releaseDate: "10/08/1890",
    language: ["português", "inglês"],
    status: false,
    author: "Aluísio Azevedo",
    review: new mongoose.Types.ObjectId(),
  },
];

export const updatedBook: Book = {
  title: "O Cortiço",
  releaseDate: "10/08/1890",
  language: ["português", "inglês", "francês"],
  status: false,
  author: "Aluísio Azevedo Martins",
  review: new mongoose.Types.ObjectId(),
};
