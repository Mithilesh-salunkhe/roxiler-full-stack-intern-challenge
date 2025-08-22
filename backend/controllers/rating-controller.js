import mongoose from "mongoose";

import Rating from "../models/Rating.js";
import Store from "../models/Store.js";
import User from "../models/User.js";


export const submitRating = async (req, res, next) => {
    const { storeId, rating } = req.body;
    const userId = req.user.id; // From the verifyToken middleware

    // Basic validation
    if (!storeId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid rating data" });
    }

    // Check if user has already rated this store
    let existingRating;
    try {
        existingRating = await Rating.findOne({ user: userId, store: storeId });
    } catch (err) {
        return next(err);
    }
    if (existingRating) {
        return res.status(409).json({ message: "You have already rated this store" });
    }

    const newRating = new Rating({ user: userId, store: storeId, rating });
    try {
        await newRating.save();
    } catch (err) {
        return next(err);
    }

    return res.status(201).json({ message: "Rating submitted successfully!", rating: newRating });
};


export const modifyRating = async (req, res, next) => {
    const ratingId = req.params.id;
    const userId = req.user.id; // From the verifyToken middleware
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid rating value" });
    }

    let existingRating;
    try {
        existingRating = await Rating.findById(ratingId);
    } catch (err) {
        return next(err);
    }

    if (!existingRating) {
        return res.status(404).json({ message: "Rating not found" });
    }

    // Ensure the user owns the rating
    if (existingRating.user.toString() !== userId) {
        return res.status(403).json({ message: "Access denied: You can only modify your own ratings" });
    }

    existingRating.rating = rating;
    try {
        await existingRating.save();
    } catch (err) {
        return next(err);
    }

    return res.status(200).json({ message: "Rating updated successfully", rating: existingRating });
};


export const getStoreRatings = async (req, res, next) => {
    const storeId = req.params.storeId;

    let ratings;
    try {
        ratings = await Rating.find({ store: storeId }).populate("user", "name email");
    } catch (err) {
        return next(err);
    }
    if (!ratings || ratings.length === 0) {
        return res.status(404).json({ message: "No ratings found for this store" });
    }

    return res.status(200).json({ ratings });
};


export const getStoreAverageRating = async (req, res, next) => {
    const storeId = req.params.storeId;

    let averageRating;
    try {
        const result = await Rating.aggregate([
            { $match: { store: new mongoose.Types.ObjectId(storeId) } },
            { $group: { _id: null, average: { $avg: "$rating" } } }
        ]);
        
        averageRating = result[0]?.average || 0;
    } catch (err) {
        return next(err);
    }

    return res.status(200).json({ storeId, averageRating });
};

export const getRatingsForStore = async (req, res, next) => {
    const { storeId } = req.params;
    const userId = req.user.id;

    try {
        // Find the user's submitted rating
        const userRating = await Rating.findOne({ user: userId, store: storeId });
        
        // Calculate the overall average rating for the store
        const overallRatingResult = await Rating.aggregate([
            { $match: { store: new mongoose.Types.ObjectId(storeId) } },
            { $group: { _id: "$store", overallRating: { $avg: "$rating" } } }
        ]);
        
        const overallRating = overallRatingResult.length > 0 
            ? overallRatingResult[0].overallRating 
            : 0;

        return res.status(200).json({
            overallRating,
            userSubmittedRating: userRating ? userRating.rating : null
        });

    } catch (err) {
        return next(err);
    }
};