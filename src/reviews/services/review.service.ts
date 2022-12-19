import { CustomErrors, invalidIdError, promiseError } from "../../utils/custom.error";
import { isIdValid } from "../../utils/id.validator";
import { ReviewDto } from "../dto/review.dto";
import { Review } from "../models/review.model";
import { ReviewRepository } from "../repositories/review.repository";

export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository){}

  async getAll(): Promise<Review[] | CustomErrors>{
    try {
      const reviews = await this.reviewRepository.getAll();
      return reviews;
    } catch (error) {
      return promiseError(error);
    };
  };

  async getById(id: string): Promise<Review | CustomErrors>{
    if (!isIdValid(id)) {
      return invalidIdError(id);
    }
    try{
      const review = await this.reviewRepository.getById(id);
      return review;
    }catch(error){
      return promiseError(error);
    };
  };

  async update(id: string, review: ReviewDto): Promise<Review | CustomErrors>{
    try{
      const updatedReview = await this.reviewRepository.update(id, review);
      return updatedReview;
    }catch(error){
      return promiseError(error)
    }
  }

  async create(review: Review): Promise<Review | CustomErrors>{
    try{
      const formatedDate = { ...review, createdDate: [new Date()], editDate: [new Date()]}
      const newReview = await this.reviewRepository.create(formatedDate);
      return newReview;
    }catch(error){
      return promiseError(error)
    }
  }
}