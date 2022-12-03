import { ReviewService } from "../services/review.service";
import { Request, Response } from "express";
import { StatusCode } from "../../utils/status.code";

export class ReviewController {
  constructor(private readonly reviewService: ReviewService){}

  async getAll(req: Request, res: Response){
    const { author } = req.query
    
    const result = await this.reviewService.getAll();

    if("promiseError" in result){
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }
    return res.status(StatusCode.OK).json(result);
  };

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.reviewService.getById(id)

    if ("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }
    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }
    return res.status(StatusCode.OK).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const result = await this.reviewService.update(id, body);

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }
    if ("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }
    return res.status(StatusCode.OK).json(result);
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    const result = await this.reviewService.create(body);

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }
    return res.status(StatusCode.CREATED).json(result);
  }

}