import { Request } from "express";

export const invalidBodyReview = (req: Request) => {
  const review = {
    title: req.body.title,
    review: req.body.review,
    createDate: req.body.createDate,
    editDate: req.body.editDate,
    score: req.body.score,
  };

  const jsonReview = JSON.stringify(review);

  const jsonBody = JSON.stringify(req.body);

  if (jsonReview !== jsonBody) {
    return true;
  }
  return false;
};
