import { Model } from "mongoose";
import { Review } from "../models/review.model";
import { fakeReviewData, updatedReview } from "./fake.review.data";

export const fakeReviewModel = {
  find: () => Promise.resolve(fakeReviewData),
  findById: () => Promise.resolve(fakeReviewData[0]),
  findByIdAndUpdate: () => Promise.resolve(updatedReview),
  create: () => Promise.resolve(fakeReviewData[0]),
} as unknown as Model<Review>