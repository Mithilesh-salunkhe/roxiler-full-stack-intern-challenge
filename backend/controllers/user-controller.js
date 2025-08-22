import User from "../models/User.js";
import Store from "../models/Store.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getAllUsers = async (req, res, next) => {
    try {
        const { sortBy, order } = req.query; // Get sorting parameters from the request URL

        // Create a sort object
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        // Find all users and apply the sorting
        const users = await User.find().sort(sortOptions);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        
        return res.status(200).json({ users });
    } catch (err) {
        return next(err);
    }
};

//signup user
export const signup = async (req, res, next) => {
    const { name, email, password, address, role } = req.body;

    if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    // Check if user already exists
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return next(err);
    }
    if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists." });
    }

    // Hash the password for security
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({ name, email, password: hashedPassword, address, role });
    try {
        await user.save();
    } catch (err) {
        return next(err);
    }

    return res.status(201).json({ user });
};

//update a user
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password, address, role } = req.body;

    if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try {
        user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hashedPassword,
            address,
            role,
        });
    } catch (err) {
        return next(err); 
    }

    if (!user) {
        return res.status(500).json({ message: "Unexpected error occured during updating" });
    }
    return res.status(200).json({ message: "Updated successfully" }); 

};

//deleting a user
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        return next(err); // Corrected error handling
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected error occured during deletion" }); // Corrected message
    }
    return res.status(200).json({ message: "Deleted successfully" }); // Corrected typo

};

//login a user

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return next(err); 
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password!" });
    }

    // New logic to find the store owner's store ID
    let storeId = null;
    if (existingUser.role === 'store_owner') {
        try {
            const store = await Store.findOne({ owner: existingUser._id });
            if (store) {
                storeId = store._id;
            }
        } catch (err) {
            return next(err);
        }
    }

    const token = jwt.sign(
        { id: existingUser._id, role: existingUser.role, storeId }, 
        process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });

    return res.status(200).json({
        message: "Login successful!",
        user: {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            storeId: storeId, // Include the storeId in the user object
        },
        token: token,
    });
};

export const updatePassword = async (req, res, next) => {
    const userId = req.user.id;
    const { password } = req.body;

    console.log("Type of password:", typeof password);
     console.log("Password received by backend:", password);

    if (!password || password.trim() === "") {
        return res.status(422).json({ message: "Password is required" });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true } // Removed runValidators: true
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        return next(err);
    }
};
