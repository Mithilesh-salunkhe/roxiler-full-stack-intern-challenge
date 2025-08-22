import Store from "../models/Store.js";
import User from "../models/User.js";


export const addNewStore = async(req,res,next)=>{
    const {name, email, address} = req.body;
    const owner = req.user.id; // Get the user ID from the JWT payload

    // Validation for required fields
    if(!name || name.trim() === "" || !address || address.trim() === "") {
        return res.status(422).json({message: "Name and address are required fields."});
    }

    // Check if a store with the same email already exists
    let existingStore;
    try {
        existingStore = await Store.findOne({email});
    } catch(err) {
        return next(err);
    }
    if (existingStore) {
        return res.status(409).json({message: "A store with this email already exists."});
    }

    // Create a new store instance
    const newStore = new Store({
        name,
        email,
        address,
        owner
    });

    try{
        await newStore.save();
    } catch(err) {
        return next(err);
    }

    return res.status(201).json({message: "Store created successfully!", store: newStore});
}

export const getAllStores = async (req, res, next) => {
    try {
        // Get sorting parameters from the request URL
        const { sortBy, order } = req.query; 

        // Create a sort object
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        // Find all stores and apply the sorting
        const stores = await Store.find().sort(sortOptions);
        
        if (!stores || stores.length === 0) {
            return res.status(404).json({ message: "No stores found." });
        }
        
        return res.status(200).json({ stores });
    } catch (err) {
        return next(err);
    }
};