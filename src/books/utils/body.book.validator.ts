import { Request } from "express";

export const invalidBodyBook = (req: Request) => {
  const book = {
    title: req.body.title,
    releaseDate: req.body.releaseDate,
    language: req.body.language,
    status: req.body.status,
    review: req.body.review,
    author: req.body.author,
  };

  const jsonBook = JSON.stringify(book);

  const jsonBody = JSON.stringify(req.body);

  if (jsonBook !== jsonBody) {
    return true;
  }
  return false;
};
