import { describe, it, expect, jest } from "@jest/globals";
import { invalidIdError } from "../../utils/custom.error";
import {
  fakeReviewData,
  fakeId,
  updatedReview,
} from "../__mocks__/fake.review.data";
import { fakeReviewRepository } from "../__mocks__/fake.review.repository";
import { ReviewService } from "./review.service";

const reviewService = new ReviewService(fakeReviewRepository);

describe("reviewService", () => {
  describe("getAll", () => {
    it("should call repository.getAll", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "getAll");
      await reviewService.getAll();
      expect(spy).toHaveBeenCalled();
    });
    it("should return a list of reviews", async () => {
      const reviews = await reviewService.getAll();
      expect(reviews).toEqual(fakeReviewData);
    });
    it("should return a promiseError", async () => {
      jest.spyOn(fakeReviewRepository, "getAll").mockRejectedValueOnce("Error");
      const error = await reviewService.getAll();
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("getById", () => {
    it("should call repository.getById", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "getById");
      await reviewService.getById(fakeId);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a review", async () => {
      const review = await reviewService.getById(fakeId);
      expect(review).toEqual(fakeReviewData[0]);
    });
    it("should return a promiseError", async () => {
      jest
        .spyOn(fakeReviewRepository, "getById")
        .mockRejectedValueOnce("Error");
      const error = await reviewService.getById(fakeId);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
    it("should return a invalidIdError", async () => {
      const error = await reviewService.getById("invalidId");
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });
});

describe("update", () => {
  it("should call repository.update", async () => {
    const spy = jest.spyOn(fakeReviewRepository, "update");
    await reviewService.update(fakeId, updatedReview);
    expect(spy).toHaveBeenCalled();
  });
  it("should return a updated review", async () => {
    const review = await reviewService.update(fakeId, updatedReview);
    expect(review).toEqual(updatedReview);
  });
  it("should return a promiseError in a update", async () => {
    jest.spyOn(fakeReviewRepository, "update").mockRejectedValueOnce("Error");
    const error = await reviewService.update(fakeId, updatedReview);
    expect(error).toEqual({
      promiseError: {
        message: "unable to request the Database",
        error: "Error",
      },
    });
  });
});

describe("create", () => {
  it("should call repository.create", async () => {
    const spy = jest.spyOn(fakeReviewRepository, "create");
    await reviewService.create(fakeReviewData[0]);
    expect(spy).toHaveBeenCalled();
  });
  it("should return a new review", async () => {
    const review = await reviewService.create(fakeReviewData[0]);
    expect(review).toEqual(fakeReviewData[0]);
  });
  it("should return a promiseError", async () => {
    jest.spyOn(fakeReviewRepository, "create").mockRejectedValueOnce("Error");
    const error = await reviewService.create(fakeReviewData[1]);
    expect(error).toEqual({
      promiseError: {
        message: "unable to request the Database",
        error: "Error",
      },
    });
  });
});
