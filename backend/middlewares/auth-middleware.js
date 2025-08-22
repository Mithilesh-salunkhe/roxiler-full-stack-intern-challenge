import jwt from "jsonwebtoken";

// Middleware to check if a user is logged in and authenticated
export const verifyToken = (req, res, next) => {
    try {
        console.log("Request received in verifyToken middleware.");
        const authHeader = req.headers.authorization;
        // Use optional chaining for safer token extraction
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Attach the decoded user payload to the request object
        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// Middleware to check if the authenticated user is a System Administrator
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied: Admin only" });
    }
};

// Middleware to check if the authenticated user is a Store Owner
export const isStoreOwner = (req, res, next) => {
    if (req.user && req.user.role === "store_owner") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied: Store Owner only" });
    }
};