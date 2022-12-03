import { connect, connection, disconnect } from "mongoose";
import { BookModel } from "../books/models/book.model";
import { ReviewModel } from "../reviews/models/review.model";
import { mongo } from "./mongo.connect";

async function seed() {
  const bookArray = (reviewId: string) => ([
    {
      title: "Quem Mexeu em mim?",
      releaseDate: "08/09/1998",
      language: ["português", "inglês"],
      status: true,
      author: "Spencer Johnson",
      review: reviewId,
    },
    {
      title: "Auto da Compadecida",
      releaseDate: "03/02/1955",
      language: ["português", "inglês"],
      status: true,
      author: "Ariano Suassuna",
    },
    {
      title: "O Cortiço",
      releaseDate: "10/08/1890",
      language: ["português", "inglês"],
      status: false,
      author: "Aluísio Azevedo",
    },
  ]);

  const reviewArray = [
    {
      title: "Quem Mexeu em Mim?",
      review: ["teste"],
      createDate: new Date(),
      editDate: [new Date()],
      score: 5,
    },
    {
      title: "Auto da Compadecida",
      review: ["teste", "teste"],
      createDate: new Date(),
      editDate: [new Date()],
      score: 4,
    },
    {
      title: "O Cortiço",
      review: ["teste", "teste", "teste"],
      createDate: new Date(),
      editDate: [new Date()],
      score: 3,
    },
  ];

  try {
    await BookModel.insertMany(bookArray("638b97acc7a6c071925192fc"));
    // await ReviewModel.insertMany(reviewArray);
    console.log("DB successfully seeded");
  } catch (error) {
    console.log(`failed to seed Book`);
    console.log(error);
  } finally {
    disconnect();
  };
};

connection
  .on("error", error => {
    console.log("ERROR: Connection to MongoDB failed", error);
  })

  .on("close", () => {
    console.log("Connection to MongoDB ended");
    process.exit(1);
  })

  .on("open", () => {
    console.log("Seed done successfully");
    seed();
  });
  
  connect(mongo);
