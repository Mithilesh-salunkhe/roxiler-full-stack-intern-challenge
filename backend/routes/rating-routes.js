import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware.js"; 
import { isStoreOwner } from "../middlewares/auth-middleware.js"; 
import {
    submitRating,
    modifyRating,
    getStoreRatings,
    getStoreAverageRating,
    getRatingsForStore
} from "../controllers/rating-controller.js";

const ratingRouter = Router();

// Route for a logged-in user to submit a rating
ratingRouter.post("/submit", verifyToken, submitRating);

// Route for a logged-in user to modify their own rating
ratingRouter.put("/:id", verifyToken, modifyRating);

// Route for a store owner to view all ratings for their store
ratingRouter.get("/store/:storeId", verifyToken, isStoreOwner, getStoreRatings);

// Route for a store owner to view the average rating for their store
ratingRouter.get("/store/:storeId/average", verifyToken, isStoreOwner, getStoreAverageRating);

// New route to get a store's overall rating and user's rating
ratingRouter.get("/store/:storeId/ratings", verifyToken, getRatingsForStore);


export default ratingRouter;