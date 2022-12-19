import { connect, connection, disconnect } from "mongoose";
import { BookModel } from "../books/models/book.model";
import { ReviewModel } from "../reviews/models/review.model";
import { mongo } from "./mongo.connect";
import { faker } from '@faker-js/faker';

async function seed() {
  const bookArray = (id: any) => ([
    {
      title: faker.lorem.word(2),
      releaseDate: "08/09/1998",
      language: ["português", "inglês"],
      status: true,
      author: faker.name.fullName(),
      review: id,
    },
  ]);

  const reviewArray = [
    {
      title:  faker.lorem.word(2),
      review: [faker.lorem.paragraph()],
      createDate: new Date(),
      editDate: [new Date()],
      score: 5,
    },
  ];

  try {
    await ReviewModel.create(reviewArray);
    console.log("DB successfully seeded");
  } catch (error) {
    console.log(`failed to seed Book`);
    console.log(error);
  }

  const review = await ReviewModel.find()

  const idReview = review[review.length - 1]

  try{
    await BookModel.create(bookArray(idReview._id));
  }catch (error) {
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
    process.exit();
  })

  .on("open", () => {
    console.log("Seed done successfully");
    seed();
  });
  
  connect(mongo);
