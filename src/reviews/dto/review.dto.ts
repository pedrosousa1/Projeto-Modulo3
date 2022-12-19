export class ReviewDto {

  title: string
  review: [string]
  score: number

  constructor(private bodyReview: any){
    this.title = bodyReview.title
    this.review = bodyReview.review
    this.score = bodyReview.score
  }
}