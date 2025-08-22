import User from "../models/User.js";
import Store from "../models/Store.js";
import Rating from "../models/Rating.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const getAdminDashboardData = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStores = await Store.countDocuments();
        const totalRatings = await Rating.countDocuments();

        return res.status(200).json({
            totalUsers,
            totalStores,
            totalRatings,
        });
    } catch (err) {
        return next(err);
    }
};


export const addNewUser = async (req, res, next) => {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    
    // Check if the user already exists
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return next(err);
    }
    if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists." });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        address,
        role,
    });

    try {
        await user.save();
    } catch (err) {
        return next(err);
    }

    return res.status(201).json({ user });
};

export const getAllUsers = async (req, res, next) => {
    try {
        const { name, email, role } = req.query;
        const filter = {};

        if (name) filter.name = new RegExp(name, 'i');
        if (email) filter.email = new RegExp(email, 'i');
        if (role) filter.role = role;

        const users = await User.find(filter);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        
        return res.status(200).json({ users });
    } catch (err) {
        return next(err);
    }
};


export const addNewStore = async (req, res, next) => {
    const { name, email, address, ownerId } = req.body;

    if (!name || !address) {
        return res.status(422).json({ message: "Invalid store data" });
    }
    
    // Check if a store with the same email already exists
    let existingStore;
    try {
        if (email) {
            existingStore = await Store.findOne({ email });
        }
    } catch (err) {
        return next(err);
    }
    if (existingStore) {
        return res.status(409).json({ message: "A store with this email already exists." });
    }

    const newStore = new Store({
        name,
        email,
        address,
        owner: ownerId, // Set the owner from the request body
    });

    try {
        await newStore.save();
    } catch (err) {
        return next(err);
    }

    return res.status(201).json({ message: "Store created successfully!", store: newStore });
};


export const getAllStores = async (req, res, next) => {
    try {
        const { name, address } = req.query;
        const filter = {};

        if (name) filter.name = new RegExp(name, 'i');
        if (address) filter.address = new RegExp(address, 'i');

        const stores = await Store.find(filter);

        if (!stores || stores.length === 0) {
            return res.status(404).json({ message: "No stores found" });
        }
        
        return res.status(200).json({ stores });
    } catch (err) {
        return next(err);
    }
};