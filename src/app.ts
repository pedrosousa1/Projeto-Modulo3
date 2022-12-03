import express from "express";
import bookRoutes from "./books/routes/book.routes";
import { mongoConnect } from "./db/mongo.connect";
import reviewRoutes from "./reviews/routes/review.routes";


mongoConnect();
const app = express();
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/review", reviewRoutes);

app.listen(3001, () => console.log("Server is running on port 3001"));
