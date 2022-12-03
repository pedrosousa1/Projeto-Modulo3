import { describe, it, expect, jest } from "@jest/globals";
import { fakeId, fakeReviewData, updatedReview } from "../__mocks__/fake.review.data";
import { fakeReviewModel } from "../__mocks__/fake.review.model";
import { ReviewRepository } from "./review.repository";

const reviewRepository = new ReviewRepository(fakeReviewModel);

describe("reviewRepository", () => {
  describe("getAll", () => {
    it("should return a list of reviews", async () => {
      const reviews = await reviewRepository.getAll();
      expect(reviews).toEqual(fakeReviewData);
    });
    it("should return a empty array", async () => {
      jest.spyOn(fakeReviewModel, "find").mockResolvedValueOnce([]);
      const reviews = await reviewRepository.getAll();
      expect(reviews).toEqual([]);
    });
  });

  describe("getById", () => {
    it("should return a review", async () => {
      const review = await reviewRepository.getById(fakeId);
      expect(review).toEqual(fakeReviewData[0]);
    });
    it("should return a empty object", async () => {
      jest.spyOn(fakeReviewModel, "findById").mockResolvedValueOnce(null);
      const review = await reviewRepository.getById(fakeId);
      expect(review).toEqual({});
    });
  });

  describe("update", () => {
    it("should update a review", async () => {
      const review = await reviewRepository.update(fakeId, fakeReviewData[0]);
      expect(review).toEqual(updatedReview);
    });
    it("should return a empty object", async () => {
      jest.spyOn(fakeReviewModel, "findByIdAndUpdate").mockResolvedValueOnce(null);
      const review = await reviewRepository.update(fakeId, fakeReviewData[0]);
      expect(review).toEqual({});
    });
  });

  describe("create", () => {
    it("should update a review", async () => {
      const newreview = await reviewRepository.create(fakeReviewData[0]);
      expect(newreview).toEqual(fakeReviewData[0]);
    });
  });
})