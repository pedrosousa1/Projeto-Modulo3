import { ReviewRepository } from "../repositories/review.repository";
import { fakeReviewData, updatedReview } from "./fake.review.data";

export const fakeReviewRepository = {
  getAll: () => Promise.resolve(fakeReviewData),
  getById: () => Promise.resolve(fakeReviewData[0]),
  update: () => Promise.resolve(updatedReview),
  create: () => Promise.resolve(fakeReviewData[0]),
} as unknown as ReviewRepository