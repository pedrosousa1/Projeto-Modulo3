import { ReviewService } from "./../services/review.service";
import { ReviewRepository } from "./../repositories/review.repository";
import { ReviewModel } from "../models/review.model";
import { ReviewController } from "../controllers/review.controller";

export function ReviewFactory() {
  const reviewRepository = new ReviewRepository(ReviewModel);
  const reviewService = new ReviewService(reviewRepository);
  const reviewsController = new ReviewController(reviewService);

  return reviewsController;
}

export const review = ReviewFactory();
