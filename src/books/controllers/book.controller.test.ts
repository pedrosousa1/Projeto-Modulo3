import { describe, it, expect, jest } from "@jest/globals";
import { invalidIdError, promiseError } from "../../utils/custom.error";
import { StatusCode } from "../../utils/status.code";
import { mockRequest, mockResponse } from "../../utils/_fake.routes";
import { fakeId, fakeBookData, updatedBook } from "../__mocks__/fake.book.data";
import { fakeBookService } from "../__mocks__/fake.book.service";
import { BookController } from "./book.controller";

const bookController = new BookController(fakeBookService);
const req = mockRequest();
const res = mockResponse();

describe("bookController", () => {
  describe("getAll", () => {
    it("should return all books", async () => {
      await bookController.getAll(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData);
    });
    it("should return status code 200", async () => {
      await bookController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    // it("should return a book", async () => {
    //   req.params.id = fakeId;
    //   await bookController.getByAuthor(req, res);
    //   expect(res.json).toHaveBeenCalledWith(fakeBookData[0]);
    // });
    it("should return a promiseError", async () => {
      jest
        .spyOn(fakeBookService, "getAll")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
  });

  describe("getById", () => {
    it("should return a book", async () => {
      req.params.id = fakeId;
      await bookController.getById(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[0]);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      jest
        .spyOn(fakeBookService, "getById")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      jest
        .spyOn(fakeBookService, "getById")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));
      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });

  describe("update", () => {
    it("should update a book", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.update(req, res);
      expect(res.json).toHaveBeenCalledWith(updatedBook);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "update")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "update")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));

      await bookController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });

  describe("updateStatus", () => {
    it("should updateStatus of a book", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.updateStatus(req, res, true);
      expect(res.json).toHaveBeenCalledWith(updatedBook);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.updateStatus(req, res, true);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "updateStatus")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.updateStatus(req, res, true);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "updateStatus")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));

      await bookController.updateStatus(req, res, true);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });

  describe("create", () => {
    it("should create a book", async () => {
      req.body = fakeBookData[0];
      await bookController.create(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[1]);
    });
    it("should return status code 201", async () => {
      req.body = fakeBookData[0];
      await bookController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
    });
    it("should return a promiseError", async () => {
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "create")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
  });
});
