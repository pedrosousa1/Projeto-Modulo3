import { Review } from "../models/review.model";

export const fakeId = "632130d41623c49bf7b1c7e8";


export const fakeReviewData: Review[] = [
  {
    title: "Quem Mexeu no Meu Queijo?",
    review: ['teste'],
    createDate: new Date(),
    editDate: [new Date()],

    score: 5,
  },
  {
    title: "Auto da Compadecida",
    review: ['teste', 'teste'],
    createDate: new Date(),
    editDate: [new Date()],
    score: 4,
  },
  {
    title: "O Cortiço",
    review: ['teste', 'teste', 'teste'],
    createDate: new Date(),
    editDate: [new Date()],
    score: 3,
  },
];

export const updatedReview: Review = {
  title: "O Cortiço",
  review: ['teste', 'teste', 'teste', 'teste', 'teste'],
  createDate: new Date(),
  editDate: [new Date()],
  score: 3,
};
