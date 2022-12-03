import { Model } from "mongoose";
import { Review } from "../models/review.model";

export class ReviewRepository {
  constructor(private readonly reviewModel: Model<Review>) {}

  async getAll(): Promise<Review[]> {
    const reviews = await this.reviewModel.find();

    return reviews;
  }

  async getById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id);

    if (review === null) {
      return {} as Review;
    }

    return review;
  }

  async update(id: string, reviewModel: Review): Promise<Review> {
    const { review } = reviewModel;
    const updatedReview = await this.reviewModel.findByIdAndUpdate(
      id,
      { $set: { review },
        $push: { editDate: new Date() } },
      {
        new: true,
      }
    );

    if (updatedReview === null) {
      return {} as Review;
    };

    return updatedReview;
  };

  async create(review: Review): Promise<Review> {
    const newReview = await this.reviewModel.create(review);
    return newReview;
  };
};
