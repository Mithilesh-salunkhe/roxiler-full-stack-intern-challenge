import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import userRouter from "./routes/user-routes.js";
import storeRouter from "./routes/store-routes.js";
import ratingRouter from "./routes/rating-routes.js";
import adminRouter from "./routes/admin-routes.js";

dotenv.config();

const app = express();



//middleware
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);
app.use("/stores", storeRouter);
app.use("/ratings", ratingRouter);
app.use("/admin", adminRouter);


mongoose
  .connect(`mongodb+srv://salunkhemithilesh277:${process.env.MONGODB_PASSWORD}@storereviewcluster.3f71n0q.mongodb.net/?retryWrites=true&w=majority&appName=storeReviewCluster`)
  .then(() => {
    app.listen(5000);
  })
  .catch(e => {
    console.log(e);
  });

app.use("/", (req, res, next) => {
  res.send("hii as well !!");
});



//68a5ff9350e9816e339bd551